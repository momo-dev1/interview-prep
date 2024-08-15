import { useQuestionStore } from "../store/store";

export default function QuizQuestion() {
  const { getFilteredQuestions, currentQuestionIndex, userAnswers, setAnswer } =
    useQuestionStore();
  const questions = getFilteredQuestions();
  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) return null;

  return (
    <div className="text-black">
      <h2 className="text-2xl font-semibold mb-4">
        Question {currentQuestionIndex + 1}
      </h2>
      <p className="text-lg mb-4">{currentQuestion.question}</p>
      <div className="space-y-4">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            className={`w-full text-left p-4 rounded-lg shadow-md transition-all duration-200 ease-in-out
              ${
                userAnswers[currentQuestionIndex] === index
                  ? "bg-blue-500 text-white transform translate-y-1 shadow-inner"
                  : "bg-white hover:bg-gray-50 hover:transform hover:-translate-y-1 hover:shadow-lg"
              }
              border-2 ${
                userAnswers[currentQuestionIndex] === index
                  ? "border-blue-600"
                  : "border-gray-200"
              }
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50`}
            onClick={() => setAnswer(currentQuestionIndex, index)}
          >
            <span className="block font-medium">{option}</span>
          </button>
        ))}
      </div>
      <div className="mt-8 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg p-4 shadow-md">
        <h3 className="text-lg font-semibold mb-3 text-indigo-800">
          Question Details
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-md p-3 shadow-sm">
            <p className="text-sm font-medium text-gray-600">Difficulty</p>
            <p className="text-base font-semibold text-indigo-600">
              {currentQuestion.difficulty}
            </p>
          </div>
          <div className="bg-white rounded-md p-3 shadow-sm">
            <p className="text-sm font-medium text-gray-600">Topic</p>
            <p className="text-base font-semibold text-indigo-600">
              {currentQuestion.topic}
            </p>
          </div>
          <div className="bg-white rounded-md p-3 shadow-sm">
            <p className="text-sm font-medium text-gray-600">Estimated Time</p>
            <p className="text-base font-semibold text-indigo-600">
              {currentQuestion.estimatedTime}
            </p>
          </div>
          <div className="bg-white rounded-md p-3 shadow-sm">
            <p className="text-sm font-medium text-gray-600">Importance</p>
            <p className="text-base font-semibold text-indigo-600">
              {currentQuestion.importance}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
