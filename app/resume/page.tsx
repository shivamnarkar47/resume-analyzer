'use client';

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import ResumeDropzone from "@/components/ResumeDropzone";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const FEEDBACK_CACHE_KEY = "resume_feedback_cache";


export default function ResumeAnalyzerPage() {
    const [jobRole, setJobRole] = useState('');
    const [feedback, setFeedback] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        const cached = localStorage.getItem(FEEDBACK_CACHE_KEY);
        if (cached) {
            const parsed = JSON.parse(cached);
            setFeedback(parsed.feedback || "");
            setJobRole(parsed.jobRole || "");
        }
    }, []);

    useEffect(() => {
        if (!feedback) return;
        localStorage.setItem(
            FEEDBACK_CACHE_KEY,
            JSON.stringify({
                feedback,
                jobRole,
                timestamp: Date.now(),
            })
        );
    }, [feedback]);

    const handleAnalyze = async () => {
        setIsLoading(true);
        if (selectedFile && selectedFile.size > 5_000_000) {
            alert("PDF too large. Please keep under 5MB.");
            return;
        }

        const formData = new FormData();
        formData.append("jobRole", jobRole);
        if (selectedFile) formData.append("file", selectedFile);

        const res = await fetch("/api/analyze", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        setFeedback(data.feedback || "No feedback found.");
        setIsLoading(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto p-4 pt-36 space-y-6"
        >
            <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold"
            >
                Resume Quality Analyzer
            </motion.h1>

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
            >
                <Card>
                    <CardContent className="p-4 space-y-4">
                        <ResumeDropzone selectedFile={selectedFile} onFileAccepted={setSelectedFile} />

                        <Label>Select Job Role</Label>
                        <Select onValueChange={(value) => setJobRole(value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Choose role..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Software Developer">Software Developer</SelectItem>
                                <SelectItem value="Data Analyst">Data Analyst</SelectItem>
                                <SelectItem value="Product Manager">Product Manager</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button onClick={handleAnalyze} disabled={isLoading} className="hover:text-indigo-200 bg-indigo-600 text-white hover:bg-indigo-800 transition flex items-center gap-1">
                            {isLoading ? "Analyzing..." : "Analyze Resume"}
                        </Button>
                    </CardContent>
                </Card>
            </motion.div>
            {
                isLoading && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Card>
                            <CardContent className="p-4 space-y-3">
                                <div className="flex gap-x-3 items-center"> <Sparkles className="w-5 h-5 text-indigo-600 animate-bounce" /> <p className="animate-pulse"> Your resume is being processed...</p></div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )
            }
            {(!isLoading && feedback) && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <Card>
                        <CardContent className="p-4 space-y-3">
                            <h2 className="text-xl font-semibold mb-2">Resume Feedback</h2>
                            <ReactMarkdown>
                                {feedback}
                            </ReactMarkdown>
                        </CardContent>
                    </Card>
                </motion.div>
            )}
        </motion.div>
    );
}
