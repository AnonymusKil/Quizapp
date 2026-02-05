import express from 'express';
const router = express.Router();
import { addQuestion, getQuizQuestions, submitQuiz } from "../controller/Question.js";
router.post('/addquestion', addQuestion);
router.get("/get", getQuizQuestions);

export default router;
