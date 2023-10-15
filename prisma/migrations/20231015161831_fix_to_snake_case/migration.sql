/*
  Warnings:

  - You are about to drop the column `isAtDiet` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - Added the required column `is_at_diet` to the `Meal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Meal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Meal" DROP CONSTRAINT "Meal_userId_fkey";

-- AlterTable
ALTER TABLE "Meal" DROP COLUMN "isAtDiet",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "is_at_diet" BOOLEAN NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "updatedAt",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
