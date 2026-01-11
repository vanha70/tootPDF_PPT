
import React, { useState } from 'react';
import { generateQuiz } from '../services/geminiService';

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const ChemistryQuiz: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const startQuiz = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const data = await generateQuiz(topic);
      setQuestions(data);
      setCurrentIdx(0);
      setScore(0);
      setShowResult(false);
      setSelectedAnswer(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (idx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    if (idx === questions[currentIdx].correctIndex) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="max-w-xl mx-auto p-8 bg-white rounded-2xl shadow-xl text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
        <div className="text-6xl font-black text-indigo-600 mb-6">
          {score} / {questions.length}
        </div>
        <p className="text-gray-600 mb-8">
          {score === questions.length ? "Incredible! A true chemist." : "Great effort! Keep practicing."}
        </p>
        <button
          onClick={() => setQuestions([])}
          className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all"
        >
          New Quiz
        </button>
      </div>
    );
  }

  if (questions.length > 0) {
    const q = questions[currentIdx];
    return (
      <div className="max-w-xl mx-auto p-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="h-2 bg-gray-200">
            <div 
              className="h-full bg-indigo-600 transition-all duration-500"
              style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <div className="p-8">
            <span className="text-sm text-indigo-500 font-bold">Question {currentIdx + 1} of {questions.length}</span>
            <h3 className="text-xl font-bold text-gray-800 mt-2 mb-8">{q.question}</h3>
            
            <div className="space-y-4">
              {q.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    selectedAnswer === i
                      ? i === q.correctIndex
                        ? 'bg-green-50 border-green-500 ring-2 ring-green-500'
                        : 'bg-red-50 border-red-500 ring-2 ring-red-500'
                      : selectedAnswer !== null && i === q.correctIndex
                        ? 'bg-green-50 border-green-500'
                        : 'hover:border-indigo-300 hover:bg-indigo-50'
                  }`}
                >
                  <span className="font-bold mr-3">{String.fromCharCode(65 + i)}.</span>
                  {option}
                </button>
              ))}
            </div>

            {selectedAnswer !== null && (
              <div className="mt-8 p-4 bg-gray-50 rounded-xl animate-in slide-in-from-bottom-2">
                <p className="text-sm font-medium text-indigo-800 mb-2">Explanation:</p>
                <p className="text-gray-600 text-sm leading-relaxed">{q.explanation}</p>
                <button
                  onClick={nextQuestion}
                  className="mt-4 w-full bg-indigo-600 text-white font-bold py-2 rounded-lg"
                >
                  {currentIdx + 1 === questions.length ? 'Finish' : 'Next Question'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-2xl shadow-xl text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Topic-based Quiz</h2>
      <p className="text-gray-500 mb-8">What do you want to be tested on? (e.g., Alkanes, Periodic Trends, Acids & Bases)</p>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter chemistry topic..."
          className="w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={startQuiz}
          disabled={loading || !topic.trim()}
          className="bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
        >
          {loading ? 'Analyzing Content...' : 'Start AI Quiz'}
        </button>
      </div>
    </div>
  );
};
