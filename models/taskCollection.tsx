import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface ITasks extends Document {
  _id: ObjectId;
  TaskName: String | null;
  Creator: ObjectId | null;
  Description: String | null;
  AcceptedBy: ObjectId | null;
  ForwardList: ObjectId[] | null;
  ProjectId: ObjectId | null;
  AdminId: ObjectId | null;
  EnrolledBy: ObjectId[] | null;
  Comments: {
    Comment: String | null;
    createdAt: Date | null;
    Creator: ObjectId | null;
  }[];
  Status: String | null;
  Priority: String | null;
}

const TasksSchema: Schema = new Schema({
  TaskName: { type: String },
  Creator: { type: Schema.Types.ObjectId, ref: "Users" },
  Description: { type: String },
  AcceptedBy: { type: Schema.Types.ObjectId, ref: "Users" },
  ForwardList: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  ProjectId: { type: Schema.Types.ObjectId },
  AdminId: { type: Schema.Types.ObjectId, ref: "Users" },
  EnrolledBy: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  Comments: [{
    Comment: { type: String },
    createdAt: { type: Date, default: Date.now() },
    Creator: { type: Schema.Types.ObjectId, ref: "Users" },
  }],
  Status: { type: String, enum: ['pending', 'completed'] },
  Priority: { type: String, enum: ['high', 'average', 'low'] },
}, { timestamps: true });

const Tasks = mongoose.models?.Tasks || mongoose.model<ITasks>('Tasks', TasksSchema);

export default Tasks;

