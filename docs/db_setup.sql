-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema checkr
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema checkr
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `checkr` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `checkr` ;

-- -----------------------------------------------------
-- Table `checkr`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `checkr`.`user` (
  `id` BINARY NOT NULL,
  `first_name` VARCHAR(80) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `checkr`.`candidate`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `checkr`.`candidate` (
  `id` BINARY NOT NULL,
  `name` VARCHAR(80) NOT NULL,
  `adjudication` ENUM('ENGAGED', 'ADVERSE ACTION') NOT NULL,
  `status` ENUM('CLEAR', 'CONSIDER') NOT NULL,
  `location` VARCHAR(30) NOT NULL,
  `application_date` DATE NOT NULL,
  `email` VARCHAR(60) NOT NULL,
  `phone` VARCHAR(15) NOT NULL,
  `zipcode` VARCHAR(15) NOT NULL,
  `social_security` VARCHAR(15) NULL,
  `drivers_license` VARCHAR(15) NULL,
  `package` VARCHAR(20) NULL,
  `created_at` DATETIME NULL,
  `dob` DATE NOT NULL,
  `completed_at` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `checkr`.`court_search`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `checkr`.`court_search` (
  `id` BINARY NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `status` ENUM('CLEAR', 'CONSIDER') NOT NULL,
  `verification_date` DATE NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `checkr`.`adverse_action`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `checkr`.`adverse_action` (
  `id` BINARY NOT NULL,
  `status` ENUM('SCHEDULE') NOT NULL,
  `pre_notice_date` DATE NOT NULL,
  `post_notice_date` DATE NOT NULL,
  `candidates_id` BINARY NOT NULL,
  PRIMARY KEY (`id`, `candidates_id`),
  INDEX `fk_adverse_actions_candidates1_idx` (`candidates_id` ASC) VISIBLE,
  CONSTRAINT `fk_adverse_actions_candidates1`
    FOREIGN KEY (`candidates_id`)
    REFERENCES `checkr`.`candidate` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `checkr`.`candidate_court_search`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `checkr`.`candidate_court_search` (
  `candidate_id` BINARY NOT NULL,
  `court_search_id` BINARY NOT NULL,
  PRIMARY KEY (`candidate_id`, `court_search_id`),
  INDEX `fk_candidate_has_court_search_court_search1_idx` (`court_search_id` ASC) VISIBLE,
  INDEX `fk_candidate_has_court_search_candidate1_idx` (`candidate_id` ASC) VISIBLE,
  CONSTRAINT `fk_candidate_has_court_search_candidate1`
    FOREIGN KEY (`candidate_id`)
    REFERENCES `checkr`.`candidate` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_candidate_has_court_search_court_search1`
    FOREIGN KEY (`court_search_id`)
    REFERENCES `checkr`.`court_search` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
