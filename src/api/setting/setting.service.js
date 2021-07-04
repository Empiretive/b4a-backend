import { isEmpty } from "lodash";
import { Response } from "../../common/response";
import * as SettingDao from "./data_objects/setting.dao";

// App Settings
export const getAppSettings = async (req, res) => {
  try {
    const settings = await SettingDao.getSetting({
      type: "APP",
      name: "APP_SETTINGS",
      deletedAt: null,
    });
    if (isEmpty(settings) || settings == null) {
      return res
        .json(Response(null, null, "SETTING.APP.NOT_FOUND", false))
        .status(404);
    }
    return res
      .json(
        Response(
          settings,
          "SETTING.APP.SUCCESS.FOUND",
          "SETTING.APP.ERROR",
          true
        )
      )
      .status(200);
  } catch (error) {
    return res
      .json(Response(error, null, "SETTING.APP.ERROR.BAD_REQUEST", false))
      .status(400);
  }
};

export const setAppSettings = async (req, res) => {
  try {
    const settingsExists = await SettingDao.getSetting({
      type: "APP",
      name: "APP_SETTINGS",
      deletedAt: null,
    });
    if (!isEmpty(settingsExists)) {
      return res
        .json(Response(null, null, "SETTING.APP.ERROR.SETTING_EXISTS", false))
        .status(400);
    }
    const appSettings = {
      name: req.body.name,
      description: req.body.description,
      rif: req.body.rif,
      logo: req.body.logo,
      email: req.body.email,
      phone: req.body.phone,
    };
    const setting = await SettingDao.setSetting({
      type: "APP",
      name: "APP_SETTINGS",
      value: appSettings,
    });
    return res
      .json(
        Response(
          setting,
          "SETTING.APP.SUCCESS",
          "SETTING.APP.ERROR.CANT_BE_CREATED",
          !isEmpty(setting)
        )
      )
      .status(!isEmpty(setting) ? 200 : 400);
  } catch (error) {
    return res
      .json(Response(error, null, "SETTING.APP.ERROR.BAD_REQUEST", false))
      .status(400);
  }
};

export const updateAppSettings = async (req, res) => {
  try {
    const settings = await SettingDao.getSetting({
      type: "APP",
      name: "APP_SETTINGS",
      deletedAt: null,
    });
    if (isEmpty(settings) || settings == null) {
      return res
        .json(Response(null, null, "SETTING.APP.NOT_FOUND", false))
        .status(404);
    }
    const appSettings = {
      name: req.body.name,
      description: req.body.description,
      rif: req.body.rif,
      logo: req.body.logo,
      email: req.body.email,
      phone: req.body.phone,
    };
    const appSettingsUpdated = await SettingDao.updateSetting(
      {
        _id: settings._id,
        deletedAt: null,
      },
      {
        type: "APP",
        name: "APP_SETTINGS",
        value: appSettings,
      }
    );

    return res
      .json(
        Response(
          appSettingsUpdated,
          "SETTING.APP.SUCCESS.UPDATE",
          "SETTING.APP.ERROR",
          !isEmpty(appSettingsUpdated)
        )
      )
      .status(!isEmpty(appSettingsUpdated) ? 200 : 400);
  } catch (error) {
    return res
      .json(Response(error, null, "SETTING.APP.ERROR.BAD_REQUEST", false))
      .status(400);
  }
};

// Any Setting

export const getAnySettings = async (req, res) => {
  try {
    const settings = await SettingDao.getSetting({
      type: req.query.type,
      name: req.query.name,
    });
    if (isEmpty(settings) || settings == null) {
      return res
        .json(Response(null, null, "SETTING.ANY.NOT_FOUND", false))
        .status(404);
    }
    return res
      .json(
        Response(
          settings,
          "SETTING.APP.SUCCESS.FOUND",
          "SETTING.APP.ERROR",
          true
        )
      )
      .status(200);
  } catch (error) {
    return res
      .json(Response(error, null, "SETTING.APP.ERROR.BAD_REQUEST", false))
      .status(400);
  }
};

export const setAnySettings = async (req, res) => {
  try {
    const settingsExists = await SettingDao.getSetting({
      type: req.body.type,
      name: req.body.name,
    });
    if (!isEmpty(settingsExists)) {
      return res
        .json(Response(null, null, "SETTING.ANY.ERROR.SETTING_EXISTS", false))
        .status(400);
    }
    const appSettings = req.body.value;
    const setting = await SettingDao.setSetting({
      type: req.body.type,
      name: req.body.name,
      value: appSettings,
    });
    return res
      .json(
        Response(
          setting,
          "SETTING.APP.SUCCESS",
          "SETTING.APP.ERROR.CANT_BE_CREATED",
          !isEmpty(setting)
        )
      )
      .status(!isEmpty(setting) ? 200 : 400);
  } catch (error) {
    return res
      .json(Response(error, null, "SETTING.APP.ERROR.BAD_REQUEST", false))
      .status(400);
  }
};

export const updateAnySettings = async (req, res) => {
  try {
    const settings = await SettingDao.getSetting({
      type: req.body.type,
      name: req.body.name,
    });
    if (isEmpty(settings) || settings == null) {
      return res
        .json(Response(null, null, "SETTING.APP.NOT_FOUND", false))
        .status(404);
    }
    const appSettings = req.body.value;
    const appSettingsUpdated = await SettingDao.updateSetting(
      {
        _id: settings._id,
        deletedAt: null,
      },
      {
        type: req.body.type,
        name: req.body.name,
        value: appSettings,
      }
    );

    return res
      .json(
        Response(
          appSettingsUpdated,
          "SETTING.APP.SUCCESS.UPDATE",
          "SETTING.APP.ERROR",
          !isEmpty(appSettingsUpdated)
        )
      )
      .status(!isEmpty(appSettingsUpdated) ? 200 : 400);
  } catch (error) {
    return res
      .json(Response(error, null, "SETTING.APP.ERROR.BAD_REQUEST", false))
      .status(400);
  }
};

// Styles app Settings
// export const setAppStyles = async (req, res) => {
//   try {
//     const settingStyles = await SettingDao.setSetting({
//       type: "APP",
//       name: "APP_STYLES",
//       value: req.body,
//     });
//   } catch (error) {}
// };
