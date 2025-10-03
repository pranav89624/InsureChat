import mongoose, { Document, Model, Schema } from "mongoose";

export interface IFAQ extends Document {
  question: string;
  answer: string;
  embedding: number[];
  category?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const FAQSchema = new Schema<IFAQ>(
  {
    question: {
      type: String,
      required: true,
      index: true,
    },
    answer: {
      type: String,
      required: true,
    },
    embedding: {
      type: [Number],
      required: true,
    },
    category: {
      type: String,
      default: "general",
    },
  },
  {
    timestamps: true,
  }
);

const FAQ: Model<IFAQ> =
  mongoose.models.FAQ || mongoose.model<IFAQ>("FAQ", FAQSchema);

export default FAQ;
