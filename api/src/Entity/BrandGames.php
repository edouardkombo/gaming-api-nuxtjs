<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use ApiPlatform\Core\Annotation\ApiProperty;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\SerializedName;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * BrandGames
 *
 * @ORM\Table(name="brand_games", indexes={@ORM\Index(name="category_brandid", columns={"category", "brandid"}), @ORM\Index(name="fk_brand_games_brandid", columns={"brandid"}), @ORM\Index(name="fk_launchcode", columns={"launchcode"})})
 * @ORM\Entity
 */
#[ApiResource(
    mercure: true,
)]
class BrandGames
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
     * @var string|null
     *
     * @ORM\Column(name="launchcode", type="string", length=50, nullable=true)
     */
    private $launchcode;

    /**
     * @var string|null
     *
     * @ORM\Column(name="category", type="string", length=25, nullable=true)
     */
    private $category;

    /**
     * @var int|null
     *
     * @ORM\Column(name="seq", type="integer", nullable=true)
     */
    private $seq;

    /**
     * @var bool|null
     *
     * @ORM\Column(name="hot", type="boolean", nullable=true)
     */
    private $hot;

    /**
     * @var bool|null
     *
     * @ORM\Column(name="new", type="boolean", nullable=true)
     */
    private $new;

    /**
     * @var string|null
     *
     * @ORM\Column(name="sub_category", type="string", length=50, nullable=true)
     */
    private $subCategory;

    /**
     * @var \Brands
     *
     * @ORM\ManyToOne(targetEntity="Brands")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="brandid", referencedColumnName="id")
     * })
     * @ApiSubresource(maxDepth=1)
     */
    private $brandid;

    /**
     * @var \GameCode
     *
     * @ORM\ManyToOne(targetEntity="GameCode")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="launchcode", referencedColumnName="launchcode")
     * })
     * @ApiSubresource(maxDepth=2)
     * @APiProperty()
     * @Groups("gamecode")
      */
    private $game_codes;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getGameCodes()
    {
        return $this->game_codes;
    }

    public function getLaunchcode(): ?string
    {
        return $this->launchcode;
    }

    public function setLaunchcode(?string $launchcode): self
    {
        $this->launchcode = $launchcode;

        return $this;
    }

    public function getCategory(): ?string
    {
        return $this->category;
    }

    public function setCategory(?string $category): self
    {
        $this->category = $category;

        return $this;
    }

    public function getSeq(): ?int
    {
        return $this->seq;
    }

    public function setSeq(?int $seq): self
    {
        $this->seq = $seq;

        return $this;
    }

    public function getHot(): ?bool
    {
        return $this->hot;
    }

    public function setHot(?bool $hot): self
    {
        $this->hot = $hot;

        return $this;
    }

    public function getNew(): ?bool
    {
        return $this->new;
    }

    public function setNew(?bool $new): self
    {
        $this->new = $new;

        return $this;
    }

    public function getSubCategory(): ?string
    {
        return $this->subCategory;
    }

    public function setSubCategory(?string $subCategory): self
    {
        $this->subCategory = $subCategory;

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
