-- DropForeignKey
ALTER TABLE "public"."assets" DROP CONSTRAINT "assets_department_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."assets" DROP CONSTRAINT "assets_employee_id_fkey";

-- AlterTable
ALTER TABLE "assets" ALTER COLUMN "department_id" DROP NOT NULL,
ALTER COLUMN "employee_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;
