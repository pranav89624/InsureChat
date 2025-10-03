import dotenv from "dotenv";

dotenv.config();

import connectDB from "../lib/mongodb";
import Claim from "../models/Claim";
import FAQ from "../models/FAQ";
import { generateEmbedding } from "../lib/gemini";

const sampleClaims = [
  {
    claimId: "C12345",
    customerName: "Rajesh Kumar",
    policyNumber: "P56789",
    status: "Approved",
    amount: 5000,
    date: "2025-01-12",
  },
  {
    claimId: "C12346",
    customerName: "Priya Sharma",
    policyNumber: "P56790",
    status: "Pending",
    amount: 3500,
    date: "2025-02-05",
  },
  {
    claimId: "C12347",
    customerName: "Robert Johnson",
    policyNumber: "P56791",
    status: "Under Review",
    amount: 7200,
    date: "2025-02-18",
  },
  {
    claimId: "C12348",
    customerName: "Emily Davis",
    policyNumber: "P56792",
    status: "Approved",
    amount: 4100,
    date: "2025-01-28",
  },
  {
    claimId: "C12349",
    customerName: "Amit Patel",
    policyNumber: "P56793",
    status: "Rejected",
    amount: 2800,
    date: "2025-02-10",
  },
  {
    claimId: "C12350",
    customerName: "Sarah Wilson",
    policyNumber: "P56794",
    status: "Approved",
    amount: 6500,
    date: "2025-01-22",
  },
  {
    claimId: "C12351",
    customerName: "Vikram Singh",
    policyNumber: "P56795",
    status: "Pending",
    amount: 5800,
    date: "2025-02-25",
  },
  {
    claimId: "C12352",
    customerName: "Anita Desai",
    policyNumber: "P56796",
    status: "Under Review",
    amount: 4500,
    date: "2025-02-20",
  },
  {
    claimId: "C12353",
    customerName: "James Taylor",
    policyNumber: "P56797",
    status: "Approved",
    amount: 3200,
    date: "2025-01-30",
  },
  {
    claimId: "C12354",
    customerName: "Deepa Mehta",
    policyNumber: "P56798",
    status: "Pending",
    amount: 7500,
    date: "2025-02-28",
  },
  {
    claimId: "C12355",
    customerName: "Christopher Lee",
    policyNumber: "P56799",
    status: "Approved",
    amount: 4800,
    date: "2025-02-08",
  },
  {
    claimId: "C12356",
    customerName: "Sunita Reddy",
    policyNumber: "P56800",
    status: "Under Review",
    amount: 6200,
    date: "2025-02-22",
  },
  {
    claimId: "C12357",
    customerName: "Daniel Harris",
    policyNumber: "P56801",
    status: "Approved",
    amount: 3900,
    date: "2025-02-01",
  },
  {
    claimId: "C12358",
    customerName: "Neha Gupta",
    policyNumber: "P56802",
    status: "Pending",
    amount: 5300,
    date: "2025-03-01",
  },
  {
    claimId: "C12359",
    customerName: "Matthew Lewis",
    policyNumber: "P56803",
    status: "Approved",
    amount: 4700,
    date: "2025-02-15",
  },
  {
    claimId: "C12360",
    customerName: "Kavita Rao",
    policyNumber: "P56804",
    status: "Rejected",
    amount: 3100,
    date: "2025-01-18",
  },
  {
    claimId: "C12361",
    customerName: "Sanjay Verma",
    policyNumber: "P56805",
    status: "Approved",
    amount: 8500,
    date: "2025-02-12",
  },
  {
    claimId: "C12362",
    customerName: "Barbara Allen",
    policyNumber: "P56806",
    status: "Pending",
    amount: 4900,
    date: "2025-03-05",
  },
  {
    claimId: "C12363",
    customerName: "Arjun Nair",
    policyNumber: "P56807",
    status: "Under Review",
    amount: 5600,
    date: "2025-02-27",
  },
  {
    claimId: "C12364",
    customerName: "Pooja Iyer",
    policyNumber: "P56808",
    status: "Approved",
    amount: 7100,
    date: "2025-01-25",
  },
  {
    claimId: "C12365",
    customerName: "Edward Wright",
    policyNumber: "P56809",
    status: "Pending",
    amount: 3800,
    date: "2025-03-08",
  },
  {
    claimId: "C12366",
    customerName: "Meena Krishnan",
    policyNumber: "P56810",
    status: "Approved",
    amount: 6300,
    date: "2025-02-03",
  },
  {
    claimId: "C12367",
    customerName: "Jason Hill",
    policyNumber: "P56811",
    status: "Rejected",
    amount: 2500,
    date: "2025-01-20",
  },
  {
    claimId: "C12368",
    customerName: "Lakshmi Menon",
    policyNumber: "P56812",
    status: "Under Review",
    amount: 5200,
    date: "2025-03-02",
  },
  {
    claimId: "C12369",
    customerName: "Ryan Green",
    policyNumber: "P56813",
    status: "Approved",
    amount: 4400,
    date: "2025-02-16",
  },
  {
    claimId: "C12370",
    customerName: "Divya Joshi",
    policyNumber: "P56814",
    status: "Pending",
    amount: 6800,
    date: "2025-03-10",
  },
  {
    claimId: "C12371",
    customerName: "Anil Kapoor",
    policyNumber: "P56815",
    status: "Approved",
    amount: 5100,
    date: "2025-01-14",
  },
  {
    claimId: "C12372",
    customerName: "Kimberly Nelson",
    policyNumber: "P56816",
    status: "Under Review",
    amount: 4600,
    date: "2025-02-24",
  },
  {
    claimId: "C12373",
    customerName: "Ravi Shankar",
    policyNumber: "P56817",
    status: "Approved",
    amount: 7800,
    date: "2025-02-07",
  },
  {
    claimId: "C12374",
    customerName: "Carol Mitchell",
    policyNumber: "P56818",
    status: "Pending",
    amount: 3400,
    date: "2025-03-12",
  },
  {
    claimId: "C12375",
    customerName: "Suresh Pillai",
    policyNumber: "P56819",
    status: "Rejected",
    amount: 2900,
    date: "2025-01-16",
  },
  {
    claimId: "C12376",
    customerName: "Sneha Banerjee",
    policyNumber: "P56820",
    status: "Approved",
    amount: 5900,
    date: "2025-02-19",
  },
  {
    claimId: "C12377",
    customerName: "Ronald Turner",
    policyNumber: "P56821",
    status: "Under Review",
    amount: 6600,
    date: "2025-03-04",
  },
  {
    claimId: "C12378",
    customerName: "Rekha Agarwal",
    policyNumber: "P56822",
    status: "Approved",
    amount: 4200,
    date: "2025-01-26",
  },
  {
    claimId: "C12379",
    customerName: "Manish Malhotra",
    policyNumber: "P56823",
    status: "Pending",
    amount: 7400,
    date: "2025-03-07",
  },
  {
    claimId: "C12380",
    customerName: "Donna Parker",
    policyNumber: "P56824",
    status: "Approved",
    amount: 5500,
    date: "2025-02-11",
  },
  {
    claimId: "C12381",
    customerName: "Karan Johar",
    policyNumber: "P56825",
    status: "Rejected",
    amount: 3300,
    date: "2025-01-19",
  },
  {
    claimId: "C12382",
    customerName: "Anjali Bhatt",
    policyNumber: "P56826",
    status: "Under Review",
    amount: 4800,
    date: "2025-02-26",
  },
  {
    claimId: "C12383",
    customerName: "Paul Collins",
    policyNumber: "P56827",
    status: "Approved",
    amount: 6100,
    date: "2025-02-09",
  },
  {
    claimId: "C12384",
    customerName: "Shruti Kapoor",
    policyNumber: "P56828",
    status: "Pending",
    amount: 5400,
    date: "2025-03-11",
  },
  {
    claimId: "C12385",
    customerName: "Harish Chandra",
    policyNumber: "P56829",
    status: "Approved",
    amount: 7600,
    date: "2025-01-23",
  },
  {
    claimId: "C12386",
    customerName: "Deborah Morris",
    policyNumber: "P56830",
    status: "Under Review",
    amount: 3700,
    date: "2025-03-01",
  },
  {
    claimId: "C12387",
    customerName: "Nikhil Shah",
    policyNumber: "P56831",
    status: "Approved",
    amount: 5000,
    date: "2025-02-14",
  },
  {
    claimId: "C12388",
    customerName: "Jessica Reed",
    policyNumber: "P56832",
    status: "Pending",
    amount: 6900,
    date: "2025-03-09",
  },
  {
    claimId: "C12389",
    customerName: "Rohan Chopra",
    policyNumber: "P56833",
    status: "Rejected",
    amount: 2700,
    date: "2025-01-21",
  },
  {
    claimId: "C12390",
    customerName: "Shalini Devi",
    policyNumber: "P56834",
    status: "Approved",
    amount: 8200,
    date: "2025-02-17",
  },
  {
    claimId: "C12391",
    customerName: "Andrew Bell",
    policyNumber: "P56835",
    status: "Under Review",
    amount: 4300,
    date: "2025-03-03",
  },
  {
    claimId: "C12392",
    customerName: "Varun Dhawan",
    policyNumber: "P56836",
    status: "Approved",
    amount: 5700,
    date: "2025-01-27",
  },
  {
    claimId: "C12393",
    customerName: "Aditi Rao",
    policyNumber: "P56837",
    status: "Pending",
    amount: 7300,
    date: "2025-03-06",
  },
  {
    claimId: "C12394",
    customerName: "Mohit Suri",
    policyNumber: "P56838",
    status: "Approved",
    amount: 4500,
    date: "2025-02-13",
  },
];

