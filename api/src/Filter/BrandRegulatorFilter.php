<?php
// api/src/Filter/RegexpFilter.php

namespace App\Filter;

use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\AbstractContextAwareFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\PropertyInfo\Type;
use Doctrine\ORM\Query\Expr;
use App\Entity\GameBrandBlock;
use App\Entity\GameCountryBlock;
use App\Entity\BrandGames;

final class BrandRegulatorFilter extends AbstractContextAwareFilter
{
    protected function filterProperty(string $property, $value, QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, string $operationName = null)
    {
	 $property = str_replace('brand_firewall_', '', $property);

        // otherwise filter is applied to order and page as well
        if (
            !$this->isPropertyEnabled($property, $resourceClass) ||
            !$this->isPropertyMapped($property, $resourceClass)
        ) {
            return;
        }

        $parameterName = $queryNameGenerator->generateParameterName($property); // Generate a unique parameter name to avoid collisions with other filters
	$qb = $queryBuilder;
	$qbCountry = $queryBuilder;
	$alias = $qb->getRootAliases()[0];
	$qb
	    ->leftJoin(GameBrandBlock::class, 'p', Expr\Join::WITH, "p.launchcode = $alias." . "${property}")
	    ->andWhere("p.brandid != :brandid")
	    ->setParameter("brandid", $value);

	$sql = $qb->getQuery()->getSql();
	return $result = $qb->getQuery()->execute();
    }

    // This function is only used to hook in documentation generators (supported by Swagger and Hydra)
    public function getDescription(string $resourceClass): array
    {
        if (!$this->properties) {
            return [];
        }

        $description = [];
        foreach ($this->properties as $property => $strategy) {
            $description["brand_firewall_" . $property] = [
                'property' => $property,
                'type' => Type::BUILTIN_TYPE_STRING,
                'required' => false,
                'swagger' => [
                    'description' => 'Restrict any game per brand id!',
                    'name' => 'brand_firewall_launchcode',
                    'type' => 'string',
                ],
            ];
        }

        return $description;
    }
}

