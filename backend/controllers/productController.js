import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
    const { name, description, price, image } = req.body;
    try {
        const product = new Product({
            name,
            description,
            price,
            image,
            createdBy: req.user._id
        })

        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}