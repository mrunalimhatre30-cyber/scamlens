-- =============================================================================
-- ScamLens Database Schema
-- Database: scam_lens
-- Designed for MySQL 8.0+
-- =============================================================================

CREATE DATABASE IF NOT EXISTS `scam_lens`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `scam_lens`;

-- -----------------------------------------------------------------------------
-- Table: users
-- Stores registered accounts with securely hashed passwords
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Table: scan_history
-- Stores user-saved scam analysis findings with privacy preservation
-- Note: Raw sensitive message bodies are never stored by default
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `scan_history` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT UNSIGNED NOT NULL,
  `input_type` ENUM('message', 'url', 'file', 'image_qr') NOT NULL,
  `target_snippet` VARCHAR(255) NOT NULL COMMENT 'Sanitized domain or redacted first 60 chars',
  `risk_category` VARCHAR(50) NOT NULL,
  `warning_count` INT UNSIGNED NOT NULL DEFAULT 0,
  `findings` JSON NOT NULL COMMENT 'Structured array of warning signs and explanations',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_scan_history_user`
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  INDEX `idx_scan_history_user_date` (`user_id`, `created_at` DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Table: quiz_progress
-- Tracks user completion and scores in the Scam Challenge quiz
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `quiz_progress` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT UNSIGNED NOT NULL,
  `quiz_id` VARCHAR(64) NOT NULL DEFAULT 'scam-challenge-v1',
  `score` INT UNSIGNED NOT NULL,
  `total_questions` INT UNSIGNED NOT NULL,
  `completed_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_quiz_progress_user`
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  INDEX `idx_quiz_progress_user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
