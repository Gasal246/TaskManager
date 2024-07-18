import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IRegions extends Document {
  DepartmentId: ObjectId;
  _id: ObjectId;
  RegionHead: ObjectId;
  Administrator: ObjectId;
  RegionName: String;
  Staffs: ObjectId[] | null;
}

const RegionsSchema: Schema = new Schema({
  DepartmentId: { type: Schema.Types.ObjectId, required: true, ref: "Departments" },
  RegionHead: { type: Schema.Types.ObjectId, required: true, ref: "Users" },
  Administrator: { type: Schema.Types.ObjectId, required: true, unique: true, ref: "Users" },
  RegionName: { type: String, required: true },
  Staffs: [{ type: Schema.Types.ObjectId,  }],
});

const Regions = mongoose.models?.Regions || mongoose.model<IRegions>('Regions', RegionsSchema);

export default Regions;

