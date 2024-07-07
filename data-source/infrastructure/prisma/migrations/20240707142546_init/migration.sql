-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "leverage" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Budget" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Budget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BudgetHistory" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "diff" INTEGER NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BudgetHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommitHistory" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "commitCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommitHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Betting" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "raceId" INTEGER NOT NULL,

    CONSTRAINT "Betting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BettingDetail" (
    "id" SERIAL NOT NULL,
    "bettingId" INTEGER NOT NULL,
    "horse1" INTEGER NOT NULL,
    "horse2" INTEGER,
    "horse3" INTEGER,
    "result" TEXT NOT NULL,

    CONSTRAINT "BettingDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Race" (
    "id" SERIAL NOT NULL,
    "raceName" TEXT NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Race_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Horse" (
    "id" SERIAL NOT NULL,
    "raceId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "jockeyName" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Horse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GithubUser" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "githubUserId" TEXT NOT NULL,

    CONSTRAINT "GithubUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Repository" (
    "id" SERIAL NOT NULL,
    "githubUserId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Repository_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Budget_userId_key" ON "Budget"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "GithubUser_userId_key" ON "GithubUser"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Repository_githubUserId_key" ON "Repository"("githubUserId");

-- AddForeignKey
ALTER TABLE "Budget" ADD CONSTRAINT "Budget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetHistory" ADD CONSTRAINT "BudgetHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommitHistory" ADD CONSTRAINT "CommitHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Betting" ADD CONSTRAINT "Betting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Betting" ADD CONSTRAINT "Betting_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BettingDetail" ADD CONSTRAINT "BettingDetail_bettingId_fkey" FOREIGN KEY ("bettingId") REFERENCES "Betting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Horse" ADD CONSTRAINT "Horse_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GithubUser" ADD CONSTRAINT "GithubUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Repository" ADD CONSTRAINT "Repository_githubUserId_fkey" FOREIGN KEY ("githubUserId") REFERENCES "GithubUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
