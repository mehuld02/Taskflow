import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  priority: string;
  status: "pending" | "completed";
  userId: string;
  projectId: string; // ✅ added
  createdAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    priority: { type: String, default: "medium" },
    status: { type: String, enum: ["pending", "completed"], default: "pending" },
    userId: { type: String, required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true }, // ✅ relation
  },
  { timestamps: true }
);

export default mongoose.models.Task || mongoose.model<ITask>("Task", TaskSchema);
