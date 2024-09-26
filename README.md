The Iron Wall is a web interface powered by generative AI that enables users to create educational posters, videos, emails, and infographics focused on drug prevention. This tool is designed to help the Central Narcotics Bureau (CNB) spread awareness and educate communities about the dangers of drug use through engaging and impactful media.

## Features 
- Easy to use one page form where users can select resource type/format, target audience, and reasons that people use drugs (to better pinpoint the different root causes and come out with catered solutions to counter them).
- Custom fields for target audience and reasons that people use drugs that will be saved in a dropdown list when a file is generated with them. The dropdown list is available for all users to use in the future.
- Makes use of Azure OpenAI Assistant which has system instructions shown in the figure below to make the output consistent with fewer hallucinations.
  
  ![image](https://github.com/user-attachments/assets/0046622a-3b50-463d-a24c-f2c9a314e2ba)
- The form also has a multiple file uploader component that allows users to upload reference materials. These materials will have their filenames labelled based on target audience and resource format chosen when uploaed into the chatbot's vector file search storage to allow it to reference more relevant materials. The uploaded materials are by all users which allows for greater reliability due to a larger database in the long term. 
  ![image](https://github.com/user-attachments/assets/11c8b48f-67aa-44ab-875d-f058608719d2)
  **The uploaded files are automatically added into the vector file search**
  
  ![image](https://github.com/user-attachments/assets/42c37468-7c1d-4966-ab8e-d25036675732)
  **Sample chatbot output**
  
  ![image](https://github.com/user-attachments/assets/942914ce-e512-427c-b88e-e5a19b4c2208)
  **Existing CNB infographic which the chatbot took reference from**

- Rich text editor that displays the selected PDF generated by the user and has large customizability and formatting options and download/export functionality, including a button to regenerate images.
- PDF display page (similar to Canva or Google Drive homepage) where users can view their own generated PDFs or those shared with them and choose which ones to edit. The PDFs will be updated across all user accounts with share access when one user updates it. This allows ease of collaboration online between DrugFreeSG Champions and also CNB staff, which is one of the main reasons why apps like Google Docs are popular.
- Chain of thought prompting based on proven techniques which allows the chatbot to use its own generated knowledge to prevent hallucinations and give better and consistent responses (Not integrated with the app yet)



## To run the application

1. Install the node modules:
```bash
npm install
```

2. Set up environment variables by creating a new file named .env in the root directory and copying the code below (replace endpoint and api_key with your own Azure OpenAI account endpoint and API key respectively):
```env
AZURE_OPENAI_ENDPOINT=endpoint
AZURE_OPENAI_API_KEY=api_key

# This API key is my individual key (Isa Bin Mohamed Yamin) and premium features available till Oct 7, 2024
NEXT_PUBLIC_TINYMCE_API_KEY="gx6fx50hvmguud2inxshqdkfx8qi1qy2bqtcip6slgm8qmif"
```

3. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## To contribute

1. Run `git pull origin main` to fetch and merge latest changes from the remote repository into your local repository.
2. Create a new branch with the following naming convention `feature/[YOUR-FEATURE]`.
3. After staging and committing changes, push to upstream with `git push -u origin feature/[YOUR-FEATURE]`.
