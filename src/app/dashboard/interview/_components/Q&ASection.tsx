import { useState } from 'react';
import { ArrowLeft, ArrowRight, EyeIcon, EyeOffIcon, Forward } from 'lucide-react';

export default function QAPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [skippedQuestions, setSkippedQuestions] = useState<number[]>([]);
    const [showAnswer, setShowAnswer] = useState(false);

    const questions = [
        "What is React?",
        "Explain the virtual DOM.",
        "What are hooks in React?",
        // Add more questions as needed
    ];

    const answers = [
        "React is a JavaScript library for building user interfaces.",
        "The virtual DOM is a lightweight copy of the real DOM.",
        "Hooks are functions that let you use state and other React features without writing a class.",
        // Add more answers as needed
    ];

    const jumpToQuestion = (index: number) => {
        setCurrentQuestion(index);
        setShowAnswer(false);
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
            setShowAnswer(false);
        }
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setShowAnswer(false);
        }
    };

    const handleSkip = () => {
        setSkippedQuestions([...skippedQuestions, currentQuestion]);
        handleNext();
    };

    const toggleShowAnswer = () => {
        setShowAnswer(!showAnswer);
    };

    return (
        <div className="flex flex-col items-start space-y-6 p-6">
            {/* Question Navigation */}
            <div className="flex flex-wrap gap-2">
                {questions.map((_, index: number) => (
                    <button
                        key={index}
                        onClick={() => jumpToQuestion(index)}
                        className={`px-4 py-2 rounded-lg border ${currentQuestion === index
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                            }`}
                    >
                        Q{index + 1}
                    </button>
                ))}
            </div>

            {/* Display Current Question */}
            <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">
                    Question {currentQuestion + 1}
                </h2>
                <p className="text-gray-700">{questions[currentQuestion]}</p>

                {/* Show/Hide Answer */}
                {showAnswer && (
                    <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                        <p className="text-gray-700">Answer: {answers[currentQuestion]}</p>
                    </div>
                )}
                <div className="flex items-center mt-4">
                    <button onClick={toggleShowAnswer} className="flex items-center space-x-2 text-blue-500 hover:text-blue-700">
                        {showAnswer ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                        <span>{showAnswer ? "Hide Answer" : "Show Answer"}</span>
                    </button>
                </div>

            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-around w-full">
                <button onClick={handlePrevious} disabled={currentQuestion === 0} className="flex items-center justify-center w-32 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Previous
                </button>
                <button onClick={handleSkip} className="flex items-center justify-center w-32 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg">
                    <Forward className="w-5 h-5 mr-2" />
                    Skip
                </button>
                <button onClick={handleNext} disabled={currentQuestion === questions.length - 1} className="flex items-center justify-center w-32 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
                    <ArrowRight className="w-5 h-5 mr-2" />
                    Next
                </button>
            </div>
        </div>
    )
}