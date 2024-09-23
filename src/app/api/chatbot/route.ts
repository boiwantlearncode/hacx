import { runAssistant } from '../../../actions/chatbot'; // Server-side code with Azure OpenAI logic
import { NextRequest, NextResponse } from 'next/server';

type AssistantResponse = {
    response: string;
}

export async function POST(req: NextRequest, res: NextResponse<AssistantResponse | { error: string }>) {
    if (req.method === 'POST') {
        console.log("POST request has been made.");
        if (!req.body)  {
            return NextResponse.json(
                {
                    status: 400,
                    error: 'Message is required',
                },
            );
        } else {
            try {
                const data = await req.json();
                const assistantResponse = await runAssistant(data.message, data.audience);
                
                return NextResponse.json(
                    { message: assistantResponse },
                    {
                        status: 200,
                    }
                )

            } catch (error) {
                console.error('Error calling Azure OpenAI Assistant:', error);
                return NextResponse.json(
                    {
                        status: 500,
                        error: 'Failed to process request'
                    }
                )
            }
        }
    } else {
        return NextResponse.json(
            { message: `Method ${req.method} Not Allowed`},
            {
                status: 405,
                headers: {
                    "Allow": "POST"
                },
            }
        );
    }
}
