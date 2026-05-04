/**
 * Seed Script — run once to populate initial crypto data:
 *   node seed.js
 */
import dotenv from "dotenv";
import mongoose from "mongoose";
import Crypto from "./models/Crypto.js";

dotenv.config();

const seedData = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: 68002.6,
    image:
      "https://dynamic-assets.coinbase.com/e785e0181f1a23a30d9476038d9be91e9f6c63959b538eabbc51a1abc8898940383291eede695c3b8dfaa1829a9b57f5a2d0a16b0523580346c6b8fab67af14b/asset_icons/b57ac673f06a4b0338a596817eb0a50ce16e2059f327dc117744449a47915cb2.png",
    change24h: -1.47,
    mktCap: "$1.4T",
    volume: "$28.1B",
    tradable: true,
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price: 1985.21,
    image:
      "https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png",
    change24h: -0.56,
    mktCap: "$239.5B",
    volume: "$12.8B",
    tradable: true,
  },
  {
    name: "Tether",
    symbol: "USDT",
    price: 1.0,
    image:
      "https://dynamic-assets.coinbase.com/41f6a93a3a222078c939115fc304a67c384886b7a9e6c15dcbfa6519dc45f6bb4a586e9c48535d099efa596dbf8a9dd72b05815bcd32ac650c50abb5391a5bd0/asset_icons/1f8489bb280fb0a0fd643c1161312ba49655040e9aaaced5f9ad3eeaf868eadc.png",
    change24h: 0.0,
    mktCap: "$184.0B",
    volume: "$55.7B",
    tradable: true,
  },
  {
    name: "Solana",
    symbol: "SOL",
    price: 84.1,
    image:
      "https://asset-metadata-service-production.s3.amazonaws.com/asset_icons/b658adaf7913c1513c8d120bcb41934a5a4bf09b6adbcb436085e2fbf6eb128c.png",
    change24h: 5.47,
    mktCap: "$48.0B",
    volume: "$2.3B",
    tradable: true,
  },
  {
    name: "XRP",
    symbol: "XRP",
    price: 1.36,
    image:
      "https://dynamic-assets.coinbase.com/e81509d2307f706f3a6f8999968874b50b628634abf5154fc91a7e5f7685d496a33acb4cde02265ed6f54b0a08fa54912208516e956bc5f0ffd1c9c2634099ae/asset_icons/3af4b33bde3012fd29dd1366b0ad737660f24acc91750ee30a034a0679256d0b.png",
    change24h: 3.22,
    mktCap: "$83.3B",
    volume: "$1.5B",
    tradable: true,
  },
  {
    name: "Dogecoin",
    symbol: "DOGE",
    price: 0.09,
    image:
      "https://dynamic-assets.coinbase.com/3803f30367bb3972e192cd3fdd2230cd37e6d468eab12575a859229b20f12ff9c994d2c86ccd7bf9bc258e9bd5e46c5254283182f70caf4bd02cc4f8e3890d82/asset_icons/1597d628dd19b7885433a2ac2d7de6ad196c519aeab4bfe679706aacbf1df78a.png",
    change24h: -0.95,
    mktCap: "$13.8B",
    volume: "$706.2M",
    tradable: true,
  },
  {
    name: "Cardano",
    symbol: "ADA",
    price: 0.26,
    image:
      "https://dynamic-assets.coinbase.com/da39dfe3632bf7a9c26b5aff94fe72bc1a70850bc488e0c4d68ab3cf87ddac277cd1561427b94acb4b3e37479a1f73f1c37ed311c11a742d6edf512672aea7bb/asset_icons/a55046bc53c5de686bf82a2d9d280b006bd8d2aa1f3bbb4eba28f0c69c7597da.png",
    change24h: 7.81,
    mktCap: "$9.2B",
    volume: "$401.2M",
    tradable: true,
  },
  {
    name: "USDC",
    symbol: "USDC",
    price: 1.0,
    image:
      "https://dynamic-assets.coinbase.com/3c15df5e2ac7d4abbe9499ed9335041f00c620f28e8de2f93474a9f432058742cdf4674bd43f309e69778a26969372310135be97eb183d91c492154176d455b8/asset_icons/9d67b728b6c8f457717154b3a35f9ddc702eae7e76c4684ee39302c4d7fd0bb8.png",
    change24h: 0.0,
    mktCap: "$77.3B",
    volume: "$6.3B",
    tradable: true,
  },
  {
    name: "BNB",
    symbol: "BNB",
    price: 627.58,
    image:
      "https://asset-metadata-service-production.s3.amazonaws.com/asset_icons/c347b6d1a7624e24c4e90089a69dfc8fb75523daf8eeb88007372a0c3a30d428.png",
    change24h: 2.14,
    mktCap: "$85.5B",
    volume: "$1.1B",
    tradable: true,
  },
  {
    name: "TRON",
    symbol: "TRX",
    price: 0.28,
    image:
      "https://dynamic-assets.coinbase.com/49567ec5f7c7a1ccb3ce247297c443b3dd32072ee5b91902abc0f6789654e14fd3b9ed8851580b93b4daf7da13324bc61e143a2d391d9e6d8b98f8d69923e4b4/asset_icons/3c5b36c70a05bad40eee4f711aeefbb1809169a17db047bf91f1ef45828349e5.png",
    change24h: -0.22,
    mktCap: "$27.0B",
    volume: "$340.6M",
    tradable: false,
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    await Crypto.deleteMany({});
    console.log("🗑️  Cleared existing crypto data");

    await Crypto.insertMany(seedData);
    console.log(`🌱 Seeded ${seedData.length} cryptocurrencies`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error:", error);
    process.exit(1);
  }
};

seed();
