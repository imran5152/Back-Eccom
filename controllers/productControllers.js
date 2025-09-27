import productModel from "../model/productModel.js";

// GET ALL PRODUCTS with populated category
export const getprodcut = async (req, res) => {
  try {
    // populate category name and description
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


export const createProducts = async (req, res) => {
  try {
    const product = await productModel.create(req.body); 
    res.status(201).json(product);
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
