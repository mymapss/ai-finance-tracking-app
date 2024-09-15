"use client";
import React, { useEffect, useState } from "react";
import CreateIncomes from "./CreateIncomes";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Incomes, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import IncomeItem from "./IncomeItem";

function IncomeList() {
  const [incomelist, setIncomelist] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getIncomelist();
    }
  }, [user]);

  const getIncomelist = async () => {
    try {
      // Construct the query
      const query = db
        .select({
          ...getTableColumns(Incomes),
          totalSpend: sql`SUM(${Expenses.amount})`.mapWith(Number),
          totalItem: sql`COUNT(${Expenses.id})`.mapWith(Number),
        })
        .from(Incomes)
        .leftJoin(Expenses, eq(Incomes.id, Expenses.budgetId))
        .where(eq(Incomes.createdBy, user.primaryEmailAddress.emailAddress))
        .groupBy(Incomes.id)
        .orderBy(desc(Incomes.id));
  
      // Log the query object
      console.log("Constructed Query:", query); // Remove or adjust this line as needed
  
      // Execute the query
      const result = await query;
  
      // Log the result to inspect
      console.log("Query Result:", result);
  
      // Update state with the result
      setIncomelist(result);
    } catch (error) {
      console.error("Error fetching income list:", error);
    }
  };

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CreateIncomes refreshData={() => getIncomelist()} />
        {incomelist.length > 0
          ? incomelist.map((income, index) => (
              <IncomeItem income={income} key={index} />
            ))
          : [1, 2, 3, 4, 5].map((item, index) => (
              <div
                key={index}
                className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default IncomeList;
