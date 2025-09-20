"use server";

import { analyzeThreat, ThreatAnalysisInput } from "@/ai/flows/threat-analysis-flow";
import { z } from "zod";

const ThreatAnalysisFormSchema = z.object({
  threatDescription: z.string().min(10, "Threat description must be at least 10 characters."),
  logData: z.string().min(10, "Log data must be at least 10 characters."),
  vulnerabilityData: z.string().optional(),
  riskFactors: z.string().optional(),
});

export async function handleThreatAnalysis(data: ThreatAnalysisInput) {
  const validation = ThreatAnalysisFormSchema.safeParse(data);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await analyzeThreat(data);
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Error analyzing threat:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}
