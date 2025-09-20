'use server';

/**
 * @fileOverview AI-powered threat prioritization flow.
 *
 * This file defines a Genkit flow that uses AI to rank security threats based on
 * their severity and potential impact. It includes the main flow function,
 * input/output schema definitions, and a prompt that leverages the LLM to
 * perform the threat prioritization.
 *
 * @exports prioritizeThreats - The main function to prioritize security threats.
 * @exports ThreatPrioritizationInput - The input type for the prioritizeThreats function.
 * @exports ThreatPrioritizationOutput - The return type for the prioritizeThreats function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ThreatPrioritizationInputSchema = z.object({
  threatDescription: z
    .string()
    .describe('A detailed description of the detected security threat.'),
  logData: z
    .string()
    .describe('Relevant log data associated with the threat.'),
  vulnerabilityData: z
    .string()
    .optional()
    .describe('Optional vulnerability data associated with the threat.'),
  riskFactors: z
    .string()
    .optional()
    .describe('Optional factors that influence the risk of the threat.'),
});
export type ThreatPrioritizationInput = z.infer<
  typeof ThreatPrioritizationInputSchema
>;

const ThreatPrioritizationOutputSchema = z.object({
  severityScore: z
    .number()
    .describe(
      'A numerical score representing the severity of the threat (e.g., 1-10, with 10 being the most severe).' + 
      'This score should be based on the likelihood of a successful exploit and the potential damage.'
    ),
  impactAssessment: z
    .string()
    .describe(
      'A detailed assessment of the potential impact of the threat, including affected systems, data, and business processes.'
    ),
  recommendedActions: z
    .string()
    .describe(
      'Specific actions recommended to mitigate the threat, such as patching vulnerabilities, isolating affected systems, or escalating to incident response teams.'
    ),
  justification: z
    .string()
    .describe(
      'A detailed justification for the assigned severity score and recommended actions, based on the provided threat description, log data, vulnerability data, and risk factors.'
    ),
});
export type ThreatPrioritizationOutput = z.infer<
  typeof ThreatPrioritizationOutputSchema
>;

export async function prioritizeThreats(
  input: ThreatPrioritizationInput
): Promise<ThreatPrioritizationOutput> {
  return threatPrioritizationFlow(input);
}

const threatPrioritizationPrompt = ai.definePrompt({
  name: 'threatPrioritizationPrompt',
  input: {schema: ThreatPrioritizationInputSchema},
  output: {schema: ThreatPrioritizationOutputSchema},
  prompt: `You are an AI-powered security threat assessment expert.

  Analyze the following security threat information and provide a severity score, impact assessment, recommended actions, and a justification for your assessment.

  Threat Description: {{{threatDescription}}}
  Log Data: {{{logData}}}
  Vulnerability Data: {{{vulnerabilityData}}}
  Risk Factors: {{{riskFactors}}}

  Provide a severityScore (numerical), impactAssessment (string), recommendedActions (string), and justification (string) in the output.
  The severityScore should be based on the likelihood of a successful exploit and the potential damage.
  The impactAssessment should include affected systems, data, and business processes.
  The recommendedActions should include specific steps to mitigate the threat, such as patching vulnerabilities, isolating affected systems, or escalating to incident response teams.
  The justification should explain the reasoning behind the assigned severity score and recommended actions.
  `,
});

const threatPrioritizationFlow = ai.defineFlow(
  {
    name: 'threatPrioritizationFlow',
    inputSchema: ThreatPrioritizationInputSchema,
    outputSchema: ThreatPrioritizationOutputSchema,
  },
  async input => {
    const {output} = await threatPrioritizationPrompt(input);
    return output!;
  }
);
