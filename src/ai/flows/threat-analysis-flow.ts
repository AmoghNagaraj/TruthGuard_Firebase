'use server';
/**
 * @fileOverview AI-powered threat analysis and mitigation report generation.
 *
 * This file defines a Genkit flow that uses AI to perform an in-depth analysis
 * of security threats, assign a severity score, and generate a detailed
 * mitigation report.
 *
 * @exports analyzeThreat - The main function to analyze security threats.
 * @exports ThreatAnalysisInput - The input type for the analyzeThreat function.
 * @exports ThreatAnalysisOutput - The return type for the analyzeThreat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ThreatAnalysisInputSchema = z.object({
  threatDescription: z
    .string()
    .describe('A detailed description of the detected security threat.'),
  logData: z
    .string()
    .describe('Relevant log data associated with the threat.'),
  vulnerabilityData: z
    .string()
    .optional()
    .describe('Optional vulnerability data associated with the threat (e.g., CVEs).'),
  riskFactors: z
    .string()
    .optional()
    .describe('Optional factors that influence the risk of the threat (e.g., high-value asset).'),
});
export type ThreatAnalysisInput = z.infer<typeof ThreatAnalysisInputSchema>;

const ThreatAnalysisOutputSchema = z.object({
  severityScore: z
    .number()
    .min(1)
    .max(10)
    .describe(
      'A numerical score from 1-10 representing the threat severity, with 10 being the most critical. Based on likelihood and potential impact.'
    ),
  threatCategory: z
    .string()
    .describe('A classification of the threat type (e.g., "Brute-Force Attack", "DDoS", "Malware", "Insider Threat").'),
  executiveSummary: z
    .string()
    .describe('A concise, non-technical summary of the threat and its potential business impact.'),
  technicalAnalysis: z
    .string()
    .describe(
      'A detailed technical breakdown of the threat, referencing log data and vulnerability info.'
    ),
  mitigationSteps: z.array(z.string()).describe(
    'A prioritized list of concrete, actionable steps to mitigate the threat.'
  ),
  incidentResponsePlan: z
    .string()
    .describe('A brief plan for incident response, including containment, eradication, and recovery phases.'),
});
export type ThreatAnalysisOutput = z.infer<typeof ThreatAnalysisOutputSchema>;

export async function analyzeThreat(
  input: ThreatAnalysisInput
): Promise<ThreatAnalysisOutput> {
  return threatAnalysisFlow(input);
}

const threatAnalysisPrompt = ai.definePrompt({
  name: 'threatAnalysisPrompt',
  input: {schema: ThreatAnalysisInputSchema},
  output: {schema: ThreatAnalysisOutputSchema},
  prompt: `You are a world-class cybersecurity analyst AI, tasked with providing a comprehensive threat assessment.

  Your response must be structured as a valid JSON object adhering to the output schema.

  **Analyze the following security threat data:**

  - **Threat Description:** {{{threatDescription}}}
  - **Log Data:**
  \`\`\`
  {{{logData}}}
  \`\`\`
  - **Vulnerability Data:** {{{vulnerabilityData}}}
  - **Risk Factors:** {{{riskFactors}}}

  **Your analysis must include:**
  1.  **severityScore**: An integer from 1 to 10. Consider the log data, CVEs, and risk factors. A successful login after multiple failures on a privileged account is highly severe.
  2.  **threatCategory**: Classify the attack type.
  3.  **executiveSummary**: A brief, high-level summary for leadership.
  4.  **technicalAnalysis**: A deep dive into the technical aspects of the threat.
  5.  **mitigationSteps**: A clear, ordered list of actions to take.
  6.  **incidentResponsePlan**: A concise plan for handling the incident.
  `,
});

const threatAnalysisFlow = ai.defineFlow(
  {
    name: 'threatAnalysisFlow',
    inputSchema: ThreatAnalysisInputSchema,
    outputSchema: ThreatAnalysisOutputSchema,
  },
  async input => {
    const {output} = await threatAnalysisPrompt(input);
    return output!;
  }
);
