
import { Injectable } from '@angular/core';
import { GoogleGenAI } from '@google/genai';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private genAI: GoogleGenAI | null = null;
  private hasApiKey: boolean = false;

  constructor() {
    // For Vercel, use environment variable; locally use import.meta.env
    const apiKey = (import.meta as any).env?.['VITE_GEMINI_API_KEY'] || '';
    if (apiKey) {
      this.genAI = new GoogleGenAI({ apiKey });
      this.hasApiKey = true;
    }
  }

  async generateLoveNote(partnerName: string): Promise<string> {
    // If no API key, return a sweet pre-written message
    if (!this.hasApiKey || !this.genAI) {
      return "Esha, you're the sparkle in Uvaan's eyes ✨\nEvery moment with you feels like paradise 🌸\nFrom sunrise to moonlight, you're his delight 🌙\nForever together, our future's so bright! 💖";
    }

    try {
      const prompt = `Write a very short, witty, and incredibly cute romantic poem (maximum 4 lines) specifically for Esha from Uvaan Covenden. 
      Mention their names (Esha and Uvaan) in the poem.
      Make it funny, charming, and sweet. Use emojis.`;
      
      const response = await this.genAI.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt
      });
      
      return response.text || "Roses are red, violets are blue, Uvaan is lucky to have Esha like you! 💖";
    } catch (e) {
      console.error('AI Error', e);
      return "Esha + Uvaan = 💖 (AI is taking a nap, but the love is real!)";
    }
  }
}
