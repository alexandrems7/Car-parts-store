/*
  Warnings:

  - You are about to drop the column `table_number` on the `order` table. All the data in the column will be lost.
  - You are about to drop the `table` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_table_number_fkey";

-- AlterTable
ALTER TABLE "order" DROP COLUMN "table_number";

-- DropTable
DROP TABLE "table";
