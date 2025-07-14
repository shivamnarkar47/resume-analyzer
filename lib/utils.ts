import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// import * as pdfjsLib from "pdfjs-dist";
// import workerSrc from "pdfjs-dist/build/pdf.worker.entry";

// Set worker

// export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
//   // const pdfjsLib = await import("pdfjs-dist");
//   // const workerSrc = await import("pdfjs-dist/build/pdf.worker.min.mjs");

//   // // Set worker for pdfjs
//   // pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc.default;

//   // const loadingTask = pdfjsLib.getDocument({ data: buffer });
//   // const pdf = await loadingTask.promise;

//   // let fullText = "";
//   // for (let i = 1; i <= pdf.numPages; i++) {
//   //   const page = await pdf.getPage(i);
//   //   const content = await page.getTextContent();
//   //   const pageText = content.items.map((item: any) => item.str).join(" ");
//   //   fullText += `\n${pageText}`;
//   // }

//   // return fullText; 

//   const data = await pdfParse(buffer);
//   return data.text;
// }

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
