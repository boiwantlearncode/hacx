async function ChatBotResponse(input: string, target: string, attachments: File[] | null) {
  console.log("ChatBotResponse called!")
  if (attachments && attachments.length > 0) {
    try {
      const formData = new FormData();
      formData.append('audience', target);

      // Loop through each file and append to formData
      for (let i = 0; i < attachments.length; i++) {
        formData.append('files', attachments[i], attachments[i].name);
      }

      const uploadResponse = await fetch('../api/uploader', { // Ensure the correct API route
        method: 'POST',
        body: formData, // Use FormData for file uploads
      });

      if (!uploadResponse.ok) {
        throw new Error(`HTTP error! status: ${uploadResponse.status}`);
      }

      // Check if the response has content before trying to parse it
      const uploadResponseText = await uploadResponse.text();
      if (!uploadResponseText) {
        throw new Error('Empty response from server');
      }
      console.log('Files uploaded successfully!');
    } catch (error: any) {
      throw Error('Error uploading files:', error)
    }
  }

  try {
    const response = await fetch('../api/chatbot', { // Ensure the correct API route
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: input, audience: target }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Check if the response has content before trying to parse it
    const responseText = await response.text();

    if (!responseText) {
      throw new Error('Empty response from server');
    }

    // Parse the response as JSON
    const data = JSON.parse(responseText).message;
    // console.log(data);
    return data;
  } catch (error) {
    console.error('Error parsing JSON or fetching data:', error);
  }
}

async function GenerateImage(input: string) {
  console.log(input)
  try {
    const response = await fetch('../api/imager', { // Ensure the correct API route
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: input }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Check if the response has content before trying to parse it
    const responseText = await response.text();
    if (!responseText) {
      throw new Error('Empty response from server');
    }

    const data = JSON.parse(responseText).message;
    return data;
  } catch (error) {
    console.error('Error parsing JSON or fetching data:', error);
  }
}

async function BundleInputs(format: string, audience: string, customAudience: string, reason: string, attachments: File[] | null, setImagePrompt: (imagePrompt: string) => void) {

  // console.log over here look at browser!!!
  const prompt: string = `
    Consider the following information and generate the necessary materials that is appropriate for all the target audience listed.
    You should consider the background of the target audience and the potential ways they might get involved in drug usage, and address these issues in your response.
    Target audience: ${audience === "Custom (Specify)" ? customAudience : audience}
    Reasons the target audience use drugs: ${reason || "NIL"}
  `
    .split('\n')
    .map(line => line.trim())
    .join('\n')
    .trim();

  const _imagePrompt: string = `
    When you generate images, you tend to generate inappropriate text. So, generating an image without text is always preferred. Generate an image that is appropriate to the target audience: ${audience === "Custom (Specify)" ? customAudience : audience}. Also, the image must be releated to the reasons the target audience use drugs which is described as follows: ${reason || "NIL"}.
  `
    .split('\n')
    .map(line => line.trim())
    .join('\n')
    .trim();

  setImagePrompt(_imagePrompt);

  switch (format) {
    case "Info Package": // Only one we have implemented
      console.log(prompt);
      const imagesString = (await GenerateImage(_imagePrompt))
                            .map((url: string) => `<img src="${url}" alt="Generated Image" height="240">`).join('<br>');
      const generatedText = (await ChatBotResponse(prompt, audience, attachments)).replaceAll('\n', '<br>');
      console.log("Generated text: ", generatedText);
      return `${imagesString}<br /><br />${generatedText}`;
    case "Poster":
      console.log("In construction");
      break;
    case "Resource Toolkit":
      console.log("In construction");
      break;
    case "Article":
      console.log("In construction");
      break;
    case "Email":
      console.log("In construction");
      break;
    case "Video":
      console.log("In construction");
      break;
  }
}

export {ChatBotResponse, GenerateImage, BundleInputs};