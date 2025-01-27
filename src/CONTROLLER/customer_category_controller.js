import Category from "../MODELS/customer_category_model.js";

export const store_category = async (req,res) => {
try {
  const { name_category } = req.body;
  if(!name_category){
    return res.status(400).json({message: "Please enter category name"});
  }
  const category = await Category.create({ name_category });
  res.json(category);
} catch (error) {
    console.log(error.message)
}
}