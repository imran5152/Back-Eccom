import reviewModel from "../model/reviewModel.js";

// GET ALL REVIEWS
export const allReviews = async (req, res) => {
  try {
    const reviews = await reviewModel
      .find({})
      .populate("user", "name  email")  
      .populate("product", "name price");

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET REVIEW BY ID
export const reviewById = async (req, res) => {
  try {
    const review = await reviewModel
      .findById(req.params.id)
      .populate("user", "name email")
      .populate("product", "name price");

    if (!review) return res.status(404).json({ message: "Review not found" });
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE NEW REVIEW
export const createReview = async (req, res) => {
  try {
    const review = await reviewModel.create(req.body);
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE REVIEW BY ID
export const updateReview = async (req, res) => {
  try {
    const review = await reviewModel
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate("user", "name email")
      .populate("product", "name price");

    if (!review) return res.status(404).json({ message: "Review not found" });
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE REVIEW BY ID
export const deleteReview = async (req, res) => {
  try {
    const deletedReview = await reviewModel.findByIdAndDelete(req.params.id);
    if (!deletedReview) return res.status(404).json({ message: "Review not found" });
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
