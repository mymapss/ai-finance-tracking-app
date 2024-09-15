// drizzle.config.js
export default {
  dialect: "postgresql",
  schema: "./utils/schema.js", // Ensure this path and extension are correct
  out: "./drizzle",
  dbCredentials: {
    url: "postgresql://finan-smart_owner:uk3aed9QZotj@ep-wispy-breeze-a5iadk8t.us-east-2.aws.neon.tech/finan-smart?sslmode=require",
    connectionString: "postgresql://finan-smart_owner:uk3aed9QZotj@ep-wispy-breeze-a5iadk8t.us-east-2.aws.neon.tech/finan-smart?sslmode=require",
  },
};
