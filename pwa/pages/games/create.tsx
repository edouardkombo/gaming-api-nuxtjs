import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../components/game/Form";
import Head from "next/head";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create Game </title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
