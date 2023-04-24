/*
  Warnings:

  - The primary key for the `exceptions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `lesson_names` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `lessons` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `schedule` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `teachers` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `exceptions` DROP FOREIGN KEY `exceptions_ibfk_1`;

-- DropForeignKey
ALTER TABLE `exceptions` DROP FOREIGN KEY `exceptions_ibfk_2`;

-- DropForeignKey
ALTER TABLE `lessons` DROP FOREIGN KEY `lessons_ibfk_1`;

-- DropForeignKey
ALTER TABLE `lessons` DROP FOREIGN KEY `lessons_ibfk_2`;

-- DropForeignKey
ALTER TABLE `schedule` DROP FOREIGN KEY `schedule_ibfk_1`;

-- DropForeignKey
ALTER TABLE `schedule` DROP FOREIGN KEY `schedule_ibfk_2`;

-- AlterTable
ALTER TABLE `exceptions` DROP PRIMARY KEY,
    ADD COLUMN `ref` VARCHAR(191) NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `lesson_name_id` VARCHAR(191) NOT NULL,
    MODIFY `teacher_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `lesson_names` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `lessons` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `lesson_name_id` VARCHAR(191) NOT NULL,
    MODIFY `teacher_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `schedule` DROP PRIMARY KEY,
    MODIFY `lesson_id` VARCHAR(191) NULL,
    MODIFY `exception_id` VARCHAR(191) NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `teachers` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE INDEX `ref` ON `exceptions`(`ref`);

-- AddForeignKey
ALTER TABLE `exceptions` ADD CONSTRAINT `exceptions_ibfk_1` FOREIGN KEY (`lesson_name_id`) REFERENCES `lesson_names`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `exceptions` ADD CONSTRAINT `exceptions_ibfk_2` FOREIGN KEY (`teacher_id`) REFERENCES `teachers`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `exceptions` ADD CONSTRAINT `exceptions_ibfk_3` FOREIGN KEY (`ref`) REFERENCES `lessons`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `lessons` ADD CONSTRAINT `lessons_ibfk_1` FOREIGN KEY (`lesson_name_id`) REFERENCES `lesson_names`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `lessons` ADD CONSTRAINT `lessons_ibfk_2` FOREIGN KEY (`teacher_id`) REFERENCES `teachers`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `schedule` ADD CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`lesson_id`) REFERENCES `lessons`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `schedule` ADD CONSTRAINT `schedule_ibfk_2` FOREIGN KEY (`exception_id`) REFERENCES `exceptions`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- RenameIndex
ALTER TABLE `exceptions` RENAME INDEX `lesson_name_id` TO `exceptions_ibfk_1`;

-- RenameIndex
ALTER TABLE `exceptions` RENAME INDEX `teacher_id` TO `exceptions_ibfk_2`;

-- RenameIndex
ALTER TABLE `lessons` RENAME INDEX `lesson_name_id` TO `lessons_ibfk_1`;

-- RenameIndex
ALTER TABLE `lessons` RENAME INDEX `teacher_id` TO `lessons_ibfk_2`;

-- RenameIndex
ALTER TABLE `schedule` RENAME INDEX `exception_id` TO `schedule_ibfk_2`;

-- RenameIndex
ALTER TABLE `schedule` RENAME INDEX `lesson_id` TO `schedule_ibfk_1`;
