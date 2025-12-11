import mongoose, { Document, Model, Schema } from "mongoose";

export interface IClaim extends Document {
  claimId: string;
  customerName: string;
  policyNumber: string;
  status: "Pending" | "Approved" | "Rejected" | "Under Review";
  amount: number;
  date: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ClaimSchema = new Schema<IClaim>(
  {
    claimId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    policyNumber: {
      type: String,
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Under Review"],
      required: true,
      default: "Pending",
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Claim: Model<IClaim> =
  mongoose.models.Claim || mongoose.model<IClaim>("Claim", ClaimSchema);

export default Claim;
