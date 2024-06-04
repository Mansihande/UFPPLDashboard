const Category = require("../model/category");

const insertCategory = async (req, res) => {
  const { category, icons, subCategories } = req.body;

  try {
    // Check if the main category already exists
    let existingCategory = await Category.findOne({ category });

    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    // Create a new category
    const newCategory = new Category({
      category,
      icons,
      subCategories,
    });

    // Save the new category
    const savedCategory = await newCategory.save();

    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const updateCategory = async(req,res)=>{
    const { id } = req.query;
    const { category, icons } = req.body;
  
    try {
      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { category, icons },
        { new: true }
      );
  
      if (!updatedCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      res.status(200).json(updatedCategory);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
}

const updateSubCategory = async(req,res)=>{
    // Update category
    const { categoryId, subCategoryId } = req.query;
    console.log(categoryId)
    console.log(subCategoryId)

    const { category, icons } = req.body;  
    try {
        const categoryDoc = await Category.findById(categoryId);
        if (!categoryDoc) {
          return res.status(404).json({ message: 'Category not found' });
        }
    
        const subCategory = categoryDoc.subCategories.id(subCategoryId);
        if (!subCategory) {
          return res.status(404).json({ message: 'Subcategory not found' });
        }
       console.log(subCategory)

        subCategory.category = category || subCategory.category;
        subCategory.icons = icons || subCategory.icons;
    
        await categoryDoc.save();
  
      if (!categoryDoc) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      res.status(200).json(categoryDoc);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

  const updatesubsubcategory = async(req,res)=>{
    const { categoryId, subCategoryId, subSubCategoryId } = req.query;
    const { category, icons } = req.body;
  
    try {
      const categoryDoc = await Category.findById(categoryId);
      if (!categoryDoc) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      const subCategory = categoryDoc.subCategories.id(subCategoryId);
      if (!subCategory) {
        return res.status(404).json({ message: 'Subcategory not found' });
      }
  
      const subSubCategory = subCategory.subSubCategory.id(subSubCategoryId);
      if (!subSubCategory) {
        return res.status(404).json({ message: 'Sub-subcategory not found' });
      }
  
      subSubCategory.category = category || subSubCategory.category;
      subSubCategory.icons = icons || subSubCategory.icons;
  
      await categoryDoc.save();
      res.status(200).json(categoryDoc);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  }

  const deletecategory = async(req,res) =>{
    const { id } = req.query;

  try {
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
  }
  
  const deletesubcategory = async (req, res) => {
    // Delete subcategory
    const { categoryId, subCategoryId } = req.query;
  
    console.log(`Category ID: ${categoryId}`);
    console.log(`SubCategory ID: ${subCategoryId}`);
  
    try {
      const categoryDoc = await Category.findById(categoryId);
      if (!categoryDoc) {
        console.log('Category not found');
        return res.status(404).json({ message: 'Category not found' });
      }
  
      const subCategoryIndex = categoryDoc.subCategories.findIndex(subCat => subCat._id.toString() === subCategoryId);
      if (subCategoryIndex === -1) {
        console.log('Subcategory not found');
        return res.status(404).json({ message: 'Subcategory not found' });
      }
  
      console.log(`SubCategory before removal: ${categoryDoc.subCategories[subCategoryIndex]}`);
  
      // Remove the subcategory from the array
      categoryDoc.subCategories.splice(subCategoryIndex, 1);
  
      await categoryDoc.save();
      console.log('Subcategory deleted successfully');
      res.status(200).json({ message: 'Subcategory deleted successfully' });
    } catch (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).json({ message: 'Server error', error });
    }
  };

  const deletesubsubcategory = async(req,res)=>{
    // Delete sub-subcategory
    const { categoryId, subCategoryId, subSubCategoryId } = req.query;
  console.log(categoryId)
  
    try {
      const categoryDoc = await Category.findById(categoryId);
      if (!categoryDoc) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      const subCategory = categoryDoc.subCategories.id(subCategoryId);
      if (!subCategory) {
        return res.status(404).json({ message: 'Subcategory not found' });
      }
  
      const subSubCategoryIndex = subCategory.subSubCategory.findIndex(subSubCat => subSubCat._id.toString() === subSubCategoryId);
    if (subSubCategoryIndex === -1) {
      console.log('Sub-subcategory not found');
      return res.status(404).json({ message: 'Sub-subcategory not found' });
    }

    console.log(`SubSubCategory before removal: ${subCategory.subSubCategory[subSubCategoryIndex]}`);

    subCategory.subSubCategory.splice(subSubCategoryIndex, 1);

    await categoryDoc.save();
      res.status(200).json({ message: 'Sub-subcategory deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  }
module.exports = { insertCategory,updateCategory,updateSubCategory,updatesubsubcategory,deletecategory,deletesubcategory,deletesubsubcategory };
