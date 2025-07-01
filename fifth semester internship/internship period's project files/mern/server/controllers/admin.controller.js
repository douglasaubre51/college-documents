import product from "../models/product.models.js";
export const addProduct = async(req,res)=>{
    if(!req.user.isAdmin){
        return res.status(403).json({message:"you are not allowed to access this api"});
    }
    const{title,price,discription,image}=req.body;
     if(!title || !price|| !discription ||!image){
        return res.status(400).json({
            success:false,message:"all fields are required"});
    }
    try{
        const newProduct=new product({
            title,
            price,
            discription,
            image
        });
        await newProduct.save();
        res.json({success:true,message:"new product added",newProduct});
    }catch(error){
        console.log(error);
    }
}



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
      },
      { new: true }
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

