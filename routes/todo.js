import express from "express";
import { getTodo, deleteTodo, updateTodo, getTodos, newLog } from "../controllers/users.js";
const router = express.Router();

//

router.get('/', getTodos);

router.post('/', newLog);

router.get('/:id', getTodo);

router.delete('/:id', deleteTodo);

router.patch('/:id', updateTodo);

export default router;