const Category = require("../model/category");

const insertCategory = async (req, res) => {
  const { category, icons } = req.body;

  try {
    const existingCategory = await Category.findOne({ category });

    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const newCategory = new Category({ category, icons });
    const savedCategory = await newCategory.save();

    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const insertSubCategory = async (req, res) => {
  const { categoryId } = req.query;
  const { category, icons } = req.body;

  try {
    const categoryDoc = await Category.findById(categoryId);
    if (!categoryDoc) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const existingSubCategory = categoryDoc.subCategories.find((subCat) => subCat.category === category);
    if (existingSubCategory) {
      return res.status(400).json({ message: 'Subcategory already exists' });
    }

    categoryDoc.subCategories.push({ category, icons });
    await categoryDoc.save();

    res.status(201).json(categoryDoc);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const insertSubSubCategory = async (req, res) => {
  const { categoryId, subCategoryId } = req.query;
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

    const existingSubSubCategory = subCategory.subSubCategory.find((subSubCat) => subSubCat.category === category);
    if (existingSubSubCategory) {
      return res.status(400).json({ message: 'Sub-subcategory already exists' });
    }

    subCategory.subSubCategory.push({ category, icons });
    await categoryDoc.save();

    res.status(201).json(categoryDoc);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const updateCategory = async (req, res) => {
  // Update main category
  const { categoryId } = req.query;
  console.log(categoryId);

  const { category, icons } = req.body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { category, icons },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};




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

  const deletecategory = async (req, res) => {
    const { id } = req.query;
  
    try {
      // Find the category by its ID
      const category = await Category.findById(id);
  
      // Check if the category exists
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      // Check if there are subcategories or sub-subcategories
      const hasSubcategories = category.subCategories.length > 0;
      const hasSubSubcategories = category.subCategories.some(subCat => subCat.subSubCategory.length > 0);
  
      if (hasSubcategories || hasSubSubcategories) {
        return res.status(400).json({ message: 'Category has associated subcategories or sub-subcategories and cannot be deleted' });
      }
  
      // Proceed to delete the category
      const deletedCategory = await Category.findByIdAndDelete(id);
  
      if (!deletedCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
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
  
      const subCategory = categoryDoc.subCategories[subCategoryIndex];
      console.log(`SubCategory before removal: ${subCategory}`);
  
      // Check if there are sub-subcategories
      if (subCategory.subSubCategory && subCategory.subSubCategory.length > 0) {
        console.log('Subcategory has associated sub-subcategories and cannot be deleted');
        return res.status(400).json({ message: 'Subcategory has associated sub-subcategories and cannot be deleted' });
      }
  
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

const getAll = async(req,res) =>{
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}

const getSpecificCategory = async(req,res)=>{
  try {
    const {categoryId} = req.query;
    const categories = await Category.findById(categoryId);

    if (!categories) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}

const getSpecificSubcategory = async(req,res)=>{
  const { categoryId, subCategoryId } = req.query;
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    const subCategory = category.subCategories.id(subCategoryId);
    if (!subCategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }
    res.status(200).json(subCategory);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}

const getSpecificSubSubcategory = async (req, res) => {
  const { categoryId, subCategoryId, subSubCategoryId } = req.query;

  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const subCategory = category.subCategories.id(subCategoryId);
    if (!subCategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    const subSubCategory = subCategory.subSubCategory.id(subSubCategoryId);
    if (!subSubCategory) {
      return res.status(404).json({ message: 'Sub-subcategory not found' });
    }

    res.status(200).json(subSubCategory);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


module.exports = { insertCategory,insertSubCategory,insertSubSubCategory,updateCategory,updateSubCategory,updatesubsubcategory,deletecategory,deletesubcategory,deletesubsubcategory,getAll,getSpecificCategory,getSpecificSubcategory,getSpecificSubSubcategory };
