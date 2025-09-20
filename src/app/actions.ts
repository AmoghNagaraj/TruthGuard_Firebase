"use server";

import { analyzeNarrative, NarrativeAnalysisInput } from "@/ai/flows/narrative-analysis-flow";
import { z } from "zod";

const NarrativeAnalysisFormSchema = z.object({
  content: z.string().min(20, "Content must be at least 20 characters."),
  source: z.string().min(3, "Source must be at least 3 characters."),
});

export async function handleNarrativeAnalysis(data: NarrativeAnalysisInput) {
  const validation = NarrativeAnalysisFormSchema.safeParse(data);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await analyzeNarrative(data);
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Error analyzing narrative:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}
