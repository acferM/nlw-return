/*
  Warnings:

  - Added the required column `creatorId` to the `feedbacks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "feedbacks" ADD COLUMN     "creatorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
