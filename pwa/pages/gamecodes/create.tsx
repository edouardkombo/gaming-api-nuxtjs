import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../components/gamecode/Form";
import Head from "next/head";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create GameCode </title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
