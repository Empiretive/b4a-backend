import { isEmpty } from "lodash";
import Setting from "../models/setting.model";

export const setSetting = async ({ type, name, value }) => {
  const settingToSave = new Setting({
    type: type,
    name: name,
    value: value,
  });

  await settingToSave.save();
  return settingToSave;
};

export const getSetting = async (query) => {
  const setting = await Setting.findOne(query);

  return setting;
};

export const updateSetting = async (query, newSetting) => {
  const settingFound = await Setting.findOne(query);

  if (!isEmpty(settingFound)) {
    const settingUpdate = await Setting.findByIdAndUpdate(
      settingFound._id,
      newSetting,
      { new: true }
    );
    return settingUpdate;
  }

  return 0;
};
