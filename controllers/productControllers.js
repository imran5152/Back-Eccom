import productModel from "../model/productModel.js";
import CategoryModel from "../model/categoryModel.js";
import mongoose from "mongoose";

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

    console.log('📦 Received product data:', req.body);

    // Validate required fields
    if (!name || !price || !category) {
      return res.status(400).json({ message: "Name, price and category are required" });
    }

    let categoryId = category;

    // Check if category is string (name)
    if (typeof category === 'string') {
      console.log('🔍 Searching for category:', category);
      
      // Trim and capitalize category name
      const categoryName = category.trim();
      
      // Case-insensitive search for category
      let categoryDoc = await CategoryModel.findOne({ 
        name: { $regex: new RegExp('^' + categoryName + '$', 'i') } 
      });
      
      if (!categoryDoc) {
        console.log('❌ Category not found, creating new category:', categoryName);
        // Create new category
        categoryDoc = new CategoryModel({ 
          name: categoryName, 
          des: `Description for ${categoryName}` 
        });
        await categoryDoc.save();
        console.log('✅ New category created:', categoryDoc);
      } else {
        console.log('✅ Category found:', categoryDoc);
      }
      
      categoryId = categoryDoc._id;
    }

    console.log('🎯 Final category ID:', categoryId);

    // Create product with ObjectId
    const productData = {
      name: name.trim(),
      price: parseFloat(price),
      image: image?.trim() || "",
      description: description?.trim() || "",
      category: categoryId,
      brand: brand?.trim() || "",
      stock: parseInt(stock) || 0,
      discount: parseInt(discount) || 0
    };

    console.log('🚀 Creating product with data:', productData);

    const product = await productModel.create(productData);
    
    // Populate category details in response
    const populatedProduct = await productModel.findById(product._id)
      .populate("category", "name des");
    
    console.log('✅ Product created successfully:', populatedProduct);
    
    res.status(201).json(populatedProduct);
    
  } catch (error) {
    console.error('❌ Error creating product:', error);
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