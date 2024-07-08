/*
  Warnings:

  - Added the required column `bettingType` to the `BettingDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BettingDetail" ADD COLUMN     "bettingType" TEXT NOT NULL;
