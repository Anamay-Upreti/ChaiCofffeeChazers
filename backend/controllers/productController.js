import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);

  const { name, price, description } = req.body;
  const image = req.file ? req.file.path : null;

  if (!name || !price || !description || !image) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const product = await Product.create({
      name,
      price: Number(price),
      description,
      image,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({message: "Product not found"});
        res.json(product);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

export const updateProduct = async (req, res) => {
    try {
      const updates = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
      };
      if (req.file) updates.image = req.file.path;
  
      const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
  
      if (!product) return res.status(404).json({ message: "Product not found" });
  
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  export const deleteProduct = async (req, res) => {
    try {
      const deleted = await Product.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ message: "Product not found" });
      res.json({ message: "Product deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };