import {
  integer,
  numeric,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const Budgets = pgTable("budgets", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  amount: varchar("amount").notNull(), // Ensure this matches your database schema
  icon: varchar("icon"),
  createdBy: varchar("createdby").notNull(), // Ensure this matches your database schema
});

export const Incomes = pgTable("incomes", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  amount: varchar("amount").notNull(), // Ensure this matches your database schema
  icon: varchar("icon"),
  createdBy: varchar("createdby").notNull(), // Ensure this matches your database schema
});

export const Expenses = pgTable("expenses", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  amount: numeric("amount").notNull().default(0), // Ensure this matches your database schema
  budgetId: integer("budgetid").references(() => Budgets.id), // Ensure this matches your database schema
  createdAt: varchar("createdat").notNull(), // Ensure this matches your database schema
});
