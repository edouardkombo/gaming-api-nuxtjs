<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;

/**
 * Languages
 *
 * @ORM\Table(name="languages")
 * @ORM\Entity
 */
#[ApiResource(
    mercure: true,
)]
class Languages
{
    /**
     * @var string
     *
     * @ORM\Column(name="language", type="string", length=5, nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $language;

    /**
     * @var string|null
     *
     * @ORM\Column(name="country_language", type="string", length=5, nullable=true)
     */
    private $countryLanguage;

    /**
     * @var string|null
     *
     * @ORM\Column(name="description", type="string", length=25, nullable=true)
     */
    private $description;

    /**
     * @var bool|null
     *
     * @ORM\Column(name="sort", type="boolean", nullable=true)
     */
    private $sort;

    public function getLanguage(): ?string
    {
        return $this->language;
    }

    public function getCountryLanguage(): ?string
    {
        return $this->countryLanguage;
    }

    public function setCountryLanguage(?string $countryLanguage): self
    {
        $this->countryLanguage = $countryLanguage;

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

    public function getSort(): ?bool
    {
        return $this->sort;
    }

    public function setSort(?bool $sort): self
    {
        $this->sort = $sort;

        return $this;
    }


}
