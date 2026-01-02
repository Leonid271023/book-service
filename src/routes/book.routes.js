import express from "express";
import {addBook, findBookById} from "../controller/book.controller.js";

const router = express.Router();

router.post('/book', addBook);
router.get('/book/:isbn', findBookById);

export default router;
