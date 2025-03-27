import landingAi from "@/public/ai_landing.jpg";
import landingAi2 from "@/public/ai3.png";

import { StaticImageData } from "next/image";

export interface ToolsProps {
  title: string;
  description: string;
  path: string;
  image: StaticImageData;
  buttonContent?: string;
}

export const tools: ToolsProps[] = [
  {
    title: "Generate AI Content",
    description:
      "Create Content based on Your ideas, ask question, generate content for your purpose.",
    path: "content",
    image: landingAi2,
    buttonContent: "Generate Content",
  },
  {
    title: "Prepare for InterView",
    description:
      "Practice and prepare for interview, it generate mock interview based on role and description you are applying for.",
    path: "interview",
    image: landingAi,
    buttonContent: "Prepare for Interview",
  },
  {
    title: "Start web scraping",
    description:"scrape web url to generate meaningful insights. Chat with the scraped data to get real-time information and answers.",
    path: "scrap-data",
    image: landingAi2,
    buttonContent: "Scrape Data",
  },
];
