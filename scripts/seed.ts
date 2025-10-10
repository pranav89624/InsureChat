import dotenv from "dotenv";
dotenv.config();

import connectDB from "../lib/mongodb";
import Claim from "../models/Claim";
import FAQ from "../models/FAQ";
import { generateEmbedding } from "../lib/gemini";
import { allFAQs, faqStats } from "../data/faqs";
import { sampleClaims } from "../data/claims/sample-claims";

async function seedDatabase() {
  try {
    console.log("Insurance Chatbot - Database Seeding");

    await connectDB();
    console.log("Connected to MongoDB\n");

    // Clear existing data
    console.log("Clearing existing data...");
    await Claim.deleteMany({});
    await FAQ.deleteMany({});
    console.log("Existing data cleared\n");

    // Seed Claims
    console.log("Seeding claims...");
    await Claim.insertMany(sampleClaims);
    console.log(`Inserted ${sampleClaims.length} sample claims\n`);

    // Display FAQ Statistics
    console.log("FAQ Knowledge Base Structure:");
    console.log("   ├─ Insurance Basics FAQs......", faqStats.insuranceBasics);
    console.log("   ├─ Claims FAQs................", faqStats.claims);
    console.log("   ├─ Health Insurance FAQs......", faqStats.healthInsurance);
    console.log("   ├─ Life Insurance FAQs........", faqStats.lifeInsurance);
    console.log("   ├─ Auto Insurance FAQs........", faqStats.autoInsurance);
    console.log("   ├─ Home Insurance FAQs........", faqStats.homeInsurance);
    console.log("   ├─ General Policy FAQs........", faqStats.generalPolicy);
    console.log("   └─ Payment & Support FAQs.....", faqStats.paymentSupport);
    console.log("-----------------------------------------");
    console.log(`       TOTAL FAQs: ${faqStats.total}\n`);

    // Generate embeddings
    console.log("Generating embeddings for FAQs...");
    console.log("(This may take a few minutes)\n");

    const faqsWithEmbeddings = [];
    const totalFAQs = allFAQs.length;

    for (let i = 0; i < totalFAQs; i++) {
      const faq = allFAQs[i];
      const percentage = ((i + 1) / totalFAQs * 100).toFixed(1);
      
      process.stdout.write(
        `   Processing FAQ ${i + 1}/${totalFAQs} (${percentage}%): ${faq.category.padEnd(12)} - "${faq.question.substring(0, 45)}..."\r`
      );

      try {
        const embedding = await generateEmbedding(faq.question);
        faqsWithEmbeddings.push({
          ...faq,
          embedding,
        });

        // Small delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (error) {
        console.error(`\nError generating embedding for FAQ ${i + 1}:`, error);
        throw error;
      }
    }

    console.log("\n");
    await FAQ.insertMany(faqsWithEmbeddings);
    console.log(`Inserted ${faqsWithEmbeddings.length} FAQs with embeddings\n`);

    // Summary
    console.log("Database Seeding Completed!");
    console.log("Summary:");
    console.log(`   - Sample Claims: ${sampleClaims.length}`);
    console.log(`   - Total FAQs: ${faqsWithEmbeddings.length}`);
    console.log(`   - Categories: 7`);
    console.log("\nYour database is ready to use!\n");

    process.exit(0);
  } catch (error) {
    console.error("\nError seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
