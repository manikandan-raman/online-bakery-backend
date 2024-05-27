/*
  Warnings:

  - The `status` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `payments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[user_id,dish_id]` on the table `rating_reviews` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('success', 'pending', 'failure');

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "status",
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "status",
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'pending';

-- DropEnum
DROP TYPE "Order_Status";

-- CreateIndex
CREATE UNIQUE INDEX "rating_reviews_user_id_dish_id_key" ON "rating_reviews"("user_id", "dish_id");
