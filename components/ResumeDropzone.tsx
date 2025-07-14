import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Label } from "@/components/ui/label";

type Props = {
    onFileAccepted: (file: File) => void;
    selectedFile: File | null;
};

export default function ResumeDropzone({ onFileAccepted, selectedFile }: Props) {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            onFileAccepted(acceptedFiles[0]);
        }
    }, [onFileAccepted]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "application/pdf": [".pdf"] },
        multiple: false,
    });

    return (
        <div className="space-y-2">
            <Label>Upload Resume PDF</Label>
            <div
                {...getRootProps()}
                className="border-2 border-dashed border-gray-400 rounded-md p-4 text-center cursor-pointer hover:bg-gray-100 transition"
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the PDF here...</p>
                ) : selectedFile ? (
                    <p className="text-sm text-gray-600">✅ Uploaded: {selectedFile.name}</p>
                ) : (
                    <p className="text-sm text-gray-600">Drag and drop a PDF, or click to select</p>
                )}
            </div>
        </div>
    );
}
