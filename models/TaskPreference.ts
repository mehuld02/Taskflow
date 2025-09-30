import { Schema, model, models } from "mongoose";

const TaskPreferenceSchema = new Schema({
  userId: { type: String, required: true }, // later replace with session userId
  defaultPriority: { type: String, enum: ["High", "Medium", "Low"], default: "Medium" },
  autoArchive: { type: Boolean, default: false },
  reminders: { type: Boolean, default: true },
});

export const TaskPreference =
  models.TaskPreference || model("TaskPreference", TaskPreferenceSchema);
