import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IDepartments extends Document {
  _id: ObjectId;
  AdminId: ObjectId;
  DepartmentName: String;
  DepartmentHead: ObjectId | null;
  Staffs: ObjectId[] | null;
  Regions: ObjectId[] | null;
  AllowProjects: Boolean;
  AllowTasks: Boolean;
  MaximumStaffs: Number;
}

const DepartmentsSchema: Schema = new Schema({
  AdminId: { type: Schema.Types.ObjectId, required: true, ref: "Users" },
  DepartmentName: { type: String, required: true },
  DepartmentHead: { type: Schema.Types.ObjectId, ref: "Users" },
  Staffs: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  Regions: [{ type: Schema.Types.ObjectId,  }],
  AllowProjects: { type: Boolean, required: true },
  AllowTasks: { type: Boolean, required: true },
  MaximumStaffs: { type: Number, required: true },
}, { timestamps: true });

const Departments = mongoose?.models?.Departments || mongoose.model<IDepartments>('Departments', DepartmentsSchema);

export default Departments;

