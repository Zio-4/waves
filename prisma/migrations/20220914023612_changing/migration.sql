/*
  Warnings:

  - You are about to drop the column `favorites` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "favorites";

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
