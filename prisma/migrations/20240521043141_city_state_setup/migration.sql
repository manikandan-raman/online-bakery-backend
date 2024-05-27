/*
  Warnings:

  - Added the required column `country_id` to the `cities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state_id` to the `cities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country_id` to the `states` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cities" ADD COLUMN     "country_id" UUID NOT NULL,
ADD COLUMN     "state_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "states" ADD COLUMN     "country_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "states"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "states" ADD CONSTRAINT "states_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
