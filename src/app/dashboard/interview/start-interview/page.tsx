'use client'

import { useState, useEffect } from 'react';
import QAPage from "../_components/Q&ASection";
import UserMediaControl from "../_components/UserMediaControl";
import { Button } from '@/components/ui/button';
import Result from '../_components/Result';

export default function InterviewPage() {

    const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
    const [isRunning, setIsRunning] = useState(false);
    const [showResult, setShowResult] = useState(false);


    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsRunning(false);
        } else if (!isRunning && timeLeft > 0) {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <main className='flex flex-col items-center justify-center space-y-6 w-full'>
            {
                showResult ?
                    <Result />
                    :
                    <>
                        <div className="flex items-center gap-x-4 pt-12">
                            {
                                isRunning ?
                                    <Button
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-32"
                                        onClick={() => {
                                            setIsRunning(prev => !prev);
                                            setShowResult(true);
                                        }}
                                    >
                                        Submit
                                    </Button>
                                    :
                                    <Button
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-32"
                                        onClick={() => {
                                            setIsRunning(prev => !prev);
                                        }}
                                    >
                                        Start
                                    </Button>
                            }
                            <div className="">
                                Interview ends in: <span className='text-xl font-bold text-red-500'>{formatTime(timeLeft)}</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-5 w-full">
                            <QAPage />
                            <UserMediaControl />
                        </div>
                    </>
            }

        </main>

    );
}

