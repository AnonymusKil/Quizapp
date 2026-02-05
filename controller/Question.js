import questions from "../model/questions.js";

// Add a single question
export async function addQuestion(req, res) {
  try {
    const { question, option, answer } = req.body;

    // Validation
    if (!question || !option || !answer) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!Array.isArray(option) || option.length !== 4) {
      return res.status(400).json({ message: "Option must be an array of 4 items" });
    }
    if (!option.includes(answer)) {
      return res.status(400).json({ message: "Answer must be one of the options" });
    }

    const newQuestion = new questions({ question, option, answer });
    await newQuestion.save();

    res.status(201).json({ message: "Question added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get quiz questions (without answers)
export async function getQuizQuestions(req, res) {
  try {
    const numberOfQuestions = 10; // send 10 random questions per quiz

    const workonquestions = await questions.aggregate([
      { $sample: { size: numberOfQuestions } }, // randomize
      { $project: { _id: 1, question: 1, option: 1 } } // hide answer
    ]);

    res.status(200).json({ questions: workonquestions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching questions" });
  }
}

// Submit answers and get score
export async function submitQuiz(req, res) {
  try {
    const { answers } = req.body; // expects [{ questionId, selectedAnswer }]

    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ message: "Send an array of answers" });
    }

    let score = 0;

    for (let ans of answers) {
      const question = await questions.findById(ans.questionId);
      if (question && question.answer === ans.selectedAnswer) {
        score += 1;
      }
    }

    res.status(200).json({ message: "Quiz submitted", score });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while submitting quiz" });
  }
}
