const express = require('express');
const dotenv = require("dotenv");
const connectDB = require('./config/db.js');
const { notFound, errorHandler } = require('./middlewares/middlewares');
const boardRoute = require('./routes/BoardRoute');
const userRoute = require('./routes/UserRoute');
const listEditingRoute = require('./routes/ListEditingRoute');
const taskRoute = require('./routes/TaskRoute');
const resetDatabase = require('./controllers/ResetController.js');

const app = express();
dotenv.config();
connectDB();

const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use('/api/board', boardRoute);
app.use('/api/auth', userRoute);
app.use('/api/list-editing', listEditingRoute);
app.use('/api/task', taskRoute);
app.delete('/api/reset', resetDatabase);

app.use(errorHandler);
app.use(notFound);

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
})