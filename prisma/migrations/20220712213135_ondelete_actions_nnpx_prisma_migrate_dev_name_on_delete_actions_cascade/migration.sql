-- DropForeignKey
ALTER TABLE "favorite" DROP CONSTRAINT "favorite_product_name_fkey";

-- DropForeignKey
ALTER TABLE "favorite" DROP CONSTRAINT "favorite_user_id_fkey";

-- AddForeignKey
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_product_name_fkey" FOREIGN KEY ("product_name") REFERENCES "product"("name") ON DELETE CASCADE ON UPDATE CASCADE;
