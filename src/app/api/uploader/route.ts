import { NextRequest, NextResponse } from 'next/server';
import { uploadFiles } from '../../../actions/chatbot';

type AssistantResponse = {
    response: string;
}

export async function POST(req: NextRequest, res: NextResponse<AssistantResponse | { error: string }>) {
    if (req.method === 'POST') {
        console.log("POST request has been made.");

        try {
            const formData = await req.formData();  // Use formData to handle files

            const audience = formData.get('audience')?.toString();  // Get 'audience' from the formData
            const formFiles = formData.getAll('files');  // Get the 'files' from the formData

            // Filter out any non-File values from formData
            const files = formFiles.filter((entry): entry is File => entry instanceof File);

            if (!files || files.length === 0) {
                return NextResponse.json(
                    { status: 400, error: 'No files were uploaded' },
                );
            }

            // Pass the files and audience to the uploadFiles function
            if (!audience) {
                return NextResponse.json(
                    { status: 400, error: 'Audience is required' },
                );
            }

            const uploadResponse = await uploadFiles(files, audience);

            return NextResponse.json(
                { message: uploadResponse },
                { status: 200 }
            );
        } catch (error) {
            console.error('Error processing request:', error);
            return NextResponse.json(
                { status: 500, error: 'Failed to process request' }
            );
        }
    } else {
        return NextResponse.json(
            { message: `Method ${req.method} Not Allowed` },
            { status: 405, headers: { "Allow": "POST" } },
        );
    }
}
