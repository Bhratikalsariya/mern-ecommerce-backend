const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const productsRoutes = require("./routes/productsRoutes");
const categoryRoutes = require("./routes/categoryRoutes");


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/category", categoryRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});