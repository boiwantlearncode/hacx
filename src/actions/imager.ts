const { AzureOpenAI } = require('openai');

// Get environment variables
const azureOpenAIKey = process.env.AZURE_OPENAI_API_KEY;
const azureOpenAIEndpoint = process.env.AZURE_OPENAI_ENDPOINT;
const azureOpenAIVersion = "2024-05-01-preview";
const deploymentName = "Dalle3"

// Check environment variables
if (!azureOpenAIKey || !azureOpenAIEndpoint) {
    throw new Error("Please set AZURE_OPENAI_API_KEY and AZURE_OPENAI_ENDPOINT in your environment variables.");
}

// Get Azure SDK client
const getClient = () => {
    const imageClient = new AzureOpenAI({
        endpoint: azureOpenAIEndpoint,
        apiVersion: azureOpenAIVersion,
        apiKey: azureOpenAIKey,
        deployment: deploymentName,
    });
    return imageClient;
};

const imageClient = getClient();

// Function to generate images
export const generator = async (prompt: string, n: number = 1, size: string = "1024x1024", quality: string = "hd", style: string = "natural") => {
    try {
        console.log("== Generating Images ==");
        console.log("Prompt: ", prompt);

        // Request for image generation
        const results = await imageClient.images.generate({
            deploymentName,
            prompt,
            n,
            size,
            quality,
            style,
            contentFilter: {
                severity: "high"
            }
        });

        const generatedImages = results.data.map((image: any) => image.url);
        
        console.log(`Generated Image URLs: ${generatedImages}`);
        return generatedImages;
    } catch (error: any) {
        console.error(`Error generating images: ${error.message}`);
    }
};
