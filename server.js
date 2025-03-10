const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = 3000;

const client = new MongoClient(process.env.MONGODB, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ MongoDB Connected!");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
  }
}
connectDB();

const db = client.db("tigabelass");
const collection = db.collection("province");

app.use(express.json());

app.post("/provinsi", async (req, res) => {
  try {
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
    const provinsiList = await collection.find().toArray();
    res.json(provinsiList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/provinsi/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, kota } = req.body;
    const result = await collection.updateMany(
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
    const { id } = req.params;
    const result = await collection.deleteOne({
      _id: new ObjectId(id),
    });
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

app.listen(port, () => {
  console.log(`🚀 Server berjalan di http://localhost:${port}`);
});
