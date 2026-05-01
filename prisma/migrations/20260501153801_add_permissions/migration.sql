/*
  Warnings:

  - Added the required column `name` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('Normal', 'Member', 'Admin');

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "url" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "permissions" "Permission" NOT NULL DEFAULT 'Normal';
