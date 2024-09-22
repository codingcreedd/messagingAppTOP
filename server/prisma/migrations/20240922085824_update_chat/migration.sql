/*
  Warnings:

  - You are about to drop the column `isGroupChat` on the `Chat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "isGroupChat",
ADD COLUMN     "isgroupchat" BOOLEAN NOT NULL DEFAULT false;
