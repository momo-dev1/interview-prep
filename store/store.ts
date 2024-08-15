import { create } from "zustand";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: string;
  topic: string;
  estimatedTime: string;
  importance: string;
  references: string[];
}

interface QuestionStore {
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: (number | null)[];
  isQuizComplete: boolean;
  filteredTopic: string | null;
  fetchQuestions: () => Promise<void>;
  setAnswer: (questionIndex: number, answerIndex: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  submitQuiz: () => void;
  restartQuiz: () => void;
  setFilteredTopic: (topic: string) => void;
  getFilteredQuestions: () => Question[];
  getCurrentTopicAnswers: () => {
    question: Question;
    userAnswer: number | null;
  }[];
}

export const useQuestionStore = create<QuestionStore>((set, get) => ({
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: [],
  isQuizComplete: false,
  filteredTopic: null,

  fetchQuestions: async () => {
    const response = await fetch("/questions.json");
    const data = await response.json();
    set({ questions: data, userAnswers: new Array(data.length).fill(null) });
  },

  setAnswer: (questionIndex, answerIndex) => {
    set((state) => {
      const newUserAnswers = [...state.userAnswers];
      newUserAnswers[questionIndex] = answerIndex;
      return { userAnswers: newUserAnswers };
    });
  },

  nextQuestion: () => {
    set((state) => {
      const filteredQuestions = state.getFilteredQuestions();
      const newIndex = Math.min(
        state.currentQuestionIndex + 1,
        filteredQuestions.length - 1
      );
      return { currentQuestionIndex: newIndex };
    });
  },

  prevQuestion: () => {
    set((state) => ({
      currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
    }));
  },

  submitQuiz: () => {
    set({ isQuizComplete: true });
  },

  restartQuiz: () => {
    set((state) => ({
      currentQuestionIndex: 0,
      userAnswers: new Array(state.questions.length).fill(null),
      isQuizComplete: false,
    }));
  },

  setFilteredTopic: (topic) => set({ filteredTopic: topic }),

  getFilteredQuestions: () => {
    const { questions, filteredTopic } = get();
    return filteredTopic
      ? questions.filter((q) => q.topic === filteredTopic)
      : questions;
  },

  getCurrentTopicAnswers: () => {
    const { getFilteredQuestions, userAnswers } = get();
    const filteredQuestions = getFilteredQuestions();
    return filteredQuestions.map((question, index) => ({
      question,
      userAnswer: userAnswers[index],
    }));
  },
}));
