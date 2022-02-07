import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../../components/languages/Form";
import { Languages } from "../../../types/Languages";
import { fetch } from "../../../utils/dataAccess";
import Head from "next/head";

interface Props {
  languages: Languages;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  languages,
}) => {
  return (
    <div>
      <div>
        <Head>
          <title>{languages && `Edit Languages ${languages["@id"]}`}</title>
        </Head>
      </div>
      <Form languages={languages} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const languages = await fetch(asPath.replace("/edit", ""));

  return { languages };
};

export default Page;
