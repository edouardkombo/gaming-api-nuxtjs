<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Serializer\Annotation\SerializedName;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * Game
 *
 * @ORM\Table(name="game", uniqueConstraints={@ORM\UniqueConstraint(name="launchcode", columns={"launchcode"})}, indexes={@ORM\Index(name="fk_game_typeid", columns={"game_type_id"}), @ORM\Index(name="fk_game_userid", columns={"user_id"}), @ORM\Index(name="game_provider_id", columns={"game_provider_id"})})
 * @ORM\Entity
 */
#[ApiResource(
  mercure: true,
  normalizationContext: ['groups' => ['gamecode']],	
)]
class GameCode
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string|null
     *
     * @ORM\Column(name="name", type="string", length=100, nullable=true)
     * @Groups("gamecode")
     */
    #[ApiFilter(SearchFilter::class, properties: ['name' => 'partial'])]
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="publisher", type="string", length=20, nullable=false)
     */
    private $publisher;

    /**
     * @var int|null
     *
     * @ORM\Column(name="width", type="integer", nullable=true, options={"default"="800"})
     */
    private $width = 800;

    /**
     * @var int|null
     *
     * @ORM\Column(name="height", type="integer", nullable=true, options={"default"="601"})
     */
    private $height = 601;

    /**
     * @var string
     *
     * @ORM\Column(name="disclaimer", type="string", length=100, nullable=false)
     */
    private $disclaimer;

    /**
     * @var bool
     *
     * @ORM\Column(name="active", type="boolean", nullable=false)
     */
    private $active;

    /**
     * @var string|null
     *
     * @ORM\Column(name="image", type="string", length=50, nullable=true)
     * @Groups("gamecode")
     */
    private $image;

    /**
     * @var int|null
     *
     * @ORM\Column(name="user_id", type="integer", nullable=true)
     */
    private $userId;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="last_modified", type="datetime", nullable=true)
     */
    private $lastModified;

    /**
     * @var bool
     *
     * @ORM\Column(name="desktop", type="boolean", nullable=false, options={"default"="1"})
     */
    private $desktop = true;

    /**
     * @var bool
     *
     * @ORM\Column(name="mobile", type="boolean", nullable=false)
     */
    private $mobile;

    /**
     * @var int|null
     *
     * @ORM\Column(name="game_type_id", type="integer", nullable=true)
     */
    private $gameTypeId;

    /**
     * @var float|null
     *
     * @ORM\Column(name="min", type="float", precision=10, scale=0, nullable=true)
     */
    private $min;

    /**
     * @var float|null
     *
     * @ORM\Column(name="max", type="float", precision=10, scale=0, nullable=true) 
     */
    private $max;

    /**
     * @var float|null
     *
     * @ORM\Column(name="gamelimit", type="float", precision=10, scale=0, nullable=true)
     */
    private $gamelimit;

    /**
     * @var bool|null
     *
     * @ORM\Column(name="fun_supported", type="boolean", nullable=true, options={"default"="1"})
     */
    private $funSupported = true;

    /**
     * @var bool|null
     *
     * @ORM\Column(name="iframe", type="boolean", nullable=true, options={"default"="1"})
     */
    private $iframe = true;

    /**
     * @var string|null
     *
     * @ORM\Column(name="provider", type="string", length=50, nullable=true)
     */
    private $provider;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="date_added", type="date", nullable=true)
     */
    private $dateAdded;

    /**
     * @var string|null
     *
     * @ORM\Column(name="rtp", type="decimal", precision=11, scale=2, nullable=true)
     * @Groups("gamecode")
     */
    private $rtp;

    /**
     * @var bool|null
     *
     * @ORM\Column(name="jackpot", type="boolean", nullable=true)
     */
    private $jackpot;

    /**
     * @var string|null
     *
     * @ORM\Column(name="seo_name", type="string", length=50, nullable=true)
     * @Groups("gamecode")
     */
    private $seoName;

    /**
     * @var string|null
     *
     * @ORM\Column(name="help", type="text", length=65535, nullable=true)
     */
    private $help;

    /**
     * @var bool
     *
     * @ORM\Column(name="row_custom_image", type="boolean", nullable=false)
     */
    private $rowCustomImage;

    /**
     * @var int|null
     *
     * @ORM\Column(name="reels", type="integer", nullable=true)
     */
    private $reels;

    /**
     * @var int|null
     *
     * @ORM\Column(name="rows", type="integer", nullable=true)
     */
    private $rows;

    /**
     * @var int|null
     *
     * @ORM\Column(name="lines", type="integer", nullable=true)
     */
    private $lines;

    /**
     * @var string|null
     *
     * @ORM\Column(name="volatility", type="text", length=65535, nullable=true)
     */
    private $volatility;

    /**
     * @var bool|null
     *
     * @ORM\Column(name="is_state", type="boolean", nullable=true)
     */
    private $isState;

    /**
     * @var \GameProviders
     *
     * @ORM\ManyToOne(targetEntity="GameProviders")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="game_provider_id", referencedColumnName="id")
     * })
     */
    private $gameProvider;

    /**
     * @var string|null
     *
     * @ORM\Column(name="launchcode", type="string", length=50, nullable=true) 
     * @ORM\Id
     */
    private $launchcode;

    /**
     * @var \GameDetails
     *
     * @ORM\ManyToOne(targetEntity="GameDetails")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="launchcode", referencedColumnName="launchcode")
     * })
     * @ApiSubresource(maxDepth=1)
     * @Groups("gamedetails")
     * @SerializedName("details")
     * @ApiProperty()
     */
    #[Groups("gamedetails")]
    private $details;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDetails(): ?GameDetails
    {
        return $this->details;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getPublisher(): ?string
    {
        return $this->publisher;
    }

    public function setPublisher(string $publisher): self
    {
        $this->publisher = $publisher;

        return $this;
    }

    public function getWidth(): ?int
    {
        return $this->width;
    }

    public function setWidth(?int $width): self
    {
        $this->width = $width;

        return $this;
    }

    public function getHeight(): ?int
    {
        return $this->height;
    }

    public function setHeight(?int $height): self
    {
        $this->height = $height;

        return $this;
    }

    public function getDisclaimer(): ?string
    {
        return $this->disclaimer;
    }

    public function setDisclaimer(string $disclaimer): self
    {
        $this->disclaimer = $disclaimer;

        return $this;
    }

    public function getActive(): ?bool
    {
        return $this->active;
    }

    public function setActive(bool $active): self
    {
        $this->active = $active;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): self
    {
        $this->image = $image;

        return $this;
    }

    public function getUserId(): ?int
    {
        return $this->userId;
    }

    public function setUserId(?int $userId): self
    {
        $this->userId = $userId;

        return $this;
    }

    public function getLastModified(): ?\DateTimeInterface
    {
        return $this->lastModified;
    }

    public function setLastModified(?\DateTimeInterface $lastModified): self
    {
        $this->lastModified = $lastModified;

        return $this;
    }

    public function getDesktop(): ?bool
    {
        return $this->desktop;
    }

    public function setDesktop(bool $desktop): self
    {
        $this->desktop = $desktop;

        return $this;
    }

    public function getMobile(): ?bool
    {
        return $this->mobile;
    }

    public function setMobile(bool $mobile): self
    {
        $this->mobile = $mobile;

        return $this;
    }

    public function getGameTypeId(): ?int
    {
        return $this->gameTypeId;
    }

    public function setGameTypeId(?int $gameTypeId): self
    {
        $this->gameTypeId = $gameTypeId;

        return $this;
    }

    public function getMin(): ?float
    {
        return $this->min;
    }

    public function setMin(?float $min): self
    {
        $this->min = $min;

        return $this;
    }

    public function getMax(): ?float
    {
        return $this->max;
    }

    public function setMax(?float $max): self
    {
        $this->max = $max;

        return $this;
    }

    public function getGamelimit(): ?float
    {
        return $this->gamelimit;
    }

    public function setGamelimit(?float $gamelimit): self
    {
        $this->gamelimit = $gamelimit;

        return $this;
    }

    public function getFunSupported(): ?bool
    {
        return $this->funSupported;
    }

    public function setFunSupported(?bool $funSupported): self
    {
        $this->funSupported = $funSupported;

        return $this;
    }

    public function getIframe(): ?bool
    {
        return $this->iframe;
    }

    public function setIframe(?bool $iframe): self
    {
        $this->iframe = $iframe;

        return $this;
    }

    public function getProvider(): ?string
    {
        return $this->provider;
    }

    public function setProvider(?string $provider): self
    {
        $this->provider = $provider;

        return $this;
    }

    public function getDateAdded(): ?\DateTimeInterface
    {
        return $this->dateAdded;
    }

    public function setDateAdded(?\DateTimeInterface $dateAdded): self
    {
        $this->dateAdded = $dateAdded;

        return $this;
    }

    public function getRtp(): ?string
    {
        return $this->rtp;
    }

    public function setRtp(?string $rtp): self
    {
        $this->rtp = $rtp;

        return $this;
    }

    public function getJackpot(): ?bool
    {
        return $this->jackpot;
    }

    public function setJackpot(?bool $jackpot): self
    {
        $this->jackpot = $jackpot;

        return $this;
    }

    public function getSeoName(): ?string
    {
        return $this->seoName;
    }

    public function setSeoName(?string $seoName): self
    {
        $this->seoName = $seoName;

        return $this;
    }

    public function getHelp(): ?string
    {
        return $this->help;
    }

    public function setHelp(?string $help): self
    {
        $this->help = $help;

        return $this;
    }

    public function getRowCustomImage(): ?bool
    {
        return $this->rowCustomImage;
    }

    public function setRowCustomImage(bool $rowCustomImage): self
    {
        $this->rowCustomImage = $rowCustomImage;

        return $this;
    }

    public function getReels(): ?int
    {
        return $this->reels;
    }

    public function setReels(?int $reels): self
    {
        $this->reels = $reels;

        return $this;
    }

    public function getRows(): ?int
    {
        return $this->rows;
    }

    public function setRows(?int $rows): self
    {
        $this->rows = $rows;

        return $this;
    }

    public function getLines(): ?int
    {
        return $this->lines;
    }

    public function setLines(?int $lines): self
    {
        $this->lines = $lines;

        return $this;
    }

    public function getVolatility(): ?string
    {
        return $this->volatility;
    }

    public function setVolatility(?string $volatility): self
    {
        $this->volatility = $volatility;

        return $this;
    }

    public function getIsState(): ?bool
    {
        return $this->isState;
    }

    public function setIsState(?bool $isState): self
    {
        $this->isState = $isState;

        return $this;
    }

    public function getGameProvider(): ?GameProviders
    {
        return $this->gameProvider;
    }

    public function setGameProvider(?GameProviders $gameProvider): self
    {
        $this->gameProvider = $gameProvider;

        return $this;
    }

    public function getLaunchcode(): ?string
    {
        return $this->launchcode;
    }

    public function setLaunchcode(?GameDetails $launchcode): self
    {
        $this->launchcode = $launchcode;

        return $this;
    }


}    
