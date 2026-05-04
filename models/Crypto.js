import mongoose from "mongoose";

const cryptoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    symbol: {
      type: String,
      required: [true, "Symbol is required"],
      uppercase: true,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
    },
    change24h: {
      type: Number,
      required: [true, "24h change is required"],
      default: 0,
    },
    mktCap: {
      type: String,
      default: "N/A",
    },
    volume: {
      type: String,
      default: "N/A",
    },
    tradable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Crypto = mongoose.model("Crypto", cryptoSchema);
export default Crypto;
