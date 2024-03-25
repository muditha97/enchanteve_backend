import mongoose from "mongoose";

const districtSchema = new mongoose.Schema({
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

export const District = mongoose.model("District", districtSchema);
