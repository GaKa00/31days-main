// app/api/newChapter.ts
//@ts-nocheck

import { NextResponse } from "next/server";
import  OpenAI from "openai";''

const apiKey=process.env.OPENAI_KEY;

// Configure OpenAI API
const openai = new OpenAI({
  apiKey:apiKey,
});

// In-memory array to store chapters
let chapters = [];

export async function POST() {
  try {
  

    // Get the last chapter from the in-memory array
    const lastChapter =
      chapters.length > 0 ? chapters[chapters.length - 1] : null;
    const previousChapterText =
      lastChapter?.text || "This is the beginning of a chilling tale...";
    const nextChapterNumber = (lastChapter?.chapterNumber || 0) + 1;

    const prompt = `
    You are writing Chapter ${nextChapterNumber} of a 31-chapter horror story. The story is building towards a final climax, which will only occur in Chapter 31. This chapter should be around 2000 words, and it should continue from the previous chapter:

    Previous Chapter:
    "${previousChapterText}"

    In this chapter, develop the suspense further, adding new horror elements, and leave some loose ends for the next chapters. The story should be eerie, mysterious, and unsettling, as it leads up to the ultimate horror in the final chapter.
    `;

    // Request completion from OpenAI
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Confirm this is a valid model
      messages: [{ role: "user", content: prompt }],
      max_tokens: 50,
    });

    // Log the full response for debugging
    console.log("AI Response:", aiResponse);

    // Access the text content in the response
    if (
      !aiResponse.choices ||
      !aiResponse.choices[0] ||
      !aiResponse.choices[0].message
    ) {
      throw new Error(
        "The response from OpenAI API did not include choices with a message."
      );
    }



    // Accessing the text content in the response
    const newChapterText = aiResponse.choices[0]?.message?.content?.trim();
    if (!newChapterText) {
      throw new Error(
        "The response from OpenAI API did not include text content in choices."
      );
    }

    const newChapter = {
      chapterNumber: nextChapterNumber,
      text: newChapterText,
      createdAt: new Date(),
    };

    // Add the new chapter to the in-memory array
    chapters.push(newChapter);

    console.log("New Chapter Added to Array:", newChapter); // Log the chapter for debugging

  return NextResponse.json(chapters);
  } catch (error) {
    console.error("Error in creating a new chapter:", error);
    return NextResponse.error();
  }
}

