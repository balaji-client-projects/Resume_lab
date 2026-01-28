
import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/app/lib/auth";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { prisma } from "@/app/lib/prisma";

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function POST(request: NextRequest) {
    console.log("========== /api/generate-resume (REST ID) ==========");

    try {
        console.log("🔄 Parsing form data...");
        const formData = await request.formData();

        const companyName = formData.get("companyName") as string || "ResumeLab";
        const jobTitle = formData.get("jobTitle") as string || "Candidate Application";
        const jobDescription = formData.get("jobDescription") as string | null;
        const file = formData.get("resume") as unknown as File | null;

        if (!jobDescription || !file) {
            return NextResponse.json({
                error: "Missing job description or resume file",
            }, { status: 400 });
        }

        // Extract text from DOCX
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        let resumeText = "";
        try {
            const zip = new PizZip(buffer);
            const xml = zip.files["word/document.xml"].asText();
            resumeText = xml.replace(/<[^>]+>/g, " ");
        } catch (e) {
            console.error("Text extraction failed:", e);
            resumeText = "Could not extract text. Analyze based on placeholders if present.";
        }

        // Generate AI content
        const promptText = `You are an expert ATS (Applicant Tracking System) Scanner and Professional Resume Writer.

Your task is to:
1. READ the Job Description and the Resume Content below.
2. CALCULATE a REAL Match Score (0-100) based on strict keyword matching and experience alignment.
3. GENERATE highly effective, optimized content for the SPECIFIC placeholders listed below.

JOB DESCRIPTION:
${jobDescription}

RESUME CONTENT (Extracted Text):
${resumeText.substring(0, 10000)}

RESUME FILE NAME: ${file.name}

CRITICAL RULES:
- **SCORING REALITY**: Be **CONSERVATIVE/PESSIMISTIC** with your score. Real ATS scanners (like Jobscan) are brutal. If you predict 95%, the real score is likely 85%. Therefore, **Calculate the score strictly**, enabling penalties for any minor keyword mismatch. Aim for a score that aligns with a "Strict Parser".
- **WRITING STYLE**: Use a "Humanoid" professional tone. The content must sound like it was written by a skilled human professional, not an AI. Avoid robotic phrasing, repetitive structures, or generic fluff.
- **NO DIRECT COPYING**: DO NOT copy points directly from the Job Description. You must SYNTHESIZE the Job Description requirements with the Resume's existing experience. The goal is to show *how* the candidate meets the requirement, not just state the requirement.
- **KEYWORD OPTIMIZATION**: Aggressively integrate keywords from the Job Description to ensure a high ATS score, but weave them NATURALLY into the achievements.
- **HIGHLIGHTING**: Emphasize critical keywords by using **Title Case** (e.g. "Strategic Planning" instead of "strategic planning"). DO NOT use markdown like ** or __. Plain text only.
- **MATCH SCORE TARGET**: The generated content MUST be optimized to achieve an ATS Score of **85% to 95%**.
- **MANDATORY COMPLETENESS**: The template ALWAYS has 6 bullet points for ALL jobs (exp1 to exp5). You MUST generate 6 distinct, strong, and specific bullet points for EVERY job found in the resume. If simple extraction isn't enough, INFER relevant skills and achievements that would be expected for that role and align them with the Job Description.
- "exp2" refers to the MOST RECENT job. "exp1" refers to the PREVIOUS job. "exp3", "exp4", "exp5" follow in reverse chronological order.

REQUIRED JSON OUTPUT FORMAT (Strict Keys):
{
  "matchScore": (Integer 0-100),
  "resumeSummary": "Professional summary paragraph...",
  "missingKeywords": ["keyword1", "keyword2"],
  "insightsAndRecommendations": ["advice1", "advice2"],
  "replacements": {
      "summary_bullet_1": "Strong achievement...",
      "summary_bullet_2": "...",
      "summary_bullet_3": "...",
      "summary_bullet_4": "...",
      "summary_bullet_5": "...",
      "summary_bullet_6": "...",
      "summary_bullet_7": "...",

      "exp2_bullet_1": "Job 1 (Most Recent) Bullet 1...",
      "exp2_bullet_2": "Job 1 Bullet 2...",
      "exp2_bullet_3": "Job 1 Bullet 3...",
      "exp2_bullet_4": "Job 1 Bullet 4...",
      "exp2_bullet_5": "Job 1 Bullet 5...",
      "exp2_bullet_6": "Job 1 Bullet 6...",
      "exp2_achievement_1": "Key Win...",
      "exp2_achievement_2": "Key Win...",

      "exp1_bullet_1": "Job 2 Bullet 1...",
      "exp1_bullet_2": "Job 2 Bullet 2...",
      "exp1_bullet_3": "Job 2 Bullet 3...",
      "exp1_bullet_4": "Job 2 Bullet 4...",
      "exp1_bullet_5": "Job 2 Bullet 5...",
      "exp1_bullet_6": "Job 2 Bullet 6...",
      "exp1_achievement_1": "Key Win...",
      "exp1_achievement_2": "Key Win...",

      "exp3_bullet_1": "Job 3 Bullet 1 (If exists, else empty)...",
      "exp3_bullet_2": "Job 3 Bullet 2...",
      "exp3_bullet_3": "Job 3 Bullet 3...",
      "exp3_bullet_4": "Job 3 Bullet 4...",
      "exp3_bullet_5": "Job 3 Bullet 5...",
      "exp3_bullet_6": "Job 3 Bullet 6...",
      "exp3_achievement_1": "Key Win...",
      "exp3_achievement_2": "Key Win...",

      "exp4_bullet_1": "Job 4 Bullet 1 (If exists, else empty)...",
      "exp4_bullet_2": "Job 4 Bullet 2...",
      "exp4_bullet_3": "Job 4 Bullet 3...",
      "exp4_bullet_4": "Job 4 Bullet 4...",
      "exp4_bullet_5": "Job 4 Bullet 5...",
      "exp4_bullet_6": "Job 4 Bullet 6...",
      "exp4_achievement_1": "Key Win...",
      "exp4_achievement_2": "Key Win...",
      
      "exp5_bullet_1": "Job 5 Bullet 1 (If exists, else empty)...",
      "exp5_bullet_2": "Job 5 Bullet 2...",
      "exp5_bullet_3": "Job 5 Bullet 3...",
      "exp5_bullet_4": "Job 5 Bullet 4...",
      "exp5_bullet_5": "Job 5 Bullet 5...",
      "exp5_bullet_6": "Job 5 Bullet 6...",
      "exp5_achievement_1": "Key Win...",
      "exp5_achievement_2": "Key Win..."
  }
}

Respond ONLY with valid JSON.`;

        // IMPLEMENTATION: OpenAI GPT-4o-mini (Stable & Fast)
        const MODEL_NAME = "gpt-4o-mini";
        const API_KEY = process.env.OPENAI_API_KEY;
        const URL = "https://api.openai.com/v1/chat/completions";

        if (!API_KEY) {
            console.error("❌ OPENAI_API_KEY is missing!");
            return NextResponse.json({
                error: "Server Configuration Error",
                details: "OpenAI API Key is not configured."
            }, { status: 500 });
        }

        console.log(`🌐 Calling OpenAI API: ${MODEL_NAME}`);

        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: MODEL_NAME,
                messages: [
                    {
                        role: "system",
                        content: "You are an expert ATS Resume Optimizer. You always output valid JSON."
                    },
                    {
                        role: "user",
                        content: promptText
                    }
                ],
                response_format: { type: "json_object" }, // Guarantees JSON output
                temperature: 0.2,
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`❌ OpenAI API Error: ${response.status}`, errorText);

            return NextResponse.json({
                error: `OpenAI API Error (${response.status})`,
                details: `Failed to generate resume content. OpenAI says: ${errorText}`
            }, { status: response.status });
        }

        const data = await response.json();
        let analysis: any = null;

        try {
            const content = data.choices?.[0]?.message?.content;
            if (!content) throw new Error("No content returned from OpenAI");

            console.log("📄 OpenAI Response received");
            analysis = JSON.parse(content);
            console.log("✅ Resume generated successfully!");

        } catch (parseError: any) {
            console.error("❌ JSON Parse Failed:", parseError);
            return NextResponse.json({
                error: "Invalid JSON response from AI",
                details: `AI returned invalid data: ${parseError.message}`
            }, { status: 500 });
        }

        // Apply changes to DOCX
        let outputBuffer = buffer;
        try {
            const zip = new PizZip(buffer);
            const doc = new Docxtemplater(zip, {
                paragraphLoop: true,
                linebreaks: true,
                delimiters: { start: '{{', end: '}}' },
                nullGetter: (part) => { return ""; } // Replaces {{undefined}} or {{null}} with empty string
            });

            // Clean replacements (remove nulls/undefined and strip markdown)
            const cleanReplacements: Record<string, any> = { ...analysis.replacements };
            if (cleanReplacements) {
                Object.keys(cleanReplacements).forEach(key => {
                    let val = cleanReplacements[key];
                    if (typeof val === 'string') {
                        // Strip markdown bold/italic/code markers if any remain
                        val = val.replace(/\*\*/g, '').replace(/__/g, '').replace(/`/g, '');
                        cleanReplacements[key] = val;
                    }
                    if (!val) cleanReplacements[key] = "";
                });
            }

            doc.render(cleanReplacements || {});

            outputBuffer = Buffer.from(doc.getZip().generate({
                type: "nodebuffer",
                compression: "DEFLATE",
            }) as any);
        } catch (docxError: any) {
            console.error("Docxtemplater Error:", docxError);
            // Continue even if template replacement fails partially
        }

        // Fetch user and check subscription
        let userEmail = "Anonymous";
        let userName = "User";
        let userId: string | null = null;

        try {
            const sessionUserId = await getUserId();
            if (sessionUserId) {
                const user = await prisma.user.findUnique({ where: { id: sessionUserId } });
                if (user) {
                    userEmail = user.email;
                    userName = user.name || user.email.split('@')[0];
                    userId = user.id;

                    // Check full access
                    if (!(user as any).hasFullAccess) {
                        return NextResponse.json({
                            error: "Access Restricted",
                            message: "Your account is approved but doesn't have resume generation access yet."
                        }, { status: 403 });
                    }

                    // Logic for Reset (Pro = Daily, Free = Every 60 Days)
                    const isPro = user.plan === 'PRO';

                    const today = new Date();
                    today.setHours(0, 0, 0, 0);

                    const lastDate = user.lastResumeDate ? new Date(user.lastResumeDate) : null;
                    if (lastDate) lastDate.setHours(0, 0, 0, 0);

                    let shouldReset = false;

                    if (!lastDate) {
                        shouldReset = true;
                    } else if (isPro) {
                        // PRO: Reset every new day
                        shouldReset = lastDate < today;
                    } else {
                        // FREE: Reset only if it has been 60 days since the last resume
                        // (Approx 2 months testing window)
                        const diffTime = Math.abs(today.getTime() - lastDate.getTime());
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        shouldReset = diffDays >= 60;
                    }

                    if (shouldReset) {
                        await prisma.user.update({
                            where: { id: userId },
                            data: { dailyResumeCount: 0, lastResumeDate: today }
                        });
                    }

                    const PRO_LIMIT = 50;
                    const FREE_LIMIT = 5;

                    const currentLimit = isPro ? PRO_LIMIT : FREE_LIMIT;

                    const currentUsage = shouldReset ? 0 : user.dailyResumeCount;

                    if (currentUsage >= currentLimit) {
                        const message = isPro
                            ? "You have reached your daily PRO limit of 50 resumes."
                            : "Your free limit is completed (5/5). You need to upgrade the plan to generate more.";

                        return NextResponse.json({
                            error: message,
                            title: "Daily Limit Exceeded"
                        }, { status: 403 });
                    }
                }
            }
        } catch (authError) {
            console.error("Auth Error", authError);
        }

        // Database logging and credits deduction
        try {
            if (userId) {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                await prisma.user.update({
                    where: { id: userId },
                    data: {
                        creditsUsed: { increment: 1 },
                        dailyResumeCount: { increment: 1 },
                        lastResumeDate: today
                    }
                });
            }

            await prisma.resumeLog.create({
                data: {
                    jobTitle, companyName, matchScore: analysis.matchScore || 0,
                    originalName: file.name, userEmail, userId, status: "SUCCESS",
                    fileData: outputBuffer.toString("base64")
                }
            });
        } catch (dbError) {
            console.warn("DB Log Error", dbError);
        }

        const sanitize = (str: string) => str.replace(/[^a-zA-Z0-9]/g, '_');
        const customFileName = `${sanitize(userName)}_${sanitize(companyName)}_${sanitize(jobTitle)}_resume.docx`;

        return NextResponse.json({
            success: true,
            analysis,
            fileData: outputBuffer.toString("base64"),
            fileName: customFileName,
        });

    } catch (error: any) {
        console.error("❌ Fatal Error:", error);
        return NextResponse.json({
            error: "Failed to generate resume",
            message: error.message,
        }, { status: 500 });
    }
}
