<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;

/**
 * GameBrandBlock
 *
 * @ORM\Table(name="game_brand_block", indexes={@ORM\Index(name="fk_gbb_launchcode", columns={"launchcode"}), @ORM\Index(name="game_brand_block_ibfk_1", columns={"brandid"})})
 * @ORM\Entity
 */
#[ApiResource(
    mercure: true,
)]
class GameBrandBlock
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="launchcode", type="string", length=50, nullable=false)
     */
    private $launchcode;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="blocked_date", type="datetime", nullable=false, options={"default"="0000-00-00 00:00:00"})
     */
    private $blockedDate = '0000-00-00 00:00:00';

    /**
     * @var \Brands
     *
     * @ORM\ManyToOne(targetEntity="Brands")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="brandid", referencedColumnName="id")
     * })
     */
    private $brandid;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLaunchcode(): ?string
    {
        return $this->launchcode;
    }

    public function setLaunchcode(string $launchcode): self
    {
        $this->launchcode = $launchcode;

        return $this;
    }

    public function getBlockedDate(): ?\DateTimeInterface
    {
        return $this->blockedDate;
    }

    public function setBlockedDate(\DateTimeInterface $blockedDate): self
    {
        $this->blockedDate = $blockedDate;

        return $this;
    }

    public function getBrandid(): ?Brands
    {
        return $this->brandid;
    }

    public function setBrandid(?Brands $brandid): self
    {
        $this->brandid = $brandid;

        return $this;
    }


}
