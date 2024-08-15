"use client";

import { useEffect } from "react";
import { useQuestionStore } from "../store/store";
import { useRouter } from "next/navigation";

interface TopicCounts {
  [key: string]: number;
}

export default function Home() {
  const { fetchQuestions, questions, setFilteredTopic } = useQuestionStore();
  const router = useRouter();

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  // Get unique topics and count questions for each
  const topicCounts: TopicCounts = questions.reduce(
    (acc: TopicCounts, question) => {
      acc[question.topic] = (acc[question.topic] || 0) + 1;
      return acc;
    },
    {}
  );

  const handleTopicSelect = (topic: string) => {
    setFilteredTopic(topic);
    router.push("/quiz");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Select a Topic
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white p-10 border rounded-lg">
          {Object.entries(topicCounts).map(([topic, count]) => (
            <div
              key={topic}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105 border"
              onClick={() => handleTopicSelect(topic)}
            >
              <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4">
                <h2 className="text-xl font-semibold text-white">{topic}</h2>
              </div>
              <div className="p-4">
                <p className="text-gray-600 flex items-center">
                  <span className="font-bold text-2xl text-indigo-600">
                    {count}
                  </span>
                  <span className="ml-2">question{count !== 1 ? "s" : ""}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
