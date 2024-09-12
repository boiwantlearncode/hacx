import { NextApiRequest, NextApiResponse } from 'next';
import { runAssistant } from '../../../actions/chatbot'; // Server-side code with Azure OpenAI logic

interface AssistantResponse {
    response: string;
}

export default async function POST(req: NextApiRequest, res: NextApiResponse<AssistantResponse | { error: string }>) {
    if (req.method === 'POST') {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        try {
            const assistantResponse = await runAssistant(message);
            return res.status(200).json({ response: assistantResponse });
        } catch (error) {
            console.error('Error calling Azure OpenAI Assistant:', error);
            return res.status(500).json({ error: 'Failed to process request' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
