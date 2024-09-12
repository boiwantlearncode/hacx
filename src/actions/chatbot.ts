require('dotenv/config');
const { AzureOpenAI } = require('openai');

// Get environment variables
const azureOpenAIKey = "ac957d94e99940f0b9f894ba98e1c4c3"
//process.env.AZURE_API_KEY;
const azureOpenAIEndpoint = "https://genai111111.openai.azure.com/";
//process.env.AZURE_ENDPOINT;
const azureOpenAIVersion = "2024-05-01-preview";

// Check env variables
if (!azureOpenAIKey || !azureOpenAIEndpoint) {
    throw new Error("Please set AZURE_OPENAI_KEY and AZURE_OPENAI_ENDPOINT in your environment variables.");
}

// Get Azure SDK client
const getClient = () => {
    const assistantsClient = new AzureOpenAI({
        endpoint: azureOpenAIEndpoint,
        apiVersion: azureOpenAIVersion,
        apiKey: azureOpenAIKey,
    });
    return assistantsClient;
};

const assistantsClient = getClient();

const options = {
    model: "gpt-4o", // replace with model deployment name
    name: "Preventive Drug Education",
    instructions: "Help generate promotional preventive drug education materials based on the target audience specified. Split content into separate sections, each containing text and descriptions of accompanying images.",
    tools: [{"type":"file_search"}],
    
    tool_resources: {"file_search":{"vector_store_ids":[]}},
    temperature: 0.5,
    top_p: 1
};


export const runAssistant = async (message: string): Promise<string> => {
    try {
        const assistantResponse = await assistantsClient.beta.assistants.create(options);
        const assistantThread = await assistantsClient.beta.threads.create({});
        await assistantsClient.beta.threads.messages.create(assistantThread.id, {
            role: 'user',
            content: message,
        });

        const runResponse = await assistantsClient.beta.threads.runs.create(assistantThread.id, {
            assistant_id: assistantResponse.id,
        });

        let runStatus = runResponse.status;
        while (runStatus === 'queued' || runStatus === 'in_progress') {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const runStatusResponse = await assistantsClient.beta.threads.runs.retrieve(assistantThread.id, runResponse.id);
            runStatus = runStatusResponse.status;
        }

        if (runStatus === 'completed') {
            const messagesResponse = await assistantsClient.beta.threads.messages.list(assistantThread.id);
            return messagesResponse.map((message) => message.content).join(' ');
        } else {
            return 'Run failed or not completed';
        }
    } catch (error) {
        console.error('Error running assistant:', error);
        throw new Error('Assistant error');
    }
};
