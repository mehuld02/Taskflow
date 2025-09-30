import mongoose, { Schema, Document } from "mongoose";

export interface IUserSettings extends Document {
  userId: string;
  theme: "light" | "dark";
  notifications: boolean;
  taskPreferences: {
    defaultPriority: "High" | "Medium" | "Low";
    showCompleted: boolean;
  };
}

const UserSettingsSchema = new Schema<IUserSettings>(
  {
    userId: { type: String, required: true, unique: true },
    theme: { type: String, enum: ["light", "dark"], default: "light" },
    notifications: { type: Boolean, default: true },
    taskPreferences: {
      defaultPriority: { type: String, enum: ["High", "Medium", "Low"], default: "Medium" },
      showCompleted: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

export default mongoose.models.UserSettings ||
  mongoose.model<IUserSettings>("UserSettings", UserSettingsSchema);
