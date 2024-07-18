import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IAreas extends Document {
  _id: ObjectId;
  RegionId: ObjectId;
  Administrator: ObjectId | null;
  Areaname: String | null;
  AreaHead: ObjectId | null;
  Staffs: ObjectId[] | null;
}

const AreasSchema: Schema = new Schema({
  RegionId: { type: Schema.Types.ObjectId, required: true, ref: "Regions" },
  Administrator: { type: Schema.Types.ObjectId, ref: "Users" },
  Areaname: { type: String },
  AreaHead: { type: Schema.Types.ObjectId, ref: "Users" },
  Staffs: [{ type: Schema.Types.ObjectId, ref: "Users" }],
});

const Areas = mongoose.models?.Areas || mongoose.model<IAreas>('Areas', AreasSchema);

export default Areas;

