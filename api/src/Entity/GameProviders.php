<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use ApiPlatform\Core\Annotation\ApiProperty;
use Doctrine\Common\Collections\ArrayCollection;
use App\Entity\Game;

/**
 * GameProviders
 *
 * @ORM\Table(name="game_providers")
 * @ORM\Entity
 */
#[ApiResource(
    mercure: true,
)]
class GameProviders
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
     * @ORM\Column(name="name", type="string", length=255, nullable=false)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=255, nullable=false)
     */
    private $title;

    /**
     * @var string
     *
     * @ORM\Column(name="distributor", type="string", length=255, nullable=false)
     */
    private $distributor;

    /**
     * @var bool
     *
     * @ORM\Column(name="mga_licensed", type="boolean", nullable=false)
     */
    private $mgaLicensed;

    /**
     * @ORM\OneToMany(targetEntity=Game::class, mappedBy="gameProvider")
     * @ApiSubresource(maxDepth=1)
     * @ApiProperty()
     */
    private $games;

    public function __construct() {
        $this->games = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getGames()
    {
        return $this->games;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getDistributor(): ?string
    {
        return $this->distributor;
    }

    public function setDistributor(string $distributor): self
    {
        $this->distributor = $distributor;

        return $this;
    }

    public function getMgaLicensed(): ?bool
    {
        return $this->mgaLicensed;
    }

    public function setMgaLicensed(bool $mgaLicensed): self
    {
        $this->mgaLicensed = $mgaLicensed;

        return $this;
    }


}
