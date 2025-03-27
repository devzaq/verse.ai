import { Card, CardContent, CardHeader } from '@/components/ui/card';
import React from 'react';

type Question = {
    question: string;
    userAnswer: string;
    suggestedAnswer: string;
};

const questions: Question[] = [
    {
        question: "What is React?",
        userAnswer: "React is a JavaScript library for building user interfaces.",
        suggestedAnswer: "React is an open-source, front-end, JavaScript library for building user interfaces or UI components.",
    },
    {
        question: "Explain the virtual DOM.",
        userAnswer: "The virtual DOM is a concept where a virtual representation of the real DOM is kept in memory.",
        suggestedAnswer: "The virtual DOM is a programming concept where a virtual representation of the UI is kept in memory and synced with the real DOM by a library such as ReactDOM.",
    },
    // Add more questions as needed
];

const overallRating = 8; // Overall rating out of 10
const keyPoints = [
    "Improve explanation of the virtual DOM.",
    "Mention React's component-based architecture.",
    "Highlight performance benefits of using React.",
];

export default function Result() {
    return (
        <main className='w-full pt-12'>
            <h1 className="text-3xl font-bold px-6">Interview Results</h1>
            <section className="p-6 mx-auto">
                <div className=" p-4 border rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold mb-2">User Name: Chandan Chaudhary</h2>
                    <p className="mb-2"><strong>Selected Topic:</strong> React Development</p>
                    <p className="mb-2"><strong>Job Role Experience:</strong> 3 years as a Frontend Developer</p>
                </div>
            </section>
            <section className="flex flex-col w-full gap-y-5 p-6 mx-auto">
                <Card className=" p-4 border rounded-lg shadow-sm bg-gray-100">
                    <CardContent>
                        {questions.map((q, index) => (
                            <div key={index} className="mb-4">
                                <h3 className="text-xl font-semibold mb-2">Question {index + 1}: {q.question}</h3>
                                <p className="mb-2"><strong>Your Answer:</strong> {q.userAnswer}</p>
                                <p className="mb-2 text-yellow-700"><strong>Suggested Answer:</strong> {q.suggestedAnswer}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <Card className=" p-4 border rounded-lg shadow-sm bg-gray-100 ">
                    <CardHeader className='flex'>
                        <h2 className="text-2xl font-semibold py-0">Overall Rating</h2>
                        <p className="text-xl font-bold text-green-500">{overallRating}/10</p>
                    </CardHeader>
                    <CardContent>
                        <h2 className="text-2xl font-semibold">Key Points to Focus On</h2>
                        <ul className="list-disc list-inside">
                            {keyPoints.map((point, idx) => (
                                <li key={idx} className="mb-2">{point}</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </section>
        </main>
    );
}