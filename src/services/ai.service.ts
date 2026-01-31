
import { Injectable } from '@angular/core';
import { GoogleGenAI } from '@google/genai';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private genAI: GoogleGenAI;

  constructor() {
    // For Vercel, use environment variable; locally use import.meta.env
    const apiKey = (import.meta as any).env?.['VITE_GEMINI_API_KEY'] || '';
    this.genAI = new GoogleGenAI({ apiKey });
  }

  async generateLoveNote(partnerName: string): Promise<string> {
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
