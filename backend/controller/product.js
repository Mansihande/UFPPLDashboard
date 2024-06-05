const Product = require("../model/product")

const insertProduct = async(req,res)=>{

  try {
    const { title, details, brand, price, categories, subcategories, subSubcategories } = req.body;
    const product = new Product({
      title,
      details,
      brand,
      price,
      categories,
      subcategories,
      subSubcategories
    });
    await product.save();
    res.status(201).json({ message: 'Product inserted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error inserting product' });
  }
}

module.exports = {insertProduct} 