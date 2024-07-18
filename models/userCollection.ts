import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IUsers extends Document {
  _id: ObjectId;
  Email: String;
  Password: String;
  Name: String;
  IsAdmin: Boolean | null;
  Documents: {
     DocName: String | null;
     DocUrl: String | null;
     ExpireAt: Date | null;
     RemindAt: Date | null;
  }[];
  Skills: String[] | null;
  Addedby: ObjectId | null;
  Region: ObjectId | null;
  Area: ObjectId | null;
  IsRegionalHead: Boolean | null;
  IsAreaHead: Boolean | null;
  InitialEntry: Boolean | null;
  VerifyCode: String | null;
  AvatarUrl: String | null;
  Status: String | null;
}

const UsersSchema: Schema = new Schema({
  Email: { type: String, required: true, unique: true },
  Name: { type: String, required: true },
  Password: { type: String },
  IsAdmin: { type: Boolean },
  Documents: [{
     DocName: { type: String },
     DocUrl: { type: String },
     ExpireAt: { type: Date },
     RemindAt: { type: Date },
  }],
  Skills: [{ type: String,  }],
  Addedby: { type: Schema.Types.ObjectId },
  IsRegionalHead: { type: Boolean },
  IsAreaHead: { type: Boolean },
  InitialEntry: { type: Boolean, default: true },
  VerifyCode: { type: String },
  AvatarUrl: { type: String },
  Status: { type: String, enum: ['active', 'blocked', 'unverified']},
  Region: { type: Schema.Types.ObjectId, ref: "Regions" },
  Area: { type: Schema.Types.ObjectId, ref: "Areas" }
}, { timestamps: true });

const Users = mongoose.models?.Users || mongoose.model<IUsers>('Users', UsersSchema);

export default Users;

