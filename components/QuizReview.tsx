"use client";

import { useState } from "react";
import { useQuestionStore } from "../store/store";

export default function QuizReview() {
  const { getCurrentTopicAnswers, filteredTopic, restartQuiz } =
    useQuestionStore();
  const topicAnswers = getCurrentTopicAnswers();
  const [currentIndex, setCurrentIndex] = useState(0);

  const incorrectAnswers = topicAnswers.filter(
    (item) => item.userAnswer !== item.question.correctAnswer
  );

  const currentQuestion = incorrectAnswers[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(incorrectAnswers.length - 1, prev + 1));
  };

  return (
    <div className="space-y-6 text-black">
      <h2 className="text-2xl font-bold text-center mb-4">
        Quiz Review: {filteredTopic}
      </h2>

      <div className="flex items-center justify-between w-full">
        <h3 className="text-xl font-semibold mt-6 mb-4">Incorrect Answers:</h3>
        <p className="text-lg font-semibold">
          {topicAnswers.length - incorrectAnswers.length} /{" "}
          {topicAnswers.length}
        </p>
      </div>

      {incorrectAnswers.length === 0 ? (
        <p className="text-green-600 font-semibold">
          Congratulations! You got all questions correct!
        </p>
      ) : (
        <>
          <div className="bg-red-100 p-4 rounded-lg mb-4">
            <p className="font-semibold">{currentQuestion.question.question}</p>
            <p className="text-red-600">
              Your answer:{" "}
              {currentQuestion.userAnswer !== null
                ? currentQuestion.question.options[currentQuestion.userAnswer]
                : "Not answered"}
            </p>
            <p className="text-green-600">
              Correct answer:{" "}
              {
                currentQuestion.question.options[
                  currentQuestion.question.correctAnswer
                ]
              }
            </p>
            <p className="mt-2">{currentQuestion.question.explanation}</p>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`bg-purple-600 text-white px-4 py-2 rounded ${
                currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === incorrectAnswers.length - 1}
              className={`bg-purple-600 text-white px-4 py-2 rounded ${
                currentIndex === incorrectAnswers.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Next
            </button>
          </div>
          <p className="text-center mt-2">
            Question {currentIndex + 1} of {incorrectAnswers.length}
          </p>
        </>
      )}
      <button
        onClick={restartQuiz}
        className="bg-purple-600 text-white px-4 py-2 rounded w-full mt-4"
      >
        Restart Quiz
      </button>
    </div>
  );
}
