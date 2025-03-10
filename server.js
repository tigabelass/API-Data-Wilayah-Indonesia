const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const client = new MongoClient(process.env.MONGODB, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;
async function connectDB() {
  if (!db) {
    try {
      console.log("🔄 Mencoba koneksi ke MongoDB...");
      await client.connect();
      db = client.db("tigabelass");
      console.log("✅ MongoDB Connected!");
    } catch (error) {
      console.error("❌ MongoDB Connection Error:", error);
    }
  }
}

app.post("/provinsi", async (req, res) => {
  try {
    await connectDB();
    const collection = db.collection("province");
    const { nama, kota } = req.body;
    const result = await collection.insertOne({ nama, kota });
    res.json({
      message: "Provinsi berhasil ditambahkan",
      id: result.insertedId,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/provinsi", async (req, res) => {
  try {
    console.log("📥 Request masuk ke /provinsi");
    await connectDB();
    if (!db) {
      console.error("❌ Database tidak terhubung!");
      return res.status(500).json({ error: "Database tidak terhubung!" });
    }
    const collection = db.collection("province");
    console.log("🔎 Mengambil data dari MongoDB...");
    const provinsiList = await collection.find().limit(50).toArray();
    console.log("✅ Data berhasil diambil!");
    res.json(provinsiList);
  } catch (error) {
    console.error("❌ Error saat mengambil data:", error);
    res.status(500).json({ error: error.message });
  }
});

app.put("/provinsi/:id", async (req, res) => {
  try {
    await connectDB();
    const collection = db.collection("province");
    const { id } = req.params;
    const { nama, kota } = req.body;
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { nama, kota } }
    );
    if (result.modifiedCount === 0)
      return res.status(404).json({ error: "Provinsi tidak ditemukan" });
    res.json({ message: "Provinsi berhasil diperbarui" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/provinsi/:id", async (req, res) => {
  try {
    await connectDB();
    const collection = db.collection("province");
    const { id } = req.params;
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0)
      return res.status(404).json({ error: "Provinsi tidak ditemukan" });
    res.json({ message: "Provinsi berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("MongoDB API is Running!");
});

app.listen(port, async () => {
  await connectDB();
  console.log(`🚀 Server berjalan di http://localhost:${port}`);
});
