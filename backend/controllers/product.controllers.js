require("dotenv").config();
const productModel = require("../models/product.model");



const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

exports.addProduct = async (req, res, next) => {
    try {
        const { name, description, price, category, stock, images, discount } = req.body;
      
        // Check if all required fields are present
        if (!name || !description || !price || !category || !stock || !images || !discount) {
            return res.status(400).json({ success: false, message: "Please fill in all product details" });
        }

        // Sanitize and validate price
        let sanitizedPrice = parseFloat(price.replace(/,/g, '')); // Remove commas and convert to number
        if (isNaN(sanitizedPrice) || sanitizedPrice < 0) {
            return res.status(400).json({ success: false, message: "Price must be a valid number greater than or equal to 0" });
        }

        // Sanitize and validate discount
        let numericDiscount = parseFloat(discount);
        if (isNaN(numericDiscount) || numericDiscount < 0 || numericDiscount > 100) {
            return res.status(400).json({ success: false, message: "Discount must be a number between 0 and 100" });
        }

        // Calculate the final price after discount
        let finalPrice = sanitizedPrice;
        if (numericDiscount > 0) {
            finalPrice = sanitizedPrice - (sanitizedPrice * (numericDiscount / 100));
        }

        // Create a new product
        const newProduct = await productModel.create({
            name,
            description,
            price: sanitizedPrice,
            priceAfterDiscount: finalPrice,
            category,
            stock,
            images,
            discount: numericDiscount
        });

        // Format numbers with commas
        const formattedPrice = numberWithCommas(newProduct.price);
        const formattedPriceAfterDiscount = numberWithCommas(newProduct.priceAfterDiscount);

        // Return the response with formatted prices
        res.status(200).json({
            success: true,
            newProduct: {
                ...newProduct.toObject(),
                price: formattedPrice,
                priceAfterDiscount: formattedPriceAfterDiscount
            }
        });

    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};



exports.totalproducts = async (req, res, next) => {
    // Function to format numbers with commas
    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    try {
        // Fetch all products from the database
        const products = await productModel.find().exec();

        // Check if products were found
        if (!products || products.length === 0) {
            return res.status(404).json({ success: false, message: "No products found" });
        }

        // Format prices with commas
        const formattedProducts = products.map(product => ({
            ...product.toObject(),
            price: numberWithCommas(product.price),
            priceAfterDiscount: product.priceAfterDiscount ? numberWithCommas(product.priceAfterDiscount) : undefined
        }));

        // Send the response
        res.status(200).json({
            success: true,
            products: formattedProducts
        });

    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};



<<<<<<< HEAD
=======

>>>>>>> 94a67aae45f0ce69d7345b8225d5d62d992c0856
exports.singleproduct = async (req, res, next) => {
    // Function to format numbers with commas
    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    try {
        // Extract product ID from request parameters or query
        const productId = req.params.id || req.query.id;

        // Fetch the product by ID
        const product = await productModel.findById(productId).exec();

        // Check if product was found
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Find similar products in the same category
        let similarProducts = await productModel.find({
            category: product.category,
            _id: { $ne: productId } // Exclude the current product
        }).limit(10).lean(); // Using .lean() to return plain JavaScript objects

        let responseProducts = [];

        // If similar products are found, set them as similarProducts
        if (similarProducts.length > 0) {
            responseProducts = similarProducts.map(item => ({
                ...item,
                price: numberWithCommas(item.price),
                priceAfterDiscount: item.priceAfterDiscount ? numberWithCommas(item.priceAfterDiscount) : undefined
            }));
        } else {
            // If no similar products are found, fetch random products
            const moreProducts = await productModel.aggregate([
                { $match: { _id: { $ne: productId } } }, // Exclude the current product
                { $sample: { size: 20 } } // Get up to 20 random products
            ]);

            responseProducts = moreProducts.map(item => ({
                ...item,
                price: numberWithCommas(item.price),
                priceAfterDiscount: item.priceAfterDiscount ? numberWithCommas(item.priceAfterDiscount) : undefined
            }));
        }

        // Format the single product
        const formattedProduct = {
            ...product.toObject(),
            price: numberWithCommas(product.price),
            priceAfterDiscount: product.priceAfterDiscount ? numberWithCommas(product.priceAfterDiscount) : undefined
        };

        // Prepare the response JSON structure
        const response = {
            success: true,
            product: formattedProduct,
            similarProducts: similarProducts.length > 0 ? responseProducts : undefined,
            moreProducts: similarProducts.length === 0 ? responseProducts : undefined
        };

        // Send the response
        res.status(200).json(response);

    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};






exports.updateproduct = async (req, res, next) => {
    // Function to format numbers with commas
    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    try {
        // Extract product ID from request parameters
        const productId = req.params.id || req.query.productId;
        const updates = req.body;

        // Check if the product ID is valid and provided
        if (!productId) {
            return res.status(400).json({ success: false, message: "Product ID is required" });
        }

        // Validate and sanitize fields if provided
        if (updates.price) {
            updates.price = parseFloat(updates.price.replace(/,/g, ''));
            if (isNaN(updates.price) || updates.price < 0) {
                return res.status(400).json({ success: false, message: "Invalid price value" });
            }
        }

        if (updates.discount) {
            updates.discount = parseFloat(updates.discount);
            if (isNaN(updates.discount) || updates.discount < 0 || updates.discount > 100) {
                return res.status(400).json({ success: false, message: "Discount must be between 0 and 100" });
            }
        }

        // Update the product
        const updatedProduct = await productModel.findByIdAndUpdate(productId, updates, {
            new: true,
            runValidators: true
        }).exec();

        // Check if the product was found and updated
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Format prices with commas if they were updated
        const formattedProduct = {
            ...updatedProduct.toObject(),
            price: numberWithCommas(updatedProduct.price),
            priceAfterDiscount: updatedProduct.priceAfterDiscount ? numberWithCommas(updatedProduct.priceAfterDiscount) : undefined
        };

        // Send the response
        res.status(200).json({
            success: true,
            product: formattedProduct
        });

    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


exports.deleteproduct = async (req, res, next) => {
    try {
        // Extract product ID from request parameters
        const productId = req.params.id;
        
        // Check if the product was found or not
        if (! productId) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Delete the product by ID
        const deletedProduct = await productModel.findByIdAndDelete(productId).exec();


        // Send success response
        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


exports.updateProduct = async (req, res, next) => {
    try {

        const numberWithCommas = (number) => {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        };

        const { name, description, price, category, stock, images, discount } = req.body;
        const productId = req.params.productId || req.query.productId;

        if (!productId) {
            return res.status(400).json({ success: false, message: "Product ID is required" });
        }

        // Check if all required fields are present
        if (!name || !description || !price || !category || !stock || !images || !discount) {
            return res.status(400).json({ success: false, message: "Please provide all product details" });
        }

        // Sanitize and validate price
        let sanitizedPrice = parseFloat(price.replace(/,/g, '')); // Remove commas and convert to number
        if (isNaN(sanitizedPrice) || sanitizedPrice < 0) {
            return res.status(400).json({ success: false, message: "Price must be a valid number greater than or equal to 0" });
        }

        // Sanitize and validate discount
        let numericDiscount = parseFloat(discount);
        if (isNaN(numericDiscount) || numericDiscount < 0 || numericDiscount > 100) {
            return res.status(400).json({ success: false, message: "Discount must be a number between 0 and 100" });
        }

        // Calculate the final price after discount
        let finalPrice = sanitizedPrice;
        if (numericDiscount > 0) {
            finalPrice = sanitizedPrice - (sanitizedPrice * (numericDiscount / 100));
        }

        // Update the product
        const updatedProduct = await productModel.findByIdAndUpdate(productId, {
            name,
            description,
            price: sanitizedPrice,
            priceAfterDiscount: finalPrice,
            category,
            stock,
            images,
            discount: numericDiscount
        }, { new: true, runValidators: true });

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Format numbers with commas for the response
        const formattedProduct = {
            ...updatedProduct.toObject(),
            price: numberWithCommas(updatedProduct.price),
            priceAfterDiscount: numberWithCommas(updatedProduct.priceAfterDiscount)
        };

        // Return the response with formatted prices
        res.status(200).json({
            success: true,
            product: formattedProduct
        });

    } catch (error) {
        console.error('Error updating product:', error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({ success: false, message: error.message });
        }

        if (error.kind === 'ObjectId') {
            return res.status(400).json({ success: false, message: "Invalid product ID format" });
        }

        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};


exports.productByCategory = async (req, res, next) => {
    try {

        let category = req.query.category || req.params.category;
        category = category.toLowerCase();
        
        if (!category) {
            return res.status(400).json({ success: false, message: 'Category is required' });
        }
        
        // Find products by category, ensuring that category matches exactly
        const products = await productModel.find({ category: category });


        if (products.length === 0) {
            console.log('Category:', category); // Debugging
            return res.status(404).json({ success: false, message: 'No products found for this category' });
        }
        res.status(200).json({ success: true, products });
    } catch (error) {
        console.error('Error fetching products:', error); // Debugging
        res.status(error.status || 500).json({ success: false, message: error.message });
    }
};


<<<<<<< HEAD


=======
>>>>>>> 94a67aae45f0ce69d7345b8225d5d62d992c0856
exports.searchProducts = async (req, res, next) => {
    try {
        const { query } = req.query; // Retrieve the search query from the request

        // Check if the query parameter is provided
        if (!query) {
            return res.status(400).json({ success: false, message: 'Query is required' });
        }

        // Create a case-insensitive regex pattern for matching the query
        const regexPattern = new RegExp(query, 'i');

        // Find products that match the query in title, category, or any other fields
        const products = await productModel.find({
            $or: [
                { name: { $regex: regexPattern } },
                { category: { $regex: regexPattern } },
                { description: { $regex: regexPattern } },
                // Add other fields you want to search here
            ]
        }).lean(); // Use .lean() to return plain JavaScript objects for better performance

        // Check if no products were found
        if (products.length === 0) {
            return res.status(404).json({ success: false, message: 'No products found' });
        }

        // Send the response with found products
        res.status(200).json({ success: true, products });
    } catch (error) {
        console.error('Error in searchProducts:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
<<<<<<< HEAD
};
=======
};

  
>>>>>>> 94a67aae45f0ce69d7345b8225d5d62d992c0856
