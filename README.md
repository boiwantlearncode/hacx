The Iron Wall is a web interface powered by generative AI that enables users to create educational posters, videos, emails, and infographics focused on drug prevention. This tool is designed to help the Central Narcotics Bureau (CNB) spread awareness and educate communities about the dangers of drug use through engaging and impactful media.

## To run the application

1. Install the node modules:
```bash
npm install
```

2. Set up environment variables:
```env
AZURE_OPENAI_ENDPOINT="https://genai111111.openai.azure.com/"
AZURE_OPENAI_IMAGE_ENDPOINT="https://genai111111.openai.azure.com/openai/deployments/Dalle3/images/generations?api-version=2024-02-01"
AZURE_OPENAI_API_KEY="ac957d94e99940f0b9f894ba98e1c4c3"

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
