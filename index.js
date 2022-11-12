import express from "express";
import bodyParser from 'body-parser';

import todoRoutes from './routes/todo.js';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/todo', todoRoutes);

app.get('/', (req, res) => {
    res.send('Home page');
}) ;

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));