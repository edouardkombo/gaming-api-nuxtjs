import { FunctionComponent } from "react";
import Link from "next/link";
import ReferenceLinks from "../../components/common/ReferenceLinks";
import { Brands } from "../../types/Brands";

interface Props {
  brands: Brands[];
}

export const BrandsSearchList: FunctionComponent<Props> = ({ brands }) => (
    <>
        {brands &&
          brands.length !== 0 &&
          brands.map((brands) => (
             <option key={`${brands['@id']}`} value={`${brands['@id']}`}>{brands['brand']}</option>
          ))}
     </>
);
