const { OpenAIClient } = require("@azure/openai");
const { AzureKeyCredential } = require("@azure/core-auth");

const endpoint = "https://genai111111.openai.azure.com/";
//process.env.AZURE_ENDPOINT;
const azureApiKey = "ac957d94e99940f0b9f894ba98e1c4c3";
//process.env.AZURE_API_KEY;
console.log(azureApiKey);
            
export default async function GenerateImage(prompt: string) {
    const n = 1;
    const size = "1024x1024";
    console.log("== Batch Image Generation ==");
  
    const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
    const deploymentName = "dall-e-3";
    const results = await client.getImages(deploymentName, prompt, { n, size });
  
    for (const image of results.data) {
      console.log(`Image generation result URL: ${image.url}`);
    }
}
