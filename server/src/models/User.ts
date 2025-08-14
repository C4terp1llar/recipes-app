// коллекция пользователей

import mongoose, {Schema, Document} from "mongoose";

export interface IUserDocument extends Document {
  login: string;
  password: string;
}

const UserSchema = new Schema<IUserDocument>(
  {
    login: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IUserDocument>("User", UserSchema);
