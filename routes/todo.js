import express from "express";
//Imports for all the controllers
import { getTodo, deleteTodo, updateTodo, getTodos, newLog } from "../controllers/users.js";
const router = express.Router();

//Uses controllers to implement general functions for the api.

router.get('/', getTodos);

router.post('/', newLog);

router.get('/:id', getTodo);

router.delete('/:id', deleteTodo);

router.patch('/:id', updateTodo);

export default router;