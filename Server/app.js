require('../Server/Config/loadenv'); // Load env first
const connectMongo = require('./Config/mongo');
const express = require('express');
const cors = require('cors');
const postgresPool = require('./Config/postgre');
const userDataCollector = require('./Middlewares/User data Collector/userDataCollector');

const app = express();
app.use(cors());
app.use(express.json());

connectMongo();

app.get('/', (req, res) => {
    res.send(`Server running in ${process.env.NODE_ENV} mode`);
});

postgresPool.query('SELECT NOW()', (err, res) => {
    if (err) console.error('PostgreSQL error:', err);
    else console.log('PostgreSQL time:', res.rows[0]);
});

// (async () => {
//     await userDataCollector();
// })();


app.get('/', (req, res) => {
    res.send('API running with MongoDB & PostgreSQL 🚀');
});

// app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
