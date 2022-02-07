<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;


/**
 * Category
 *
 * @ORM\Table(name="category", indexes={@ORM\Index(name="category", columns={"category"}), @ORM\Index(name="category_brandid", columns={"category", "brandid"}), @ORM\Index(name="fk_category_brandid", columns={"brandid"}), @ORM\Index(name="fk_category_user_id", columns={"user_id"})})
 * @ORM\Entity
 */
#[ApiResource(
    mercure: true,
)]
class Category
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
     * @ORM\Column(name="name", type="string", length=100, nullable=true)
     */
    private $name;

    /**
     * @var string|null
     *
     * @ORM\Column(name="category", type="string", length=25, nullable=true)
     */
    private $category;

    /**
     * @var string|null
     *
     * @ORM\Column(name="image", type="string", length=50, nullable=true)
     */
    private $image;

    /**
     * @var string|null
     *
     * @ORM\Column(name="description", type="string", length=1000, nullable=true)
     */
    private $description;

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
     * @var bool|null
     *
     * @ORM\Column(name="active", type="boolean", nullable=true, options={"default"="1"})
     */
    private $active = true;

    /**
     * @var int|null
     *
     * @ORM\Column(name="seq", type="integer", nullable=true)
     */
    private $seq;

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

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): self
    {
        $this->name = $name;

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

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): self
    {
        $this->image = $image;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

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

    public function getActive(): ?bool
    {
        return $this->active;
    }

    public function setActive(?bool $active): self
    {
        $this->active = $active;

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
