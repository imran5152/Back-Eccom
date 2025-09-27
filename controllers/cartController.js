import cartModel from "../model/cartModel.js";

export const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    
    let Cart = await cartModel
      .findOne({ user: userId })
      .populate("user", "name email")
      .populate("products.product", "name price image");

    if (Cart) {
      
      const productIndex = Cart.products.findIndex(
        (p) => p.product.toString() === productId
      );

      if (productIndex > -1) {
       
        Cart.products[productIndex].quantity += quantity;
      } else {
        Cart.products.push({ product: productId, quantity });
      }

      Cart.updatedAt = Date.now();
      await Cart.save();
      return res.status(200).json({ message: "Cart updated", Cart });
    } else {
      // Create new cart
      Cart = new cartModel({
        user: userId,
        products: [{ product: productId, quantity }],
      });
      await Cart.save();
      return res.status(201).json({ message: "New cart created", Cart });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




export const getCart = async (req, res) => {
  const userId = req.params.userId;
  try {
    const Cart = await cartModel
      .findOne({ user: userId })
      .populate("user", "name email")     
      .populate("products.product", "name price"); 

    if (!Cart) {
      return res.status(404).json({ message: "Cart Not Found" });
    }

    res.status(200).json(Cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCartProduct = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await cartModel.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

    if (productIndex > -1) {
      cart.products[productIndex].quantity = quantity;
      cart.updatedAt = Date.now();
      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await cartModel.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter(p => p.product.toString() !== productId);
    cart.updatedAt = Date.now();
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteCart = async (req, res) => {
  const { userId } = req.params;

  try {
    await cartModel.findOneAndDelete({ user: userId });
    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
