// import { NextResponse } from "next/server";
// import { extractTextFromPDF } from "@/lib/utils";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// export async function POST(req: Request) {
//     try {
//         const formData = await req.formData();
//         const jobRole = formData.get("jobRole") as string;
//         const file = formData.get("file") as File | null;
//         const manualText = formData.get("resumeText") as string | null;

//         let resumeText = "";

//         // 🔍 Extract PDF text
//         if (file) {
//             const arrayBuffer = await file.arrayBuffer();
//             const buffer = Buffer.from(arrayBuffer);
//             resumeText = await extractTextFromPDF(buffer);
//         } else if (manualText) {
//             resumeText = manualText;
//         }

//         if (!resumeText || !jobRole) {
//             return NextResponse.json({ error: "Missing resume or role" }, { status: 400 });
//         }

//         // 🤖 Setup Gemini
//         const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
//         const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//         const prompt = `
// You're a professional resume reviewer.
// Analyze this resume for the role of "${jobRole}".
// Return:
// 1. Score out of 100
// 2. 3 major improvements
// 3. Section-wise feedback (Summary, Education, Projects, Skills, Experience)
// 4. Missing or weak keywords

// Resume:
// """
// ${resumeText}
// """`;

//         const result = await model.generateContent(prompt);
//         const response = result.response.text();

//         return NextResponse.json({ feedback: response });
//     } catch (err: any) {
//         console.error("Resume analysis error:", err);
//         return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//     }
// }

"use server"

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;
        const role = formData.get("jobRole") as string;

        if (!file && !role) {
            return Response.json({ error: "No file or URL provided." }, { status: 400 });
        }

        let buffer: Buffer;

        // 🧾 PDF from upload
        if (file) {
            const arrayBuffer = await file.arrayBuffer();
            buffer = Buffer.from(arrayBuffer);
        }

        // 🌐 PDF from URL
        else {
            return Response.json({ error: "Unable to read PDF" }, { status: 400 });
        }

        // 🤖 Setup Gemini
        const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
        const model = ai.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

        const contents = [
            {
                role: "user",
                parts: [{ text: `You're a resume reviewer. Analyze this resume for a ${role} role. Give:\n1. Score out of 100\n2. 3 major improvements\n3. Section-wise feedback\n4. Missing keywords.` }],
            },
            {
                role: "user",
                parts: [
                    {
                        inlineData: {
                            mimeType: "application/pdf",
                            data: buffer.toString("base64"),
                        },
                    },
                ],
            },
        ];

        const result = await model.generateContent({ contents });
        const responseText = result.response.text();

        return Response.json({ feedback: responseText });
    } catch (err: any) {
        console.error("Gemini PDF Analysis Error:", err);
        return Response.json({ error: "Failed to analyze PDF" }, { status: 500 });
    }
}
