import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../components/brandgames/Form";
import Head from "next/head";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create BrandGames </title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
