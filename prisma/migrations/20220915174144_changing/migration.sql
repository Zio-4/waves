/*
  Warnings:

  - You are about to drop the column `userId` on the `Song` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Song" DROP CONSTRAINT "Song_userId_fkey";

-- AlterTable
ALTER TABLE "Song" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "favorites" JSONB[];
