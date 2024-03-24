import mongoose from "mongoose";

export interface OrderProductType {
  productId: mongoose.Schema.Types.ObjectId;
  quantity: number;
}
