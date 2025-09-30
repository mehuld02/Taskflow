import mongoose, { Schema, model, models } from "mongoose";

const NotificationPreferenceSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    emailNotifications: { type: Boolean, default: true },
    pushNotifications: { type: Boolean, default: false },
    taskReminders: { type: Boolean, default: true },
    weeklySummary: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const NotificationPreference =
  models.NotificationPreference ||
  model("NotificationPreference", NotificationPreferenceSchema);

export default NotificationPreference;
