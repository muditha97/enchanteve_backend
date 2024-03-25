import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
  name_en: {
    type: String,
  },
  name_si: {
    type: String,
  },
  name_ta: {
    type: String,
  },
});

export const City = mongoose.model("City", citySchema);
