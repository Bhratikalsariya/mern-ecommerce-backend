const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    images: [String],
    stock: {
        type: Number,
        required: true
    },
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}
);

productSchema.virtual("imageUrls").get(function () {
    const baseUrl = process.env.BASE_URL || "http://localhost:5000";
    return this.images.map(img => `${baseUrl}/uploads/${img}`);
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;