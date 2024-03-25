import mongoose from "mongoose";

const provinceSchema = new mongoose.Schema({
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

export const Province = mongoose.model("Province", provinceSchema);
