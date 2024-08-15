"use client";

import { useQuestionStore } from "../store/store";

export default function QuizNavigation() {
  const {
    currentQuestionIndex,
    nextQuestion,
    prevQuestion,
    submitQuiz,
    getFilteredQuestions,
  } = useQuestionStore();

  const questions = getFilteredQuestions();
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="flex justify-between mt-6">
      <button
        className={`px-4 py-2 bg-gray-300 text-gray-700 rounded ${
          currentQuestionIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={prevQuestion}
        disabled={currentQuestionIndex === 0}
      >
        Previous
      </button>
      {isLastQuestion ? (
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={submitQuiz}
        >
          Submit
        </button>
      ) : (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={nextQuestion}
        >
          Next
        </button>
      )}
    </div>
  );
}
