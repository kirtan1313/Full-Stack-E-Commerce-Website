// Create A Token And Saving Cookie

const sendToken = (user, statusCode, res) => {

    const token = user.getJWTToken();

    // option for cookie   
    const option = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        sameSite: "Lax"
    }

    res.status(statusCode).cookie('token', token, option).json({
        success: true, user, token, avatar: user.avatar
    })
}


module.exports = sendToken