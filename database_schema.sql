-- 1. DROP EXISTING TABLES (Reset)
DROP TABLE IF EXISTS "Feedback";
DROP TABLE IF EXISTS "SystemActivity";
DROP TABLE IF EXISTS "ResumeLog";
DROP TABLE IF EXISTS "LoginHistory";
DROP TABLE IF EXISTS "User";

-- 2. CREATE USER TABLE (Matches Commit 3139fcf)
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL, -- Mandatory in this version
    "name" TEXT,
    "phone" TEXT,
    "profileImage" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    
    "plan" TEXT NOT NULL DEFAULT 'NONE',
    "hasFullAccess" BOOLEAN NOT NULL DEFAULT false,
    "creditsUsed" INTEGER NOT NULL DEFAULT 0,
    "subscriptionExpires" TIMESTAMP(3),
    
    "dailyResumeCount" INTEGER NOT NULL DEFAULT 0,
    "dailyResumeLimit" INTEGER NOT NULL DEFAULT 70, -- Was 70 in this commit
    "lastResumeDate" TIMESTAMP(3),
    
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- Create Unique Index for Email
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- 3. OTHER TABLES (Standard)
CREATE TABLE "LoginHistory" (
    "id" TEXT NOT NULL, "userId" TEXT NOT NULL, "loginAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "ipAddress" TEXT, CONSTRAINT "LoginHistory_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ResumeLog" (
    "id" TEXT NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "jobTitle" TEXT, "companyName" TEXT, "matchScore" INTEGER, "originalName" TEXT, "userEmail" TEXT, "userId" TEXT, "status" TEXT NOT NULL DEFAULT 'SUCCESS', "isFavorite" BOOLEAN NOT NULL DEFAULT false, CONSTRAINT "ResumeLog_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "SystemActivity" (
    "id" TEXT NOT NULL, "userId" TEXT NOT NULL, "action" TEXT NOT NULL, "details" TEXT, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "SystemActivity_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL, "userId" TEXT NOT NULL, "rating" INTEGER NOT NULL, "category" TEXT NOT NULL, "message" TEXT NOT NULL, "status" TEXT NOT NULL DEFAULT 'PENDING', "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- 4. CONSTRAINTS
ALTER TABLE "LoginHistory" ADD CONSTRAINT "LoginHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "ResumeLog" ADD CONSTRAINT "ResumeLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "SystemActivity" ADD CONSTRAINT "SystemActivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
