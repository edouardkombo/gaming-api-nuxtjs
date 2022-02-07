import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../../components/licensees/Form";
import { Licensees } from "../../../types/Licensees";
import { fetch } from "../../../utils/dataAccess";
import Head from "next/head";

interface Props {
  licensees: Licensees;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  licensees,
}) => {
  return (
    <div>
      <div>
        <Head>
          <title>{licensees && `Edit Licensees ${licensees["@id"]}`}</title>
        </Head>
      </div>
      <Form licensees={licensees} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const licensees = await fetch(asPath.replace("/edit", ""));

  return { licensees };
};

export default Page;
