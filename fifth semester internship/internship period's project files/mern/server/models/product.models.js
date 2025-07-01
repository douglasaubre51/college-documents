import mongoose from "mongoose"

const  productSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    prize:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    
},{timestamps:true});


const product = mongoose.model("product",productSchema);


export default product;


export const deleteProduct = async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "You are not allowed to access this API" });
  }

  const { id } = req.params;

  if (!id) {
    return res.status(404).json({ success: false, message: "ID is required" });
  }

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};




export const updateProduct = async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "You are not allowed to access this API" });
  }

  const { id } = req.params;
  const { title, price, description, image } = req.body;

  if (!id) {
    return res.status(400).json({ success: false, message: "ID is required" });
  }

  if (!title || !price || !description || !image) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        $set: { title, price, description, image }
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      updatedProduct
    });
  } catch (error) {
    console.log(error);

  }
};
