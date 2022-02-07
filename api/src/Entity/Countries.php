<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use ApiPlatform\Core\Annotation\ApiProperty;
use Doctrine\Common\Collections\ArrayCollection;
use App\Entity\GameCountryBlock;

/**
 * Countries
 *
 * @ORM\Table(name="countries", indexes={@ORM\Index(name="code", columns={"code"}), @ORM\Index(name="fk_countries_jurisdiction", columns={"jurisdiction_id"})})
 * @ORM\Entity
 */
#[ApiResource(
    mercure: true,
)]
class Countries
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer", nullable=false, options={"unsigned"=true})
     */
    private $id;

    /**
     * @var string|null
     *
     * @ORM\Column(name="country", type="string", length=255, nullable=true)
     */
    private $country;

    /**
     * @var string|null
     *
     * @ORM\Column(name="code", type="string", length=2, nullable=true)
     * @ORM\Id
     */
    private $code;

    /**
     * @var \Jurisdiction
     *
     * @ORM\ManyToOne(targetEntity="Jurisdiction")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="jurisdiction_id", referencedColumnName="id")
     * })
     * @ApiSubresource(maxDepth=1)
     */
    private $jurisdiction;

    /**
     * @ORM\OneToMany(targetEntity="GameCountryBlock", mappedBy="country")
     * @ApiSubresource(maxDepth=1)
     * @ApiProperty()
     */    
    private $blockedGames;


    public function __construct() {
        $this->blockedGames = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getBlockedGames()
    {
        return $this->blockedGames;
    }

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(?string $country): self
    {
        $this->country = $country;

        return $this;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(?GameCountryBlock $code): self
    {
        $this->code = $code;

        return $this;
    }

    public function getJurisdiction(): ?Jurisdiction
    {
        return $this->jurisdiction;
    }

    public function setJurisdiction(?Jurisdiction $jurisdiction): self
    {
        $this->jurisdiction = $jurisdiction;

        return $this;
    }


}
