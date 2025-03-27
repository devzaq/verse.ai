import { NextRequest, NextResponse } from "next/server";
// import axios from "axios";
// import * as cheerio from "cheerio";
import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";

import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// import puppeteer from "puppeteer";
// import OpenAI from "openai";

// const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

export async function POST(request: NextRequest) {
  const { urls } = await request.json();
  if (!urls || !Array.isArray(urls)) {
    return NextResponse.json("No url found, please provide", { status: 404 });
  }
  try {
    for (const url of urls) {
      const content = await scrapeData(url);
      console.log(content, url, 'in post');

      const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 512,
        chunkOverlap: 100,
      });
      const chunks = await splitter.splitText(content);
      // console.log(chunks, 'chunks');
      
      for (const chunk of chunks) {
        // const embeddings = await openai.embeddings.create({
        //   model: "text-embedding-3-small",
        //   input: chunk,
        //   encoding_format: "float",
        // });
        // const data = embeddings.data[0].embedding;
        console.log('in chunks', chunk);
      }
    }
    return NextResponse.json("Data scraped successfully", { status: 200 });
  } catch (err) {
    return NextResponse.json("Cannot scrape data" + err, { status: 400 });
  }
}

async function scrapeData(url: string) {
  const browser = new PuppeteerWebBaseLoader(url, {
    launchOptions: { headless: true },
    gotoOptions: { waitUntil: "domcontentloaded" },
    evaluate: async (page, browser) => {
      const data = await page.evaluate(() => document.body.innerHTML);
      await browser.close();
      return data;
    },
  });
  return (await browser.scrape())?.replace(/<[^>]*>?/gm, "");
}

// {
//   const items = Array.from(
//     document.querySelectorAll(".gs-c-promo-heading__title")
//   );
//   return items.map((item) => item.textContent);
// }
// export async function GET(request: NextRequest) {
//   const { searchParams } = new URL(request.url);
//   const url = searchParams.get("url");
//   if (!url)
//     return NextResponse.json("No url found, please provide", { status: 404 });
//   // check if url is array or is there single url
//   //   const singleUrl: string = Array.isArray(url) ? url[0] : url;
//   console.log(url);

//   //   try {
//   //     const browser = await puppeteer.launch({
//   //         args: ['--no-sandbox', '--disable-setuid-sandbox'],
//   //     });
//   //     const page = await browser.newPage();
//   //     page.setDefaultNavigationTimeout(60000);
//   //     //navigate to target url
//   //     await page.goto(url);
//   //     const data = page.evaluate(() => {
//   //       const items = Array.from(
//   //         document.querySelectorAll(".gs-c-promo-heading__title")
//   //       );
//   //       return items.map((item) => item.textContent);
//   //     });

//   //     await browser.close();
//   try {
//     // Fetch the HTML content
//     const { data } = await axios.get(url);

//     // Load HTML into Cheerio
//     const $ = cheerio.load(data);

//     // Example: Scrape the main headlines (adjust the selector based on the website structure)
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const headlines: any = [];
//     $("a").each((index, element) => {
//       const headline = $(element).text();
//       headlines.push(headline);
//     });

//     return NextResponse.json(headlines, { status: 200 });
//   } catch (err) {
//     return NextResponse.json("Cannot scrape data" + err, { status: 400 });
//   }
// }
