/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client'
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { SendIcon } from "lucide-react";

export default function WebScraping() {
    const [searchPrompt, setSearchPrompt] = useState<string>('');
    const [userQuestion, setUserQuestion] = useState<string>('');

    const [scrapedData, setScrapedData] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [urls, setUrls] = useState<string[]>([]);
    const [lines, setLines] = useState(['Welcome to scraping world, https://www.bbc.com/news']);
    // const inputRef = useRef(null);

    // useEffect(() => {
    //     inputRef.current && inputRef?.current?.focus();
    // }, []);

    async function answerQuestions(question: string, event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (question.trim()) {
            setLines([...lines, 'user: ' + question]);
            setScrapedData([...scrapedData, 'agent: ' + question]);
            setUserQuestion('');
        }
    }

    async function scrapeData(url: string, event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (url.trim()) {
            setUrls([...urls, url]);
            setSearchPrompt('');
        }
        setLoading(true);
        try {
            if (!url) return alert('Please enter url');
            const res = await axios.get(`/api/scrapeData?url=${encodeURIComponent(url)}`);
            console.log(res);
            if (!res) return alert('no data found');
            if (res.status === 200 && res.data) {
                setScrapedData(res.data);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }
    // https://www.bbc.com/news
    return (
        <main className="flex border-r-2 p-4 w-full ">
            {/* History and Add New URL Section */}
            <div className="flex flex-col bg-gray-950 text-white p-4 rounded-l-lg shadow-lg h-[700px]  w-[500px]">
                <h2 className="text-2xl font-bold mb-4">Scrape URL</h2>
                <form onSubmit={(event) => {
                    event.preventDefault();
                    scrapeData(searchPrompt, event);
                }} className="flex flex-col gap-4 mb-4">
                    <Input
                        type="text"
                        value={searchPrompt}
                        onChange={(e) => setSearchPrompt(e.target.value)}
                        placeholder="Enter URL..."
                        className="border border-gray-300 bg-gray-800 text-white rounded-lg p-2"
                    />
                    <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center">
                        {loading ? "Processing..." : 'Scrape'}
                    </Button>
                </form>
                <div className="flex flex-col gap-2 overflow-y-auto">
                    <h3 className="text-xl font-semibold mb-2">History</h3>
                    {urls.map((url, idx) => (
                        <div key={idx} className="bg-gray-700 p-2 rounded-lg">
                            {url}
                        </div>
                    ))}
                </div>
                {/* <div className="flex flex-col gap-2 overflow-y-auto">
                    <h3 className="text-xl font-semibold mb-2">History</h3>
                    {scrapedData.map((data, idx) => (
                        <div key={idx} className="bg-gray-700 p-2 rounded-lg">
                            {data}
                        </div>
                    ))}
                </div> */}
            </div>
            {/* Terminal Section */}
            <div className="flex flex-col bg-black text-green-400 p-4 rounded-r-lg shadow-lg w-full">
                <div className="flex flex-col gap-2 overflow-y-auto flex-grow">
                    {/* {lines.map((line, idx) => ( */}
                        <div >{lines[lines.length -1]}</div>
                    {/* // ))} */}
                      {/* {scrapedData.map((data, idx) => (
                        <div key={idx} className="bg-gray-700 p-2 rounded-lg"> */}
                            {scrapedData[scrapedData.length -1]}
                        {/* </div> */}
                    {/* ))} */}
                </div>
                <form onSubmit={(event) => answerQuestions(userQuestion, event)} className="flex bg-gray-800 rounded-xl p-4 items-center gap-2 mt-auto">
                    <span className="mr-1 text-green-400">&gt;</span>
                    <Input
                        type="text"
                        value={userQuestion}
                        onChange={(e) => setUserQuestion(e.target.value)}
                        placeholder="Enter URL..."
                        className="border-none outline-none bg-inherit focus-visible:ring-0 text-green-400 flex-grow"
                    />
                    <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center">
                        <SendIcon className="w-5 h-5" />
                    </Button>
                </form>
            </div>
        </main>
    )
}