'use server';
/**
 * @fileOverview AI-powered analysis of online content for misinformation and manipulation.
 *
 * This file defines a Genkit flow that uses AI to perform an in-depth analysis
 * of content (like a news article or social media post), assesses its risk of being
 * misinformation, and generates a detailed report.
 *
 * @exports analyzeNarrative - The main function to analyze content.
 * @exports NarrativeAnalysisInput - The input type for the analyzeNarrative function.
 * @exports NarrativeAnalysisOutput - The return type for the analyzeNarrative function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { webSearchTool } from '../tools/web-search';

const NarrativeAnalysisInputSchema = z.object({
  content: z
    .string()
    .describe('The full text content of the article or post to be analyzed.'),
  source: z
    .string()
    .describe('The source of the content (e.g., website name, social media handle).'),
});
export type NarrativeAnalysisInput = z.infer<typeof NarrativeAnalysisInputSchema>;

const NarrativeAnalysisOutputSchema = z.object({
  riskScore: z
    .number()
    .min(1)
    .max(10)
    .describe(
      'A numerical score from 1-10 representing the risk of misinformation, with 10 being the most severe.'
    ),
  keyNarrative: z
    .string()
    .describe('A brief summary of the main point or narrative being pushed by the content.'),
  analysisSummary: z
    .string()
    .describe('A concise, non-technical summary of the analysis and its findings.'),
  detailedAnalysis: z
    .string()
    .describe(
      'A detailed technical breakdown of the content, highlighting loaded language, logical fallacies, and other manipulation techniques.'
    ),
  counterPoints: z.array(z.string()).describe(
    'A prioritized list of counter-arguments or fact-based points to mitigate the narrative. Each counterpoint should be a string that includes a citation from the web search tool.'
  ),
  telltaleSigns: z.array(z.string()).describe(
    'A list of specific phrases or characteristics within the content that are red flags for misinformation.'
  ),
});
export type NarrativeAnalysisOutput = z.infer<typeof NarrativeAnalysisOutputSchema>;

export async function analyzeNarrative(
  input: NarrativeAnalysisInput
): Promise<NarrativeAnalysisOutput> {
  return narrativeAnalysisFlow(input);
}

const narrativeAnalysisPrompt = ai.definePrompt({
  name: 'narrativeAnalysisPrompt',
  input: {schema: NarrativeAnalysisInputSchema},
  output: {schema: NarrativeAnalysisOutputSchema},
  tools: [webSearchTool],
  prompt: `You are a world-class disinformation analyst AI. Your task is to provide a comprehensive assessment of the provided content for potential manipulation, bias, and false information.

  Your response must be a valid JSON object adhering to the output schema.

  **Analyze the following content:**

  - **Source:** {{{source}}}
  - **Content:**
  \`\`\`
  {{{content}}}
  \`\`\`

  **Your analysis must include:**
  1.  **riskScore**: An integer from 1 to 10. Consider the source's reputation, the language used, the presence of logical fallacies, and the potential for societal harm.
  2.  **keyNarrative**: Summarize the core message or story the content is trying to convey.
  3.  **analysisSummary**: A brief, high-level summary for a general audience.
  4.  **detailedAnalysis**: A deep dive into the techniques used. Identify specific examples of loaded language, emotional appeals, logical fallacies, or unsourced claims.
  5.  **counterPoints**: A clear, ordered list of fact-based points to counter the narrative. **You must use the webSearchTool to find credible sources to support your counter-points. Each counterpoint in the array MUST include an inline citation with the source URL, like this: "Counterpoint text (Source: https://example.com)".**
  6.  **telltaleSigns**: A list of specific phrases, keywords, or patterns in the text that are indicators of misinformation.
  `,
});

const narrativeAnalysisFlow = ai.defineFlow(
  {
    name: 'narrativeAnalysisFlow',
    inputSchema: NarrativeAnalysisInputSchema,
    outputSchema: NarrativeAnalysisOutputSchema,
  },
  async input => {
    const {output} = await narrativeAnalysisPrompt(input);
    return output!;
  }
);
