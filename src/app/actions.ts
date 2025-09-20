"use server";

import { prioritizeThreats, ThreatPrioritizationInput } from "@/ai/flows/threat-prioritization";
import { z } from "zod";

const ThreatPrioritizationFormSchema = z.object({
  threatDescription: z.string().min(10, "Threat description must be at least 10 characters."),
  logData: z.string().min(10, "Log data must be at least 10 characters."),
  vulnerabilityData: z.string().optional(),
  riskFactors: z.string().optional(),
});

export async function handleThreatPrioritization(data: ThreatPrioritizationInput) {
  const validation = ThreatPrioritizationFormSchema.safeParse(data);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await prioritizeThreats(data);
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Error prioritizing threat:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}
