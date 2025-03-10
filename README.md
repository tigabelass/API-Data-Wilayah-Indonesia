# API Wilayah Indonesia

API ini menyediakan data provinsi dan kota di Indonesia dengan menggunakan MongoDB dan Express.js.

## 🚀 Fitur API
- **Menambahkan provinsi** (`POST /provinsi`)
- **Mendapatkan semua provinsi** (`GET /provinsi`)
- **Memperbarui provinsi** (`PUT /provinsi/:id`)
- **Menghapus provinsi** (`DELETE /provinsi/:id`)

## 🛠️ Instalasi & Konfigurasi
### 1. Clone Repository
```sh
git clone https://github.com/tigabelass/API-Data-Wilayah-Indonesia.git
cd api-wilayah
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Konfigurasi Environment
Buat file `.env` dan tambahkan:
```
MONGODB=mongodb+srv://<username>:<password>@cluster.mongodb.net/tigabelass?retryWrites=true&w=majority
```

### 4. Menjalankan Server
```sh
node index.js
```

## 🌍 Deployment di Render
### 1. Buat Akun dan Login
- Kunjungi [Render](https://render.com/)
- Login atau daftar akun baru

### 2. Deploy API
- Klik **New Web Service**
- Pilih repository dari GitHub
- Atur **Environment**:
  - **Runtime:** Node.js
  - **Build Command:** `npm install`
  - **Start Command:** `npm run dev`
- Tambahkan **Environment Variable** `MONGODB`
- Klik **Deploy**

### 3. Dapatkan URL API
Setelah deploy berhasil, Render akan memberikan **Base URL** untuk API kamu.

## 📌 Contoh Penggunaan API
### 1. Menambahkan Provinsi
**Request:**
```sh
POST /provinsi
Content-Type: application/json
{
  "nama": "Jawa Barat",
  "kota": ["Kota Bandung", "Kota Bogor"]
}
```
**Response:**
```json
{
  "message": "Provinsi berhasil ditambahkan",
  "id": "60d5ec49f6d7c4b5a85f4b34"
}
```

### 2. Mendapatkan Semua Provinsi
**Request:**
```sh
GET /provinsi
```
**Response:**
```json
[
  {
    "_id": "60d5ec49f6d7c4b5a85f4b34",
    "nama": "Jawa Barat",
    "kota": ["Kota Bandung", "Kota Bogor"]
  }
]
```

## 📜 Lisensi
MIT License

