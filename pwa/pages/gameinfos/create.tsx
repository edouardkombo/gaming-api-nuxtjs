import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../components/gameinfo/Form";
import Head from "next/head";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create GameInfo </title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
