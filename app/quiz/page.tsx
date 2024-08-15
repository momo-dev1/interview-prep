"use client";

import { useQuestionStore } from "../../store/store";
import QuizQuestion from "../../components/QuizQuestion";
import QuizNavigation from "../../components/QuizNavigation";
import QuizReview from "../../components/QuizReview";
import { useRouter } from "next/navigation";

export default function QuizPage() {
  const router = useRouter();
  const { isQuizComplete, filteredTopic, getFilteredQuestions, restartQuiz } =
    useQuestionStore();
  const questions = getFilteredQuestions();

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  const handleClick = () => {
    router.back();
    restartQuiz();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          {filteredTopic} Quiz
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
          <button
            type="button"
            className="group"
            onClick={handleClick}
            aria-label="Go back"
          >
            <div className="py-1 px-3 bg-violet-500 from-violet-600 to-violet-500 border-violet-700 text-white flex items-center gap-2 rounded-md mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="size-6"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                />
              </svg>
              <span>Back</span>
            </div>
          </button>
          {isQuizComplete ? (
            <QuizReview />
          ) : (
            <>
              <QuizQuestion />
              <QuizNavigation />
            </>
          )}
        </div>
      </div>
    </main>
  );
}
