// 1. gpt3.5 turbo
// 2. flipside query

import type { NextApiRequest, NextApiResponse } from 'next';
import { createEthereumCoreTransactionSchema } from '@prompt/ethereum/core.transaction';
import { FlipsideSchema } from '@schema/interface';
import { ChatOpenAI } from 'langchain/chat_models';
import { OPENAI_API_KEY } from '@constants/config';

// TODO: refactor to have the dependency injection
const chat = new ChatOpenAI({
  temperature: 0,
  maxConcurrency: 5,
  openAIApiKey: OPENAI_API_KEY,
});

type Data = {
  sqlStatement?: string;
  errorMessage?: string;
};

const callGPT = async (schema: FlipsideSchema, rawUserMessage: string) => {
  const chatPromptTemplate = schema.toChatPromptTemplate();
  const response = await chat.generatePrompt([
    await chatPromptTemplate.formatPromptValue({
      userMessage: rawUserMessage,
    }),
  ]);

  // TODO: refactor this for much human readable way
  return response.generations.map((g) => g.map((m) => m.text).join(' '))[0];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method === 'POST') {
      const rawUserMessage = req.body.userMessage;
      const ethCoreTxSchema = createEthereumCoreTransactionSchema();
      const modelResponse: string = await callGPT(
        ethCoreTxSchema,
        rawUserMessage
      );

      res.status(200).json({ sqlStatement: modelResponse });
    } else {
      res.status(405).json({ errorMessage: 'Method Not Allowed' });
    }
  } catch (error: any) {
    console.error({ error });
    res.status(400).json({ errorMessage: error.message });
  }
}
