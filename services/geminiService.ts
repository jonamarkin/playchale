"use server";

import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, ActivityRecord } from "../types";

// Fix: Initializing GoogleGenAI with named parameter as required
// This will now run strictly on the server
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeProfile(profile: UserProfile, activities: ActivityRecord[]) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze this athlete's profile and activities to provide a 2-sentence scouting report and performance insights. 
      Profile: ${JSON.stringify(profile)}
      Recent Activities: ${JSON.stringify(activities)}`,
      config: {
        systemInstruction: "You are an elite sports performance analyst. Provide encouraging but honest scouting reports.",
      },
    });
    // Fix: Using the .text property directly (not a method)
    return response.text;
  } catch (error) {
    console.error("Gemini analysis failed:", error);
    return "Unable to generate insights at this time. Keep playing!";
  }
}

export async function suggestTraining(sport: string, stats: any) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `The athlete has these stats in ${sport}: ${JSON.stringify(stats)}. Suggest 3 specific drills to improve their lowest attributes.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              drillName: { type: Type.STRING },
              focus: { type: Type.STRING },
              duration: { type: Type.STRING }
            },
            required: ["drillName", "focus", "duration"]
          }
        }
      }
    });
    // Fix: Direct access to text property and trimming before parsing
    const jsonStr = response.text?.trim() || '[]';
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Drill suggestion failed:", error);
    return [];
  }
}
