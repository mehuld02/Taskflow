import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  name: string;
  description: string;
  progress: number;
  status: "In Progress" | "Completed" | "Pending";
  createdAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    progress: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["In Progress", "Completed", "Pending"],
      default: "Pending",
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export default mongoose.models.Project ||
  mongoose.model<IProject>("Project", ProjectSchema);
