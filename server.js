require('dotenv')?.config();
const express = require('express');
const authRoutes = require('./routes/auth-routes');
const homeRoutes = require('./routes/home-routes');
const adminRoutes = require('./routes/admin-routes');

const connextToDB = require('./database/db');
connextToDB();

const app = express();
const PORT = process.env?.PORT;

//Middlewares
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/admin', adminRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})