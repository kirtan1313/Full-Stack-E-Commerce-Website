const ProductSchema = require('../Model/ProductModel.js')
const mongoose = require('mongoose')
const ApiFeature = require('../Utils/ApiKeyFeature.js')



// Create Products --- Admin
const Createproduct = async (req, res) => {
    try {

        req.body.user = req.user.id

        const ProductCreate = await ProductSchema.create(req.body)
        res.status(201).json({ success: true, message: 'Product Create Succesfully', ProductCreate })

    } catch (error) {
        res.status(500).json({ message: 'Create Products Error', error })
    }
}


const getAllProdct = async (req, res) => {
  try {
    const resultPerPage = 8;
    const productCount = await ProductSchema.countDocuments();

    const apiFeature = new ApiFeature(ProductSchema.find(), req.query)
      .search()
      .filter()
      .page(resultPerPage);

    const products = await apiFeature.query;

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      products,
      productCount,
      resultPerPage,
      filteredProductCount: products.length,
    });
  } catch (error) {
    console.log("🔥 Backend Error:", error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message,
    });
  }
};


// GetSingle products Details
const GetSingleProdctsDetails = async (req, res) => {
    try {

        let getSingleProduct = await ProductSchema.findById(req.params.id)

        if (!getSingleProduct) {
            return res.status(500).json({ success: false, message: 'Product Not Found' })
        }

        res.status(200).json({ success: true, message: 'GetSingle Product Succesfully', getSingleProduct })
    } catch (error) {
        res.status(500).json({ message: 'GetSingle Products Error', error })
    }
}


// Update Products --Admin
const UpdateProducts = async (req, res) => {

    try {

        let productUpdate = await ProductSchema.findById(req.params.id)

        if (!productUpdate) {
            return res.status(500).json({ success: false, message: 'Product Not Found' })
        }

        productUpdate = await ProductSchema.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })

        res.status(200).json({ success: true, message: 'Product Update Succesfully', productUpdate })
    } catch (error) {
        res.status(500).json({ message: 'Update Products Error', error })
    }
}


const DeleteProducts = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid Product ID' });
        }

        const productDelete = await ProductSchema.findByIdAndDelete(id);

        if (!productDelete) {
            return res.status(404).json({ success: false, message: 'Product Not Found' });
        }

        res.status(200).json({ success: true, message: 'Product Deleted Successfully', product: productDelete });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Delete Products Error', error });
    }
};


const productRating = async (req, res) => {
    try {
        console.log("rating",req.body);
        
        const { rating, comment, productId } = req.body;

        const review = {
            name: req.body.name,
            user: req.body._id,
            rating: Number(rating),
            comments:comment,
        };

        const product = await ProductSchema.findById(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        if (!product.reviews || !Array.isArray(product.reviews)) {
            product.reviews = [];
        }

        const isReviewed = product.reviews.find(
            (rev) => rev.user && rev.user.toString() === req.user._id.toString()
        );

        if (isReviewed) {
            product.reviews.forEach((rev) => {
                if (rev.user && rev.user.toString() === req.user._id.toString()) {
                    rev.rating = rating;
                    rev.comments = comment;
                }
            });
        } else {
            product.reviews.push(review);
            product.numOfReview = product.reviews.length;
        }

        let ratingAverage = 0;
        product.reviews.forEach((rev) => {
            ratingAverage += rev.rating;
        });

        product.ratings = ratingAverage / product.reviews.length;

        await product.save({ validateBeforeSave: false });

        res.status(200).json({ success: true, message: "Product Rating Successfully",product });
    } catch (error) {
        res.status(500).json({ success: false, message: "Rating Products Error", error });
    }
};



// Get All Review
const GetAllReview = async (req, res) => {

    try {
        const productReview = await ProductSchema.findById(req.query.id)
        if (!productReview) {
            return res.status(404).json({ success: false, message: "Product Review Is not found" });
        }
        res.status(200).json({
            success: true,
            reviews: productReview.reviews,
            ratings: productReview.ratings, // ✅ include ratings
            numofReview: productReview.numofReview, // ✅ include total reviews
            message: "Get All Product Rating Successfully"
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Get All Review Error", error });
    }

}

// Delete Review
const DeleteReview = async (req, res) => {
    try {
        const product = await ProductSchema.findById(req.query.productId);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Remove the selected review only
        const updatedReviews = product.reviews.filter(
            rev => rev._id.toString() !== req.query.id.toString()
        );

        // Recalculate ratings from valid reviews only
        let totalRating = 0;
        let validReviewCount = 0;

        updatedReviews.forEach(rev => {
            if (rev.rating !== undefined && rev.rating !== null) {
                totalRating += rev.rating;
                validReviewCount++;
            }
        });

        // Manually assign updated data
        product.reviews = updatedReviews;
        product.numOfReview = updatedReviews.length;
        product.ratings = validReviewCount > 0 ? (totalRating / validReviewCount) : 0;

        // Save without validation on reviews
        await product.save({ validateBeforeSave: false }); // 👈 prevents validation errors from broken reviews

        res.status(200).json({
            success: true,
            message: "Review deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Delete Review Error",
            error
        });
    }
};






module.exports = { getAllProdct, Createproduct, UpdateProducts, DeleteProducts, GetSingleProdctsDetails, productRating, GetAllReview, DeleteReview }