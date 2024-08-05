import mongoose, { Schema } from "mongoose";

const outPutSchema = new Schema(
  {
    output: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const OutPut = mongoose.model("OutPut", outPutSchema);

export default OutPut;