const sampleFAQs = [
  {
    question: "How long does claim settlement take?",
    answer:
      "Typically, claim settlement takes 7-10 working days after all required documents are submitted and verified. However, complex claims may take up to 15-20 business days. You can track your claim status using your claim ID.",
    category: "claims",
  },
  {
    question: "What documents are required to file a claim?",
    answer:
      "To file a claim, you need: 1) A completed claim form, 2) Your policy number, 3) Proof of incident (photos, police report, etc.), 4) Original bills/receipts, and 5) Medical reports (for health insurance claims). You can submit these through our online portal or by visiting a branch.",
    category: "claims",
  },
  {
    question: "How do I check my claim status?",
    answer:
      "You can check your claim status in three ways: 1) Use our online portal with your claim ID, 2) Contact our customer service at 1-800-CLAIMS-1, or 3) Use this chatbot by providing your claim ID (format: C12345).",
    category: "claims",
  },
  {
    question: "Can I modify my claim after submission?",
    answer:
      "Yes, you can modify your claim within 48 hours of submission if it hasn't been processed yet. Contact our claims department at 1-800-CLAIMS-1 or email claims@insuranceclaimassistant.com with your claim ID and the details you need to update.",
    category: "claims",
  },
  {
    question: "Why was my claim rejected?",
    answer:
      "Claims can be rejected for several reasons: 1) The incident is not covered under your policy, 2) Policy was inactive at the time of incident, 3) Incomplete or invalid documentation, 4) Fraudulent information, or 5) Claim filed after the deadline. Check your rejection letter for specific reasons and next steps.",
    category: "claims",
  },
  {
    question: "What types of insurance do you offer?",
    answer:
      "We offer a comprehensive range of insurance products including: Health Insurance, Life Insurance, Auto Insurance, Home Insurance, Travel Insurance, and Business Insurance. Each policy can be customized to meet your specific needs.",
    category: "policy",
  },
  {
    question: "How do I renew my insurance policy?",
    answer:
      "You can renew your policy online through our portal, via our mobile app, or by contacting your insurance agent. We send renewal reminders 30 days before expiry. You can also set up auto-renewal to ensure continuous coverage.",
    category: "policy",
  },
  {
    question: "What is the grace period for premium payment?",
    answer:
      "Most policies have a grace period of 15-30 days after the due date. During this period, your policy remains active, but it's important to make the payment as soon as possible to avoid policy lapse. Check your policy document for specific grace period details.",
    category: "payment",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept multiple payment methods: Credit/Debit cards, Net Banking, UPI, Auto-debit from bank account, Cash at branch offices, and Checks. Online payments are processed instantly, while offline payments may take 2-3 business days to reflect.",
    category: "payment",
  },
  {
    question: "How do I add a nominee to my policy?",
    answer:
      "You can add or change a nominee by: 1) Logging into your account portal and updating the nominee section, 2) Submitting a nominee change form at any branch, or 3) Contacting customer service at 1-800-INSURANCE. You'll need the nominee's full name, date of birth, and relationship to you.",
    category: "policy",
  },
  {
    question: "What is a deductible in insurance?",
    answer:
      "A deductible is the amount you pay out-of-pocket before your insurance coverage kicks in. For example, if you have a $500 deductible and a $5,000 claim, you pay $500 and insurance covers $4,500. Higher deductibles usually mean lower premiums.",
    category: "policy",
  },
  {
    question: "Can I cancel my policy?",
    answer:
      "Yes, you can cancel your policy at any time. For cancellations within the free-look period (usually 15-30 days from policy start), you'll receive a full refund. After that, you may receive a partial refund minus applicable charges. Contact customer service at 1-800-INSURANCE to initiate cancellation.",
    category: "policy",
  },
  {
    question: "How do I file a complaint?",
    answer:
      "To file a complaint: 1) Contact customer service at 1-800-INSURANCE, 2) Email complaints@insuranceclaimassistant.com, 3) Use the complaint form in your online portal, or 4) Visit any branch office. We aim to resolve all complaints within 7 business days.",
    category: "support",
  },
  {
    question: "What should I do in case of an accident?",
    answer:
      "In case of an accident: 1) Ensure everyone's safety first, 2) Call emergency services if needed, 3) Document the scene with photos, 4) Exchange information with other parties, 5) File a police report if required, 6) Notify us within 24 hours at 1-800-CLAIMS-1, and 7) Submit your claim with all documentation.",
    category: "claims",
  },
  {
    question: "Is there a mobile app to manage my policy?",
    answer:
      "No! currently, we do not have a mobile app. However, our online portal is mobile-friendly and allows you to manage your policy, file claims, and make payments easily from your smartphone or tablet. We are working on developing a dedicated mobile app for a better user experience.",
    category: "support",
  },
  {
    question: "What is pre-authorization in health insurance?",
    answer:
      "Pre-authorization is approval from the insurance company before receiving certain medical treatments or procedures. It ensures the treatment is covered under your policy. You or your hospital can request pre-authorization by calling our health claims team at 1-800-HEALTH. This typically takes 24-48 hours.",
    category: "claims",
  },
  {
    question: "How do I update my contact information?",
    answer:
      "Update your contact information by: 1) Logging into your online account and editing your profile, 2) Contacting customer service at 1-800-INSURANCE, 3) Visiting any branch with ID proof, or 4) Emailing updates@insuranceclaimassistant.com with your policy number and new details.",
    category: "support",
  },
  {
    question: "What is a co-payment in insurance?",
    answer:
      "Co-payment (or co-pay) is a fixed amount or percentage you pay for covered healthcare services, with insurance covering the rest. For example, with a 20% co-pay on a $1,000 medical bill, you pay $200 and insurance pays $800. Co-pay terms vary by policy.",
    category: "policy",
  },
  {
    question: "What is term life insurance?",
    answer:
      "Term life insurance provides coverage for a specific period (10, 20, or 30 years). If the insured passes away during this term, beneficiaries receive the death benefit. It's typically more affordable than whole life insurance and ideal for temporary coverage needs like mortgage protection or income replacement.",
    category: "policy",
  },
  {
    question: "How does auto insurance deductible work?",
    answer:
      "With auto insurance, you choose a deductible amount when purchasing your policy. If you file a claim, you pay the deductible first, and insurance covers the rest. For example, with a $500 deductible and $3,000 in damages, you pay $500 and insurance pays $2,500. Higher deductibles mean lower premiums.",
    category: "policy",
  },
  {
    question: "What is cashless hospitalization?",
    answer:
      "Cashless hospitalization allows you to get treatment at network hospitals without paying upfront. The insurance company directly settles bills with the hospital. You need to inform the insurer before admission, get pre-authorization, and use a network hospital. Co-payments and deductibles may still apply.",
    category: "claims",
  },
  {
    question: "Can I have multiple health insurance policies?",
    answer:
      'Yes, you can have multiple health insurance policies. This is called "contribution principle." If you make a claim, you can claim from both insurers, but the total reimbursement cannot exceed actual medical expenses. You must inform both insurers about other policies you hold.',
    category: "policy",
  },
  {
    question: "What is waiting period in insurance?",
    answer:
      "A waiting period is the time you must wait before certain coverages become active. Initial waiting periods are typically 30-90 days for basic coverage. Pre-existing diseases have longer waiting periods (2-4 years). Specific illnesses like hernia or cataract may have 1-2 year waiting periods.",
    category: "policy",
  },
  {
    question: "How do I calculate the right insurance coverage amount?",
    answer:
      "For life insurance, multiply your annual income by 10-15 times and add outstanding debts and future expenses (children's education, etc.). For health insurance, consider medical inflation and family medical history - typically 5-10 lakhs minimum per family member. For auto insurance, insured declared value should match market value.",
    category: "policy",
  },
  {
    question:
      "What is the difference between third-party and comprehensive auto insurance?",
    answer:
      "Third-party insurance covers damage to other vehicles/property and injuries to others - it's legally mandatory. Comprehensive insurance covers third-party liabilities plus damage to your own vehicle from accidents, theft, fire, natural disasters, etc. Comprehensive offers complete protection but costs more.",
    category: "policy",
  },
  {
    question: "Can I port my health insurance policy?",
    answer:
      "Yes, you can port (transfer) your health insurance to another insurer while retaining benefits like waiting period credits and no-claim bonus. Apply at least 45 days before renewal. The new insurer may require medical tests and can reject porting. Pre-existing disease coverage continuity is protected by law.",
    category: "policy",
  },
  {
    question: "What is no-claim bonus in insurance?",
    answer:
      "No-claim bonus (NCB) is a discount on your premium for not filing claims during the policy year. In auto insurance, NCB can go up to 50% over 5 claim-free years. In health insurance, NCB typically increases sum insured by 5-50% annually. NCB belongs to the policyholder, not the vehicle.",
    category: "policy",
  },
  {
    question: "How does travel insurance work?",
    answer:
      "Travel insurance covers trip cancellations, medical emergencies abroad, lost baggage, flight delays, and passport loss. Purchase before your trip starts. Coverage varies by plan - basic covers medical emergencies, comprehensive includes trip cancellation and baggage. Keep all receipts and file claims within the specified timeframe.",
    category: "policy",
  },
  {
    question: "What are exclusions in an insurance policy?",
    answer:
      "Exclusions are situations or conditions not covered by your policy. Common exclusions include: pre-existing diseases (during waiting period), cosmetic treatments, self-inflicted injuries, war/nuclear risks, illegal activities, and intentional damage. Always read your policy document to understand what's not covered.",
    category: "policy",
  },
  {
    question: "How do I add coverage to my existing policy?",
    answer:
      "You can add coverage (called riders or add-ons) during policy renewal or sometimes mid-term by paying additional premium. Common add-ons include critical illness cover, maternity benefits, accident coverage, zero depreciation for auto insurance. Contact your agent or use the online portal to add coverage.",
    category: "policy",
  },
  {
    question: "What is sum insured in health insurance?",
    answer:
      "Sum insured is the maximum amount the insurance company will pay for your medical expenses in a policy year. Choose based on family size, age, medical history, and city of residence. After limits are exhausted, you pay out-of-pocket. Some policies offer restoration benefits or unlimited coverage options.",
    category: "policy",
  },
  {
    question: "Can I claim insurance for pre-existing conditions?",
    answer:
      "Yes, but typically after completing a waiting period of 2-4 years, depending on your policy. Some policies offer reduced waiting periods for higher premiums. You must disclose all pre-existing conditions when purchasing - non-disclosure can lead to claim rejection. Recent policies offer shorter waiting periods.",
    category: "claims",
  },
  {
    question: "What documents do I need for cashless hospitalization?",
    answer:
      "For cashless hospitalization, you need: 1) Health insurance card, 2) Photo ID proof, 3) Pre-authorization form (filled by hospital), 4) Doctor's prescription and medical reports, 5) Admission advice from doctor. Submit these to the insurance desk at the network hospital before or during admission.",
    category: "claims",
  },
  {
    question: "How do I check if a hospital is in my insurance network?",
    answer:
      "Check network hospitals by: 1) Visiting your insurer's website and using the hospital locator tool, 2) Calling customer service at 1-800-INSURANCE, 3) Checking your policy document, or 4) Using your insurance mobile app. Network hospitals are updated regularly, so verify before admission.",
    category: "support",
  },
  {
    question: "What is depreciation in auto insurance claims?",
    answer:
      "Depreciation is the reduction in value of vehicle parts over time. In standard policies, depreciation (5-50% based on age) is deducted from claim amounts for replaced parts. Zero depreciation coverage eliminates this deduction, ensuring full part value reimbursement. It's available for vehicles up to 5 years old.",
    category: "claims",
  },
  {
    question: "Can I transfer my insurance policy to someone else?",
    answer:
      "Life insurance policies can be transferred (assigned) to another person with proper documentation and insurer approval. Auto insurance automatically transfers with vehicle ownership, but inform the insurer within 14 days. Health insurance is generally non-transferable as it's tied to the insured individual's health profile.",
    category: "policy",
  },
  {
    question: "What is the claim settlement ratio?",
    answer:
      "Claim settlement ratio is the percentage of claims an insurer settles vs. total claims received. For example, a 95% ratio means 95 out of 100 claims are approved. Higher ratios indicate better claim settlement track record. Check this ratio before buying insurance - it's published annually by insurance regulators.",
    category: "policy",
  },
  {
    question: "How long do I have to file a claim after an incident?",
    answer:
      "Time limits vary by policy type: Auto insurance - immediately or within 24-48 hours. Health insurance - within 24 hours for cashless, 15-30 days for reimbursement. Life insurance - no fixed time limit but claims should be filed soon after death. Travel insurance - 7-15 days. Check your policy document for specific timelines.",
    category: "claims",
  },
  {
    question: "What is the difference between health insurance and mediclaim?",
    answer:
      "Mediclaim is a type of health insurance that covers only hospitalization expenses (24+ hour stays). Health insurance is broader, covering pre and post-hospitalization, day-care procedures, ambulance charges, and sometimes OPD. Modern comprehensive health insurance policies include all mediclaim benefits plus additional coverage.",
    category: "policy",
  },
  {
    question: "Can I get insurance for my parents?",
    answer:
      "Yes, you can purchase health insurance for your parents even if they're senior citizens. Many insurers offer senior citizen plans for ages 60-80+. Premiums are higher due to age and health risks. Pre-policy medical tests are usually required. Some plans have entry age limits, so buy early for better coverage and premiums.",
    category: "policy",
  },
  {
    question: "What is endorsement in insurance?",
    answer:
      "An endorsement is a written amendment or addition to your existing policy. It modifies coverage terms, adds/removes coverage, updates personal information, or adds/removes insured parties. Examples include adding a driver to auto insurance or changing address. Endorsements become part of the policy and may affect premiums.",
    category: "policy",
  },
  {
    question: "How does reimbursement claim process work?",
    answer:
      "For reimbursement claims: 1) Pay hospital bills yourself, 2) Collect all bills, receipts, discharge summary, and medical reports, 3) Fill the claim form, 4) Submit documents to insurer within specified timeframe (usually 15-30 days), 5) Insurer reviews and processes, 6) Approved amount is transferred to your bank account in 7-15 days.",
    category: "claims",
  },
  {
    question: "What is critical illness insurance?",
    answer:
      "Critical illness insurance pays a lump sum if you're diagnosed with specified critical illnesses like cancer, heart attack, stroke, kidney failure, or major organ transplant. The payout can be used for any purpose - treatment, lifestyle changes, debt repayment. It's usually a rider on life or health insurance.",
    category: "policy",
  },
  {
    question: "Can I pause or suspend my insurance policy?",
    answer:
      "Most insurance policies cannot be paused. However, you can: 1) Request premium holiday in some life insurance policies after 3-5 years, 2) Use grace period for delayed payment, or 3) Convert to reduced paid-up policy in life insurance. Health and auto insurance remain active only with timely premium payment. Contact your insurer for options.",
    category: "policy",
  },
  {
    question: "What is the difference between term plan and endowment plan?",
    answer:
      "Term insurance provides pure life cover - pays only if death occurs during term, no maturity benefit. Endowment combines insurance with savings - pays on death or policy maturity. Term plans have higher coverage at lower premiums. Endowment plans cost more but build cash value. Term is best for pure protection needs.",
    category: "policy",
  },
  {
    question: "How do premium calculations work?",
    answer:
      "Premiums are calculated based on: 1) Age (younger pays less), 2) Sum insured/coverage amount (higher coverage = higher premium), 3) Health status and lifestyle (smokers pay more), 4) Policy type and duration, 5) Add-ons and riders, 6) Claim history, 7) Occupation risk, 8) Location, and 9) Vehicle details (for auto insurance).",
    category: "payment",
  },
  {
    question: "What is a rider in insurance?",
    answer:
      "A rider is an optional add-on benefit to your base insurance policy. Common riders include: critical illness cover, accidental death benefit, waiver of premium, income benefit, hospital cash, maternity cover. Riders enhance coverage for additional premium. They cannot be purchased separately and must be attached to a base policy.",
    category: "policy",
  },
  {
    question: "Can I get tax benefits on insurance premiums?",
    answer:
      "Yes! Under tax laws, you can claim deductions: Life insurance premiums up to $1,500/year under Section 80C. Health insurance premiums up to $600/year ($800 for senior citizens) under Section 80D. Premium paid for parents gets additional deduction. Critical illness insurance and preventive health check-ups also qualify. Keep premium receipts for tax filing.",
    category: "payment",
  },
  {
    question: "What should I do if my claim is denied?",
    answer:
      "If your claim is denied: 1) Request detailed written reason for denial, 2) Review your policy document to verify coverage, 3) Gather supporting documents, 4) File an appeal with the insurer within specified timeframe, 5) Escalate to grievance officer if not resolved, 6) File complaint with insurance regulatory authority, 7) Seek legal recourse if necessary.",
    category: "claims",
  },
];

