-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'NORMAL');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'NORMAL';
