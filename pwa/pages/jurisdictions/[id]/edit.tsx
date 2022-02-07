import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../../components/jurisdiction/Form";
import { Jurisdiction } from "../../../types/Jurisdiction";
import { fetch } from "../../../utils/dataAccess";
import Head from "next/head";

interface Props {
  jurisdiction: Jurisdiction;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  jurisdiction,
}) => {
  return (
    <div>
      <div>
        <Head>
          <title>
            {jurisdiction && `Edit Jurisdiction ${jurisdiction["@id"]}`}
          </title>
        </Head>
      </div>
      <Form jurisdiction={jurisdiction} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const jurisdiction = await fetch(asPath.replace("/edit", ""));

  return { jurisdiction };
};

export default Page;
