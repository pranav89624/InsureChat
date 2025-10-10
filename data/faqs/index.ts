// Central export file for all FAQ categories
export { insuranceBasicsFAQs } from "./insurance-basics";
export { claimsFAQs } from "./claims";
export { healthInsuranceFAQs } from "./health-insurance";
export { lifeInsuranceFAQs } from "./life-insurance";
export { autoInsuranceFAQs } from "./auto-insurance";
export { homeInsuranceFAQs } from "./home-insurance";
export { generalPolicyFAQs } from "./general-policy";
export { paymentSupportFAQs } from "./payment-support";

// Combine all FAQs for easy import
import { insuranceBasicsFAQs } from "./insurance-basics";
import { claimsFAQs } from "./claims";
import { healthInsuranceFAQs } from "./health-insurance";
import { lifeInsuranceFAQs } from "./life-insurance";
import { autoInsuranceFAQs } from "./auto-insurance";
import { homeInsuranceFAQs } from "./home-insurance";
import { generalPolicyFAQs } from "./general-policy";
import { paymentSupportFAQs } from "./payment-support";

export const allFAQs = [
  ...insuranceBasicsFAQs,
  ...claimsFAQs,
  ...healthInsuranceFAQs,
  ...lifeInsuranceFAQs,
  ...autoInsuranceFAQs,
  ...homeInsuranceFAQs,
  ...generalPolicyFAQs,
  ...paymentSupportFAQs,
];

// Total: 170 FAQs

export const faqStats = {
  insuranceBasics: insuranceBasicsFAQs.length,
  claims: claimsFAQs.length,
  healthInsurance: healthInsuranceFAQs.length,
  lifeInsurance: lifeInsuranceFAQs.length,
  autoInsurance: autoInsuranceFAQs.length,
  homeInsurance: homeInsuranceFAQs.length,
  generalPolicy: generalPolicyFAQs.length,
  paymentSupport: paymentSupportFAQs.length,
  total: allFAQs.length,
};