async function seedDatabase() {
  try {
    console.log("Starting database seeding...\n");

    await connectDB();
    console.log("Connected to MongoDB\n");

    console.log("Clearing existing data...");
    await Claim.deleteMany({});
    await FAQ.deleteMany({});
    console.log("Existing data cleared\n");

    console.log("Seeding claims...");
    await Claim.insertMany(sampleClaims);
    console.log(`Inserted ${sampleClaims.length} claims\n`);

    console.log("Generating embeddings for FAQs...");
    console.log("This may take a minute...\n");

    const faqsWithEmbeddings = [];

    for (let i = 0; i < sampleFAQs.length; i++) {
      const faq = sampleFAQs[i];
      console.log(
        `   Processing FAQ ${i + 1}/${
          sampleFAQs.length
        }: "${faq.question.substring(0, 50)}..."`
      );

      try {
        const embedding = await generateEmbedding(faq.question);

        faqsWithEmbeddings.push({
          ...faq,
          embedding,
        });

        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (error) {
        console.error(`   Error generating embedding for FAQ ${i + 1}:`, error);
        throw error;
      }
    }

    await FAQ.insertMany(faqsWithEmbeddings);
    console.log(
      `\nInserted ${faqsWithEmbeddings.length} FAQs with embeddings\n`
    );

    // Summary
    console.log("Database seeding completed successfully!\n");
    console.log("Summary:");
    console.log(`   • Claims: ${sampleClaims.length}`);
    console.log(`   • FAQs: ${faqsWithEmbeddings.length}`);
    console.log("\nYour database is ready to use!\n");

    process.exit(0);
  } catch (error) {
    console.error("\nError seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
