const Product = require("../model/product")
const Category = require("../model/category")
const insertProduct = async(req,res)=>{

  try {
    const { title, details, brand, width ,thickness, categories, subcategories, subSubcategories } = req.body;
    const photo = req.files.map(file => file.filename); // Extract the filenames from the array of files

    console.log(subcategories)
    const product = new Product({
      title,
      details,
      brand,
      photo,
      width,
      thickness,
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

const updateProduct = async (req, res) => {
  const { productId } = req.query;
  const updateFields = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateFields,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const deleteProduct = async (req, res) => {
  const { productId } = req.query;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    // Map over each product to find and append the category name
    const productsWithCategoryName = await Promise.all(products.map(async (product) => {
      // Find the category based on the product's categoryId
      console.log(product.categories)
      const category = await Category.findOne({ '_id': product.categories });
      
      // Extract the category name
      const categoryName = category ? category.category : 'Uncategorized';

      // Append the category name to the product object
      return {
        ...product.toJSON(),
        categoryName
      };
    }));

    // Send the products with category names in the response
    res.status(200).json(productsWithCategoryName);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
const getSingleProduct = async (req, res) => {
  const { productId } = req.query;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


const getCategoryProducts = async (req, res) => {
  const { categoryId } = req.query;

  try {
    const products = await Product.find({ categories: categoryId });

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for this category' });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const getSubcategoryProducts = async (req, res) => {
  const { subcategoryId } = req.query;

  try {
    const products = await Product.find({ subcategories : subcategoryId });

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for this subcategory' });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const getSubSubcategoryProducts = async (req, res) => {
  const { subSubcategoryId } = req.query;

  try {
    const products = await Product.find({ subSubcategories:  subSubcategoryId  });

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for this sub-subcategory' });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {insertProduct,updateProduct,deleteProduct,getAllProducts,getSingleProduct,getCategoryProducts,getSubcategoryProducts,getSubSubcategoryProducts} 