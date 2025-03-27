"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const { status } = useSession();
  if (status === "authenticated") router.push("/dashboard");

  const text = "Hello, Welcome to the AI Era."; // Full text to type
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < text.length) {
        setDisplayText((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100); // Typing speed (in ms)

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center text-2xl gap-y-10 bg-gradient-to-b from-gray-800 to-gray-700 h-screen">
      <div className="bg-gray-800 shadow-lg rounded-xl p-10 text-center max-w-md mx-auto">
        <h1 className="font-extrabold text-6xl drop-shadow-lg text-center text-white">
          {displayText.split(" ").map((word, i) => (
            <span key={i}>
              {word === "AI" ? (
                <span className="text-blue-400">{word}</span>
              ) : (
                word
              )}{" "}
            </span>
          ))}
        </h1>
        <p className="text-gray-300 text-lg mb-8">
          Discover the future with cutting-edge AI solutions. Sign up to start
          your journey.
        </p>
        <div className="flex gap-5 justify-center">
          <Link href="/sign-in">
            <Button
              variant="destructive"
              className="px-8 py-3 text-lg font-medium hover:bg-red-600 transition-colors duration-200"
            >
              Sign in
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button
              variant="destructive"
              className="px-8 py-3 text-lg font-medium hover:bg-red-600 transition-colors duration-200"
            >
              Try Out
            </Button>
          </Link>
        </div>
      </div>
      <footer className="text-gray-400 mt-12 text-sm">
        © 2024 AI Era. All rights reserved.
      </footer>
    </main>

    // <main className="flex flex-col items-center justify-center text-2xl gap-y-8 bg-gray-700 h-screen">
    //   <h1 className="font-bold text-5xl text-white">Hello, Welcome to AI Era.</h1>
    //   <div className="flex gap-5">
    //     <Link href={'/sign-up'}>
    //       <Button variant={"destructive"}>Sign up</Button>
    //     </Link>
    //     <Link href={'/sign-in'}>
    //       <Button variant={"destructive"}>Sign in</Button>
    //     </Link>
    //   </div>
    // </main>
  );
}
