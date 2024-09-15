// app/api/financial-advice/route.js

import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const totalBudget = searchParams.get('totalBudget');
  const totalIncome = searchParams.get('totalIncome');
  const totalSpend = searchParams.get('totalSpend');

  try {
    const userPrompt = `
      Based on the following financial data:
      - Total Budget: ${totalBudget} USD
      - Expenses: ${totalSpend} USD
      - Incomes: ${totalIncome} USD
      Provide detailed financial advice in 2 sentences to help the user manage their finances more effectively.
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      model: 'llama3-8b-8192',
    });

    const advice = chatCompletion.choices[0]?.message?.content || "No advice available";
    return new Response(JSON.stringify({ advice }), { status: 200 });
  } catch (error) {
    console.error("Error fetching financial advice:", error);
    return new Response(JSON.stringify({ error: "Error fetching financial advice" }), { status: 500 });
  }
}
