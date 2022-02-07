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
class Brands
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
     * @ORM\Column(name="brand", type="string", length=30, nullable=true)
     */
    private $brand;

    /**
     * @var string|null
     *
     * @ORM\Column(name="stage_url", type="string", length=100, nullable=true)
     */
    private $stageUrl;

    /**
     * @var string|null
     *
     * @ORM\Column(name="site_url", type="string", length=100, nullable=true)
     */
    private $siteUrl;

    /**
     * @var string|null
     *
     * @ORM\Column(name="path", type="string", length=1000, nullable=true)
     */
    private $path;

    /**
     * @var string|null
     *
     * @ORM\Column(name="live_server", type="string", length=1000, nullable=true)
     */
    private $liveServer;

    /**
     * @var int|null
     *
     * @ORM\Column(name="live_ssh_port", type="integer", nullable=true)
     */
    private $liveSshPort;

    /**
     * @var bool|null
     *
     * @ORM\Column(name="enabled", type="boolean", nullable=true)
     */
    private $enabled;

    /**
     * @var string
     *
     * @ORM\Column(name="group_name", type="string", length=50, nullable=false, options={"default"="network"})
     */
    private $groupName = 'network';

    /**
     * @var bool
     *
     * @ORM\Column(name="live_update_enabled", type="boolean", nullable=false, options={"default"="1"})
     */
    private $liveUpdateEnabled = true;

    /**
     * @var string|null
     *
     * @ORM\Column(name="params", type="string", length=255, nullable=true)
     */
    private $params;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getBrand(): ?string
    {
        return $this->brand;
    }

    public function setBrand(?array $brand): self
    {
        $this->brand = $brand;

        return $this;
    }

    public function getStageUrl(): ?string
    {
        return $this->stageUrl;
    }

    public function setStageUrl(?string $stageUrl): self
    {
        $this->stageUrl = $stageUrl;

        return $this;
    }

    public function getSiteUrl(): ?string
    {
        return $this->siteUrl;
    }

    public function setSiteUrl(?string $siteUrl): self
    {
        $this->siteUrl = $siteUrl;

        return $this;
    }

    public function getPath(): ?string
    {
        return $this->path;
    }

    public function setPath(?string $path): self
    {
        $this->path = $path;

        return $this;
    }

    public function getLiveServer(): ?string
    {
        return $this->liveServer;
    }

    public function setLiveServer(?string $liveServer): self
    {
        $this->liveServer = $liveServer;

        return $this;
    }

    public function getLiveSshPort(): ?int
    {
        return $this->liveSshPort;
    }

    public function setLiveSshPort(?int $liveSshPort): self
    {
        $this->liveSshPort = $liveSshPort;

        return $this;
    }

    public function getEnabled(): ?bool
    {
        return $this->enabled;
    }

    public function setEnabled(?bool $enabled): self
    {
        $this->enabled = $enabled;

        return $this;
    }

    public function getGroupName(): ?string
    {
        return $this->groupName;
    }

    public function setGroupName(string $groupName): self
    {
        $this->groupName = $groupName;

        return $this;
    }

    public function getLiveUpdateEnabled(): ?bool
    {
        return $this->liveUpdateEnabled;
    }

    public function setLiveUpdateEnabled(bool $liveUpdateEnabled): self
    {
        $this->liveUpdateEnabled = $liveUpdateEnabled;

        return $this;
    }

    public function getParams(): ?string
    {
        return $this->params;
    }

    public function setParams(?string $params): self
    {
        $this->params = $params;

        return $this;
    }


}
