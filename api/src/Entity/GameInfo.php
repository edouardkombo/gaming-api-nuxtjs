<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use ApiPlatform\Core\Annotation\ApiFilter;

/**
 * GameInfo
 *
 * @ORM\Table(name="game_info", indexes={@ORM\Index(name="fk_gi_brandid", columns={"brandid"}), @ORM\Index(name="fk_gi_language", columns={"language"}), @ORM\Index(name="fk_gi_launchcode", columns={"launchcode"})})
 * @ORM\Entity
 */
#[ApiResource(
    mercure: true,
)]
class GameInfo
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $id;

    /**
     * @var int
     *
     * @ORM\Column(name="brandid", type="integer", nullable=false)
     */
    private $brandid;

    /**
     * @var string
     *
     * @ORM\Column(name="language", type="string", length=5, nullable=false)
     */
    private $language;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text", length=65535, nullable=false)
     */
    private $description;

    /**
     * @var int
     *
     * @ORM\Column(name="user_id", type="integer", nullable=false)
     */
    private $userId;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="last_modified", type="datetime", nullable=false, options={"default"="0000-00-00 00:00:00"})
     */
    private $lastModified = '0000-00-00 00:00:00';

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getBrandid(): ?int
    {
        return $this->brandid;
    }

    public function setBrandid(int $brandid): self
    {
        $this->brandid = $brandid;

        return $this;
    }

    public function getLanguage(): ?string
    {
        return $this->language;
    }

    public function setLanguage(string $language): self
    {
        $this->language = $language;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getUserId(): ?int
    {
        return $this->userId;
    }

    public function setUserId(int $userId): self
    {
        $this->userId = $userId;

        return $this;
    }

    public function getLastModified(): ?\DateTimeInterface
    {
        return $this->lastModified;
    }

    public function setLastModified(\DateTimeInterface $lastModified): self
    {
        $this->lastModified = $lastModified;

        return $this;
    }


}
