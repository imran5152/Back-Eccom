import WishlistModel from "../model/wishlistModel.js";

export const addWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ message: "UserId and ProductId required" });
  }

  try {
    let wishlist = await WishlistModel.findOne({ user: userId });

    if (wishlist) {
      if (wishlist.products.includes(productId)) {
        return res.status(400).json({ message: "Product already in wishlist" });
      }
      wishlist.products.push(productId);
      await wishlist.save();
    } else {
      wishlist = await WishlistModel.create({ user: userId, products: [productId] });
    }

    
    wishlist = await WishlistModel.findById(wishlist._id)
      .populate("user", "name email")
      .populate("products", "name price image");

    res.status(201).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getwishlist = async (req, res) => {
  try {
    const wishlist = await WishlistModel.findById(req.params.id)
                                        .populate("user", "name email")
                                        .populate("products", "name price");
    if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateWishlist = async (req, res) => {
  const { productId } = req.body;
  const wishlistId = req.params.id;

  if (!productId) {
    return res.status(400).json({ message: "ProductId is required" });
  }

  try {
    let wishlist = await WishlistModel.findById(wishlistId);
    if (!wishlist) {
      return res.status(404).json({ message: "WishList Not Found" });
    }

    const productIndex = wishlist.products.findIndex(
      (p) => p.toString() === productId
    );

    if (productIndex > -1) {
      // Remove product
      wishlist.products.splice(productIndex, 1);
    } else {
      // Add product
      wishlist.products.push(productId);
    }

    await wishlist.save();

    // Populate AFTER save
    wishlist = await WishlistModel.findById(wishlistId)
      .populate("user", "name email")
      .populate("products", "name price");

    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




export const deleteWishlist = async (req, res) => {
    const { id } = req.params;
    try {
        const wishlist = await WishlistModel.findByIdAndDelete(id);
        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }
        res.status(200).json({ message: "Wishlist deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
