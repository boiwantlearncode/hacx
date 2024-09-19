const { AzureOpenAI } = require('openai');

// Get environment variables
const azureOpenAIKey = process.env.AZURE_OPENAI_API_KEY;
const azureOpenAIEndpoint = process.env.AZURE_OPENAI_ENDPOINT;
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
    model: "GenAI", // replace with model deployment name
    name: "Preventive Drug Education",
    instructions: "Help generate promotional preventive drug education materials based on the target audience specified. I want the output to be a JSON object which I can directly reference and perform JSON.parse(output) to get an object. It must have the following keys: Title, Introduction, SectionTitle1, SectionContent1, Conclusion. Select a random number, x, from 5 to 8, and generate x number of sections -- number them accordingly. Do not insert source or references.",
    tools: [{"type":"file_search"}],
    
    tool_resources: {"file_search":{"vector_store_ids":["vs_ahwovNoykUNt0WiRX3NDXlwg"]}},
    temperature: 0.5,
    top_p: 1
};

const setupAssistant = async () => {
    try {
        const assistantResponse = await assistantsClient.beta.assistants.create(options);
        console.log(`Assistant created: ${JSON.stringify(assistantResponse)}`);
    } catch (error: any) {
        console.error(`Error creating assistant: ${error.message}`);
    }
};

setupAssistant();


const role = "user";

export const runAssistant = async (message: string) => {
    try {
        // Create an assistant
        const assistantResponse = await assistantsClient.beta.assistants.create(options);
        console.log(`Assistant created: ${JSON.stringify(assistantResponse)}`);

        // Create a thread
        const assistantThread = await assistantsClient.beta.threads.create({});
        console.log(`Thread created: ${JSON.stringify(assistantThread)}`);

        // Add a user question to the thread
        const threadResponse = await assistantsClient.beta.threads.messages.create(
            assistantThread.id,
            {
                role,
                content: message,
            }
        );
        console.log(`Message created: ${JSON.stringify(threadResponse)}`);

        // Run the thread and poll it until it is in a terminal state
        const runResponse = await assistantsClient.beta.threads.runs.create(
            assistantThread.id,
            {
                assistant_id: assistantResponse.id,
            }
        );
        console.log(`Run started: ${JSON.stringify(runResponse)}`);

        // Polling until the run completes or fails
        let runStatus = runResponse.status;
        while (runStatus === 'queued' || runStatus === 'in_progress') {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const runStatusResponse = await assistantsClient.beta.threads.runs.retrieve(
                assistantThread.id,
                runResponse.id
            );
            runStatus = runStatusResponse.status;
            console.log(`Current run status: ${runStatus}`);
        }

        // Get the messages in the thread once the run has completed
        if (runStatus === 'completed') {
            const messagesResponse = await assistantsClient.beta.threads.messages.list(
                assistantThread.id
            );
            const resulting_text = JSON.stringify(messagesResponse["body"]["data"][0]["content"][0]["text"]["value"])
            console.log(`Messages in the thread: ${resulting_text}`);
            return resulting_text;
        } else {
            console.log(`Run status is ${runStatus}, unable to fetch messages.`);
        }
    } catch (error: any) {
        console.error(`Error running the assistant: ${error.message}`);
    }
};