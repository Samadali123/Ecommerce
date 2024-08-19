const cartModel = require('../models/cart.model');
const productModel = require('../models/product.model');
const userModel = require('../models/user.model');


exports.addToCart = async (req, res, next) => {
    try {
        const userId = req.user.userid; // Assuming user is authenticated and req.user.userid is available
        const { productId, quantity, address } = req.body;

        if (quantity <= 0) {
            return res.status(400).json({ success: false, message: 'Quantity must be greater than 0' });
        }

        // Validate address
        if (!address || !address.street || !address.city || !address.state || !address.postalCode || !address.country) {
            return res.status(400).json({ success: false, message: 'Address information is required' });
        }

        // Check if the product exists
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Find the user's cart or create a new one if it doesn't exist
        let cart = await cartModel.findOne({ user: userId });
        if (!cart) {
            cart = new cartModel({ user: userId, items: [], address });
        }

        // Check if the product is already in the cart
        const cartItemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (cartItemIndex > -1) {
            // If the product is already in the cart, update the quantity
            cart.items[cartItemIndex].quantity += quantity;
        } else {
            // If the product is not in the cart, add it as a new item
            cart.items.push({ product: productId, quantity });
        }

        // Update address if it has changed
        if (cart.address.toString() !== address.toString()) {
            cart.address = address;
        }

        // Save the cart
        await cart.save();

        // Update the user's document to include the product ID in their mycart array
        await userModel.findByIdAndUpdate(userId, { $addToSet: { mycart: productId } });

        res.status(200).json({ success: true, message: 'Product added to cart', cart });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(error.status || 500).json({ success: false, message: error.message });
    }
};




exports.removeFromCart = async (req, res, next) => {

    try {
        console.log(req.user.userid)
        const userId = req.user.userid; // Assuming user is authenticated and req.user.userid is available
        const productId = req.query.productId || req.body.productId; // Extract productId from query string

        if (!productId) {
            return res.status(400).json({ success: false, message: 'Product ID is required' });
        }

        // Validate the existence of the product
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Remove the product from the user's mycart array
        await userModel.findByIdAndUpdate(userId, { $pull: { mycart: productId } });

        // Find the user's cart and remove the product from the cart items
        const cart = await cartModel.findOne({ user: userId });
        if (cart) {
            // Filter out the item with the specified productId
            cart.items = cart.items.filter(item => item.product.toString() !== productId);

            // Save the updated cart or remove it if empty
            if (cart.items.length === 0) {
                await cart.remove(); // Remove cart if empty
            } else {
                await cart.save(); // Save updated cart
            }
        }

        res.status(200).json({ success: true, message: 'Product removed from cart' });
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};


exports.viewCart = async (req, res, next)=>{
    try {
         const loginuser = await userModel.findOne({email : req.user.email}).populate("mycart");
         if(! loginuser) {
            return res.status(401).json({success : false, message : "Login user not found"})
         }
         res.status(200).json({success :false , loginuser});
         
    } catch (error) {
         res.status(error.status).json({success : false , message : error.message})
    }
}







