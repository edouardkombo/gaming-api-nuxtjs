<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use ApiPlatform\Core\Annotation\ApiProperty;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * Brands
 *
 * @ORM\Table(name="brands", indexes={@ORM\Index(name="brands_licensee_id_fk", columns={"licensee_id"})})
 * @ORM\Entity
 */
#[ApiResource(
    mercure: true,
)]
class BrandRelations
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
     * @var \Licensees
     *
     * @ORM\ManyToOne(targetEntity="Licensees")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="licensee_id", referencedColumnName="id")
     * })
     * @ApiSubresource(maxDepth=1)
     */
    private $licensee;

    /**
     * @ORM\OneToMany(targetEntity="BrandGames", mappedBy="brandid")
     * @ApiSubresource(maxDepth=1)
     * @ApiProperty()
     */
    private $games;

    /**
     * @ORM\OneToMany(targetEntity="Category", mappedBy="brandid")
     * @ApiSubresource(maxDepth=1)
     * @ApiProperty()
     */
    private $categories;

    /**
     * @ORM\OneToMany(targetEntity="GameBrandBlock", mappedBy="brandid")
     * @ApiSubresource(maxDepth=1)
     * @ApiProperty()
     */
    private $blockedGames;


    public function __construct() {
	$this->games = new ArrayCollection();
	$this->category = new ArrayCollection();
        $this->blockedGames = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getGames()
    {
        return $this->games;
    }

    public function getBlockedGames()
    {
        return $this->blockedGames;
    }

    public function getCategories()
    {
        return $this->categories;
    }

    public function getLicensee(): ?Licensees
    {
        return $this->licensee;
    }

    public function setLicensee(?Licensees $licensee): self
    {
        $this->licensee = $licensee;

        return $this;
    }


}
