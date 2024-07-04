import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IAdmindatas extends Document {
  _id: ObjectId;
  AdminId: ObjectId | null;
  Departments: ObjectId[];
  Regions: String[] | null;
  Areas: String[] | null;
}

const AdmindatasSchema: Schema = new Schema({
  AdminId: { type: Schema.Types.ObjectId, ref: "Users" },
  Departments: [{ type: Schema.ObjectId }],
  Regions: [{ type: String,  }],
  Areas: [{ type: String,  }],
}, { timestamps: true });

const Admindatas = mongoose.models?.Admindatas || mongoose.model<IAdmindatas>('Admindatas', AdmindatasSchema);

export default Admindatas;

