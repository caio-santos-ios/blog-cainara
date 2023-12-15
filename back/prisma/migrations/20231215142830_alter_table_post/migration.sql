/*
  Warnings:

  - Added the required column `authorId` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coverPhoto` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "coverPhoto" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "photos" JSONB[],
ADD COLUMN     "title" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
