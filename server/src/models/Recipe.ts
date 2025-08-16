import {Schema, model, Types} from "mongoose";

interface IRecipe {
  title: string;
  ingredients: string[];
  category: "breakfast" | "lunch" | "dinner" | "snack";
  comment?: string;
  author: Types.ObjectId;
}

const RecipeSchema = new Schema<IRecipe>({
  title: {type: String, required: true},
  ingredients: {type: [String], required: true},
  category: {
    type: String,
    enum: ["breakfast", "lunch", "dinner", "snack"],
    required: true
  },
  comment: {type: String},
  author: {type: Schema.Types.ObjectId, ref: "User", required: true},
}, {timestamps: true});

export default model<IRecipe>("Recipe", RecipeSchema);
