-- CreateTable
CREATE TABLE `exceptions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lesson_name_id` INTEGER NOT NULL,
    `teacher_id` INTEGER NOT NULL,
    `group` INTEGER NOT NULL,
    `time` VARCHAR(5) NULL,
    `date` VARCHAR(100) NULL,
    `type` VARCHAR(20) NOT NULL,

    INDEX `lesson_name_id`(`lesson_name_id`),
    INDEX `teacher_id`(`teacher_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lesson_names` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lessons` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lesson_name_id` INTEGER NOT NULL,
    `teacher_id` INTEGER NOT NULL,
    `group` INTEGER NOT NULL,
    `time` VARCHAR(5) NULL,
    `type` VARCHAR(20) NOT NULL,

    INDEX `lesson_name_id`(`lesson_name_id`),
    INDEX `teacher_id`(`teacher_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `schedule` (
    `day` INTEGER NOT NULL DEFAULT 0,
    `lesson_id` INTEGER NULL,
    `exception_id` INTEGER NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `week` INTEGER NOT NULL,

    INDEX `exception_id`(`exception_id`),
    INDEX `lesson_id`(`lesson_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teachers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `exceptions` ADD CONSTRAINT `exceptions_ibfk_1` FOREIGN KEY (`lesson_name_id`) REFERENCES `lesson_names`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `exceptions` ADD CONSTRAINT `exceptions_ibfk_2` FOREIGN KEY (`teacher_id`) REFERENCES `teachers`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `lessons` ADD CONSTRAINT `lessons_ibfk_1` FOREIGN KEY (`lesson_name_id`) REFERENCES `lesson_names`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `lessons` ADD CONSTRAINT `lessons_ibfk_2` FOREIGN KEY (`teacher_id`) REFERENCES `teachers`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `schedule` ADD CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`lesson_id`) REFERENCES `lessons`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `schedule` ADD CONSTRAINT `schedule_ibfk_2` FOREIGN KEY (`exception_id`) REFERENCES `exceptions`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
