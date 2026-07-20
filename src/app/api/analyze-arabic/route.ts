import { NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'

export async function POST(req: Request) {
  try {
    const { text } = await req.json()

    if (!text) {
      return NextResponse.json({ error: 'Text parameter is required' }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is not defined in the environment.' }, { status: 500 })
    }

    const client = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    })

    console.log('Sending request to Gemini for Arabic analysis of:', text)
    const response = await client.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: `You are an expert Classical Arabic Scholar and Grammarian.
Please analyze the following Arabic text: "${text}".
Identify:
1. Meaning (literal translation to English).
2. Word Classification (Ism, Fi'l, or Harf).
3. Grammar details:
   - If it's a verb (Fi'l): Identify tense (Madi/Past or Mudari/Present-Future), root letters, and pronoun subject.
   - If it's a noun (Ism): Identify case (Nominative, Accusative, or Genitive) based on ending vowels, and gender (Muzakkar/Muannas).
   - If it's a particle (Harf): Define its function (e.g. preposition / Harf Jarr).
Keep the explanation clear, friendly, extremely structured (Darul Uloom classical academy style), and easy to understand for beginners. Use JSON format strictly like this:
{
  "translation": "English translation",
  "classification": "Ism / Fi'l / Harf",
  "root": "Root letters if any",
  "gender": "Muzakkar / Muannas / Not Applicable",
  "caseEnding": "Nominative / Accusative / Genitive / Not Applicable",
  "explanation": "Detailed step-by-step beginner friendly explanation"
}`,
    })

    const responseText = response.text || ''
    // Find JSON block
    const jsonStart = responseText.indexOf('{')
    const jsonEnd = responseText.lastIndexOf('}')
    
    if (jsonStart !== -1 && jsonEnd !== -1) {
      const cleanedJson = responseText.substring(jsonStart, jsonEnd + 1)
      try {
        const parsed = JSON.parse(cleanedJson)
        return NextResponse.json(parsed)
      } catch (e) {
        // fallback
        return NextResponse.json({ explanation: responseText })
      }
    }

    return NextResponse.json({ explanation: responseText })
  } catch (error: any) {
    console.error('Gemini error:', error)
    return NextResponse.json({
      error: 'AI analysis failed',
      details: error.message || 'Make sure a valid GEMINI_API_KEY is supplied.'
    }, { status: 500 })
  }
}
