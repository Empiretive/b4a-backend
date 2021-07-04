import { isEmpty } from "lodash";
import { Response } from "../../common/response";
import { CategoryState } from "../../common/States";
import * as CategoryDao from "./data_objects/category.dao";

export const getCategories = async (req, res) => {
  try {
    const categories = await CategoryDao.getCategories({
      deletedAt: null,
    });

    return res
      .json(
        Response(
          categories,
          "CATEGORY.FIND.SUCCESS",
          "CATEGORY.FIND.ERROR.NOT_FOUND",
          !isEmpty(categories)
        )
      )
      .status(!isEmpty(categories) ? 200 : 404);
  } catch (error) {
    return res
      .json(Response(error, null, "CATEGORY.FIND.ERROR.BAD_REQUEST", false))
      .status(400);
  }
};

// Create Category

export const createCategory = async (req, res) => {
  try {
    const categoryFound = await CategoryDao.getOneCategory({
      name: req.body.name,
    });

    if (!isEmpty(categoryFound)) {
      return res
        .json(
          Response(
            categoryFound,
            null,
            "CATEGORY.CREATE.ERROR.ALREADY_EXISTS",
            false
          )
        )
        .status(400);
    }
    const category = {
      name: req.body.name,
      description: req.body.description,
      color: req.body.color,
      status: CategoryState.enable,
    };

    const categoryCreated = await CategoryDao.createCategory(category);

    res
      .json(
        Response(
          categoryCreated,
          "CATEGORY.CREATE.SUCCESS",
          "CATEGORY.CREATE.ERROR.CANT_BE_CREATED",
          !isEmpty(categoryCreated)
        )
      )
      .status(!isEmpty(categoryCreated) ? 200 : 400);
  } catch (error) {
    return res.json(
      Response(error, null, "CATEGORY.CREATE.ERROR.BAD_REQUEST", false)
    ).s;
  }
};
