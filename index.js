import express from "express";
import bodyParser from 'body-parser';

import todoRoutes from './routes/todo.js';

//Initializes server with node express.

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

//Uses routes from /todo
app.use('/todo', todoRoutes);

app.get('/', (req, res) => {
    res.send('Home page');
}) ;

//If none of the above uses are able to handle request, sends it to error handling catch
app.use((req, res) => {
    const error = new Error('Not found');
    error.status(404);
    next(error);
})

//Error handling catch. Catches all errors.
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.send({
        error : {
            message: error.message
        }
    });
});

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));