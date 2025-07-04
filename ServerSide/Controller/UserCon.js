const UserSchema = require('../Model/UserModel.js')
const sendToken = require('../Utils/jwtToken.js')
const sendEmail = require('../Utils/sendEmail.js')
const crypto = require('crypto')


// User Register 
const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if (Array.isArray(password)) {
            return res.status(400).json({ message: "Password should not be sent multiple times" });
        }


        console.log("BODY:", req.body);
        console.log("FILE:", req.file);

        if (!req.file) {
            return res.status(400).json({ message: "Avatar file is missing" });
        }

        const User = await UserSchema.create({
            name, email, password,
            avatar: {
                public_id: Date.now().toString(),
                url: `/uploads/${req.file.filename}`
            }
        })
        console.log('user', User);


        sendToken(User, 201, res)

    } catch (error) {
        if (error.code === 11000) {
            const message = `Duplicate field value entered: ${Object.keys(error.keyValue)[0]}`;
            return res.status(400).json({ message });
        }
        res.status(500).json({ message: 'Register Error', error })
    }
}



// Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please Enter All Details' });
        }

        const user = await UserSchema.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({ message: 'Invalid Email or Password' });
        }

        const isPasswordMatched = await user.comparePassword(password);

        if (!isPasswordMatched) {
            return res.status(401).json({ message: 'Invalid Email or Password' });
        }

        sendToken(user, 200, res)

    } catch (error) {
        console.log("Login Error:", error);
        return res.status(500).json({ message: 'Login Error', error: error.message });
    }
}


// Logout User
const logOutUser = async (req, res) => {
    try {

        res.cookie('token', null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })

        res.status(200).json({ success: true, message: 'Logout Succesfully' })

    } catch (error) {
        return res.status(500).json({ message: 'LogOut Error', error: error.message });
    }
}

// Forger Password
const forgetPassword = async (req, res) => {

    console.log("Incoming forget password request:", req.body);

    let user;

    try {
        const { email, frontendURL } = req.body;
        console.log("📥 Email:", email); 
        console.log("🌐 Frontend URL:", frontendURL);

        user = await UserSchema.findOne({ email: req.body.email });

        if (!user) {
            return res.status(401).json({ message: 'User Not Found' });
        }

        // Get Reset Password token
        const resetToken = await user.getResetPasswordToken();

        await user.save({ validateBeforeSave: false });

        const baseURL = frontendURL || req.headers.origin || process.env.FRONTEND_URL;
        const resetPasswordURL = `${baseURL}/reset/${resetToken}`;

        const message = `Your password reset token is:\n\n${resetPasswordURL}\n\nIf you have not requested this, please ignore.`;

        // Await sendEmail with correct parameters
        await sendEmail({
            email: user.email,
            subject: "Password Recovery",
            message,
        });


        res.status(200).json({
            success: true,
            message: `Reset password email sent to ${user.email}`,
        });

    } catch (error) {

        if (user) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpaire = undefined;
            await user.save({ validateBeforeSave: false });
        }

        return res.status(500).json({ message: 'Forget Password Error', error: error.message });
    }
};



const resetPasswordToken = async (req, res) => {
    try {
        const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

        const userReset = await UserSchema.findOne({
            resetPasswordToken,
            resetPasswordExpaire: { $gt: Date.now() }
        })

        if (!userReset) {
            return res.status(401).json({ message: 'Reset Password Token Is Not Valid Is InValid' });
        }

        if (req.body.password !== req.body.confirmPassword) {
            return res.status(401).json({ message: 'Password And Confirm Password Not Match' });
        }

        userReset.password = req.body.password;
        userReset.resetPasswordToken = undefined
        userReset.resetPasswordExpaire = undefined

        await userReset.save();

        sendToken(userReset, 200, res)

    } catch (error) {
        return res.status(500).json({ message: 'Reset Password Error', error: error.message });
    }
}


const getUserDetail = async (req, res) => {
    try {
        const userDetails = await UserSchema.findById(req.user.id)

        res.status(200).json({
            success: true,
            user: userDetails,
            message: 'Get User SuccessFully...',
        });

    } catch (error) {
        return res.status(500).json({ message: 'Get User Details Error', error: error.message });
    }
}


const UpdateUserPassword = async (req, res) => {
    try {
        const user = await UserSchema.findById(req.user.id).select("+password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatched = await user.comparePassword(req.body.oldPassword);
        if (!isMatched) {
            return res.status(400).json({ message: "Old password is incorrect" });
        }

        if (req.body.newPassword !== req.body.confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        user.password = req.body.newPassword;
        await user.save();

        res.status(200).json({ success: true, message: "Password updated" });
    } catch (error) {
        console.log("🔥 Backend Error:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


const updateProfile = async (req, res) => {
    try {

        const user = await UserSchema.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }


        const { name, email } = req.body;

        user.name = name;
        user.email = email;

        if (req.file) {
            user.avatar = {
                public_id: req.file.filename,
                url: `/uploads/${req.file.filename}`
            };
        }

        await user.save();

        res.status(200).json({
            success: true,
            profile: user
        });

    } catch (error) {
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
};



// Get All User (Admin)
const getAllUserDetail = async (req, res) => {
    try {
        const allUserGet = await UserSchema.find();

        res.status(200).json({ success: true, message: 'Get All  User SuccessFully...', allUserGet });

    } catch (error) {
        return res.status(500).json({ message: 'get All UserDetail Error', error: error.message });
    }
}

// Get Single User (Admin)
const getSingleUserDetail = async (req, res) => {
    try {
        const SingleUserGet = await UserSchema.findById(req.params.id);

        if (!SingleUserGet) {
            return res.status(401).json({ message: `User Not Define ${req.params.id}` });
        }

        res.status(200).json({ success: true, message: 'Get Single User SuccessFully...', SingleUserGet });

    } catch (error) {
        return res.status(500).json({ message: 'get Single UserDetail Error', error: error.message });
    }
}

// Update Role User (Admin)
const UpdateUserRole = async (req, res) => {
    try {

        const newUserData = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role
        }

        const user = await UserSchema.findByIdAndUpdate(req.user.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })

        res.status(200).json({
            success: true, user, message: 'Get User SuccessFully...',
        });

    } catch (error) {
        return res.status(500).json({ message: 'Get User Details Error', error: error.message });
    }
}


// Delete  User (Admin)
const DeleteUser = async (req, res) => {
    try {

        const user = await UserSchema.findById(req.params.id)


        if (!user) {
            return res.status(401).json({ message: `User Not Define ${req.params.id}` });
        }

        await user.deleteOne();

        res.status(200).json({
            success: true, user, message: 'Delete User Error...',
        });

    } catch (error) {
        return res.status(500).json({ message: 'Delete User Error', error: error.message });
    }
}



module.exports = {
    registerUser,
    loginUser,
    logOutUser,
    forgetPassword,
    resetPasswordToken,
    updateProfile,
    getUserDetail,
    UpdateUserPassword,
    getAllUserDetail,
    getSingleUserDetail,
    UpdateUserRole,
    DeleteUser
}