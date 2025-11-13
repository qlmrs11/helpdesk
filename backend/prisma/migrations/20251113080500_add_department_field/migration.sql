/*
  Warnings:

  - The values [HELPER] on the enum `User_role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `department` ENUM('IT', 'HR') NULL,
    MODIFY `role` ENUM('USER', 'HELPERS') NOT NULL DEFAULT 'USER';
