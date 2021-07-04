import Category from "../models/category.model";

export const getCategories = async (query) => {
  const categoriesList = await Category.find(query);
  return categoriesList;
};

export const getOneCategory = async (query) => {
  const category = await Category.findOne(query);
  return category;
};
export const createCategory = async (category) => {
  const newCategory = await new Category(category).save();
  return newCategory;
};
