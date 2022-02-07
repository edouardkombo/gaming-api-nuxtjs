import { NextComponentType, NextPageContext } from "next";
import { Show } from "../../../components/languages/Show";
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
          <title>{`Show Languages ${languages["@id"]}`}</title>
        </Head>
      </div>
      <Show languages={languages} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const languages = await fetch(asPath);

  return { languages };
};

export default Page;
