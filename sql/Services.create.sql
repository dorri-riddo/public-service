-- Services definition

CREATE TABLE `Services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `externalId` varchar(100) NOT NULL,
  `item` json NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
)