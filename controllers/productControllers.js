import productModel from "../model/productModel.js";
import CategoryModel from "../model/categoryModel.js"; // Category model import karo

// GET ALL PRODUCTS with populated category
export const getprodcut = async (req, res) => {
  try {
    const products = await productModel.find({}).populate("category", "name des");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getidproduct = async (req, res) => {
  try {
    const idproduct = await productModel
      .findById(req.params.id)
      .populate("category", "name des");

    if (!idproduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(idproduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// FIXED CREATE PRODUCT FUNCTION
export const createProducts = async (req, res) => {
  try {
    const { name, price, image, description, category, brand, stock, discount } = req.body;

    // Validate required fields
    if (!name || !price || !category) {
      return res.status(400).json({ message: "Name, price and category are required" });
    }

    let categoryId = category;

    // Check if category is string (name) or ObjectId
    if (typeof category === 'string' && !category.match(/^[0-9a-fA-F]{24}$/)) {
      // Category name diya gaya hai, ObjectId find karo
      const categoryDoc = await CategoryModel.findOne({ name: category });
      
      if (!categoryDoc) {
        return res.status(400).json({ 
          message: `Category "${category}" not found. Please create category first.` 
        });
      }
      
      categoryId = categoryDoc._id;
    }

    // Create product with ObjectId
    const productData = {
      name,
      price,
      image,
      description,
      category: categoryId, // Now it's ObjectId
      brand,
      stock: stock || 0,
      discount: discount || 0
    };

    const product = await productModel.create(productData);
    
    // Populate category details in response
    const populatedProduct = await productModel.findById(product._id)
      .populate("category", "name des");
    
    res.status(201).json(populatedProduct);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProducts = async (req, res) => {
  try {
    const result = await productModel
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate("category", "name des");

    if (!result) {
      return res.status(404).json({ message: "Product not Found" });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE PRODUCT BY ID
export const deleteProducts = async (req, res) => {
  try {
    const deletedProduct = await productModel.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};