<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * GameCountryBlock
 *
 * @ORM\Table(name="game_country_block", indexes={@ORM\Index(name="fk_gcb_launchcode", columns={"launchcode"}), @ORM\Index(name="idx_gcb_country", columns={"country"})})
 * @ORM\Entity
 */
#[ApiResource(
    mercure: true,
)]
class GameCountryBlock
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="bigint", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
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
     * @ORM\Column(name="launchcode", type="string", length=50, nullable=false)
     */
    private $launchcode;

    /**
     * @var \Countries
     *
     * @ORM\ManyToOne(targetEntity="Countries")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="country", referencedColumnName="code")
     * })
     */
    private $country;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="blocked_date", type="datetime", nullable=true)
     */
    private $blockedDate;

    /**
     * @var bool
     *
     * @ORM\Column(name="logged_out", type="boolean", nullable=false)
     */
    private $loggedOut;

    /**
     * @var bool
     *
     * @ORM\Column(name="unfunded", type="boolean", nullable=false)
     */
    private $unfunded;

    public function getId(): ?string
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

    public function getLaunchcode(): ?string
    {
        return $this->launchcode;
    }

    public function setLaunchcode(string $launchcode): self
    {
        $this->launchcode = $launchcode;

        return $this;
    }

    public function getCountry()
    {
        return $this->country;
    }

    public function setCountry(string $country): self
    {
        $this->country = $country;

        return $this;
    }

    public function getBlockedDate(): ?\DateTimeInterface
    {
        return $this->blockedDate;
    }

    public function setBlockedDate(?\DateTimeInterface $blockedDate): self
    {
        $this->blockedDate = $blockedDate;

        return $this;
    }

    public function getLoggedOut(): ?bool
    {
        return $this->loggedOut;
    }

    public function setLoggedOut(bool $loggedOut): self
    {
        $this->loggedOut = $loggedOut;

        return $this;
    }

    public function getUnfunded(): ?bool
    {
        return $this->unfunded;
    }

    public function setUnfunded(bool $unfunded): self
    {
        $this->unfunded = $unfunded;

        return $this;
    }


}
