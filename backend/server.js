const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// DEBUGGING: Route එක හරියට එනවද බලමු
const itemRoutes = require('./routes/items');
console.log("itemRoutes value is:", itemRoutes);
console.log("Type of itemRoutes:", typeof itemRoutes);

// මෙතනදී තමයි error එක එන්නේ, itemRoutes undefined නම්
if (itemRoutes) {
    app.use('/api/items', itemRoutes);
} else {
    console.log("❌ Error: itemRoutes is undefined! Check your export in routes/items.js");
}

mongoose.connect(process.env.MONGO_URI)
 .then(() => {
    console.log('✅ MongoDB connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
    });
 })
 .catch(err => console.log("❌ Connection Error:", err));