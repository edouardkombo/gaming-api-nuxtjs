import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../components/gamebrandblock/Form";
import Head from "next/head";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create GameBrandBlock </title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
