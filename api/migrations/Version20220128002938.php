<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220128002938 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE brand_games CHANGE hot hot TINYINT(1) DEFAULT NULL, CHANGE new new TINYINT(1) DEFAULT NULL');
        $this->addSql('ALTER TABLE brands CHANGE id id INT AUTO_INCREMENT NOT NULL');
        $this->addSql('ALTER TABLE game CHANGE mobile mobile TINYINT(1) NOT NULL, CHANGE min min DOUBLE PRECISION DEFAULT NULL, CHANGE max max DOUBLE PRECISION DEFAULT NULL, CHANGE gamelimit gamelimit DOUBLE PRECISION DEFAULT NULL, CHANGE jackpot jackpot TINYINT(1) DEFAULT NULL, CHANGE row_custom_image row_custom_image TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE game_country_block CHANGE brandid brandid INT NOT NULL, CHANGE logged_out logged_out TINYINT(1) NOT NULL, CHANGE unfunded unfunded TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE game_providers CHANGE id id INT AUTO_INCREMENT NOT NULL, CHANGE mga_licensed mga_licensed TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE jurisdiction CHANGE id id VARCHAR(16) NOT NULL');
        $this->addSql('ALTER TABLE languages CHANGE language language VARCHAR(5) NOT NULL');
        $this->addSql('ALTER TABLE licensees CHANGE id id INT AUTO_INCREMENT NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE brand_games CHANGE hot hot TINYINT(1) DEFAULT \'0\', CHANGE new new TINYINT(1) DEFAULT \'0\'');
        $this->addSql('ALTER TABLE brands CHANGE id id INT NOT NULL');
        $this->addSql('ALTER TABLE game CHANGE mobile mobile TINYINT(1) DEFAULT \'0\' NOT NULL, CHANGE min min DOUBLE PRECISION DEFAULT \'0\', CHANGE max max DOUBLE PRECISION DEFAULT \'0\', CHANGE gamelimit gamelimit DOUBLE PRECISION DEFAULT \'0\', CHANGE jackpot jackpot TINYINT(1) DEFAULT \'0\', CHANGE row_custom_image row_custom_image TINYINT(1) DEFAULT \'0\' NOT NULL');
        $this->addSql('ALTER TABLE game_country_block CHANGE brandid brandid INT DEFAULT 0 NOT NULL, CHANGE logged_out logged_out TINYINT(1) DEFAULT \'0\' NOT NULL, CHANGE unfunded unfunded TINYINT(1) DEFAULT \'0\' NOT NULL');
        $this->addSql('ALTER TABLE game_providers CHANGE id id INT DEFAULT 0 NOT NULL, CHANGE mga_licensed mga_licensed TINYINT(1) DEFAULT \'0\' NOT NULL');
        $this->addSql('ALTER TABLE jurisdiction CHANGE id id VARCHAR(16) CHARACTER SET utf8 NOT NULL COLLATE `utf8_general_ci`');
        $this->addSql('ALTER TABLE languages CHANGE language language VARCHAR(5) CHARACTER SET latin1 NOT NULL COLLATE `latin1_swedish_ci`');
        $this->addSql('ALTER TABLE licensees CHANGE id id INT NOT NULL');
    }
}
