/*
  Warnings:

  - Added the required column `githubUserName` to the `GithubUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Repository_githubUserId_key";

-- AlterTable
ALTER TABLE "GithubUser" ADD COLUMN     "githubUserName" TEXT NOT NULL;
