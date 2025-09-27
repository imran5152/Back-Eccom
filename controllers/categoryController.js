import CategoryModel from "../model/categoryModel.js";

export const allCategory = async (req, res) => {
  try {
    const allCategory = await CategoryModel.find({});
    res.status(200).json(allCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getCategoryById =async(req,res)=>{
  try {
    const category=await CategoryModel.findById(req.params.id)
    if(!category){
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.statuds(500).json({message:error.message})
  }
}
export const createCategory = async (req, res) => {
  try {
    const { name, des } = req.body;

    if (!name || !des) {
      return res.status(400).json({ message: "Name and description are required" });
    }

    const newCategory = new CategoryModel({ name, des });
    const savedCategory = await newCategory.save();

    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateCategory=async(req,res)=>{
  try {
    const updateCategory=await CategoryModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true}
    )
    if(!updateCategory){
      return res.status(404).json({message:"Category Not Found"})
    }
    res.status(200).json(updateCategory)
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

export const deleteCategory=async(req,res)=>{
  try {
    const deleteCategory=await CategoryModel.findByIdAndDelete(req.params.id)
     if (!deleteCategory) {
        return res.status(400).json({message:"Id Not  Found"})
     } else {
      res.status(200).json({message:"Category deleted"})
     }

  } catch (error) {
    res.status(500).json({message:error.message})
  }
}