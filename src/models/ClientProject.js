import mongoose from "mongoose";

const ClientProjectSchema = new mongoose.Schema(
  {
    clientEmail: { type: String, required: true }, // Link project to user by email
    title: { type: String, required: true },
    status: { type: String, default: "Active" }, // Active, Completed, Pending
    progress: { type: Number, default: 0 }, // 0 to 100
    nextMilestone: { type: String, default: "Discovery" },
    dueDate: { type: String, default: "TBD" },
    // Auto-generated Stages for simplicity in Admin
    stages: { 
        type: Array, 
        default: [
            { id: 1, title: "Discovery", status: "pending", date: "Pending" },
            { id: 2, title: "UI/UX Design", status: "pending", date: "Pending" },
            { id: 3, title: "Development", status: "pending", date: "Pending" },
            { id: 4, title: "Testing", status: "pending", date: "Pending" },
            { id: 5, title: "Deployment", status: "pending", date: "Pending" }
        ]
    },
    // Recent Updates List
    updates: { type: Array, default: [] } 
  },
  { timestamps: true }
);

export default mongoose.models.ClientProject || mongoose.model("ClientProject", ClientProjectSchema);