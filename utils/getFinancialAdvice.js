// utils/financialadvice.js

const getFinancialAdvice = async (totalBudget, totalIncome, totalSpend) => {
  try {
    // Replace with the path to your API route
    const response = await fetch(`/api/financial-advice?totalBudget=${totalBudget}&totalIncome=${totalIncome}&totalSpend=${totalSpend}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Error fetching financial advice');
    }

    return data.advice;
  } catch (error) {
    console.error("Error fetching financial advice:", error);
    return "Sorry, I couldn't fetch the financial advice at this moment. Please try again later.";
  }
};

export default getFinancialAdvice;
