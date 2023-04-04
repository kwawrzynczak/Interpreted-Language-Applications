/*
  Warnings:

  - A unique constraint covering the columns `[status]` on the table `order_statuses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "order_statuses_status_key" ON "order_statuses"("status");
