# TruthGuard: AI-Powered Disinformation Analysis

TruthGuard is a modern, AI-powered dashboard designed to help journalists, researchers, and content moderators detect, analyze, and combat online misinformation. It leverages Google's Gemini AI through Genkit to provide in-depth analysis of online content, identify manipulation techniques, and generate evidence-based counter-arguments.

The application features a sleek, responsive UI with a "liquid glass" aesthetic, built with Next.js, Tailwind CSS, and ShadCN UI components.

## Live Demo

You can view a live deployment of the application here:
[https://darling-creponne-9042cd.netlify.app/](https://68ce65844043377f9c759d5c--darling-creponne-9042cd.netlify.app/login)

## Features

-   **AI Narrative Analysis**: Paste any news article or social media post to get an instant analysis of its potential for misinformation.
-   **Evidence-Based Counter-Arguments**: The AI uses a web search tool to find and cite credible sources to counter false narratives.
-   **Risk Scoring**: The AI assigns a risk score from 1-10 to quickly identify high-threat narratives.
-   **Detailed Reporting**: Get a full report including a summary, detailed analysis, key narrative points, and telltale signs of misinformation.
-   **Modern UI**: A fully responsive and aesthetically pleasing dashboard with a "liquid glass" design.
-   **Interactive Charts**: Visualize narrative activity and trends over time.

## Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (with App Router)
-   **AI Integration**: [Genkit](https://firebase.google.com/docs/genkit) with Google's Gemini model
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Deployment**: [Netlify](https://www.netlify.com/)

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

-   [Node.js](https://nodejs.org/en) (v18 or later)
-   `npm` or your preferred package manager

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd <your-repository-name>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a file named `.env` in the root of your project and add your Google AI API key. You can get a key from [Google AI Studio](https://aistudio.google.com/app/apikey).

```
GEMINI_API_KEY=your_google_ai_api_key_here
```

### 4. Run the development server

```bash
npm run dev
```

The application will be available at `http://localhost:9002`.

## Deployment

This project is configured for easy deployment to [Netlify](https://www.netlify.com/). The `netlify.toml` file in the repository contains the necessary build commands and settings.

To deploy:
1.  Push your code to a GitHub, GitLab, or Bitbucket repository.
2.  Import the project into Netlify.
3.  Add your `GEMINI_API_KEY` to the environment variables in the Netlify site settings.
4.  Trigger a deploy. Netlify will handle the rest!
