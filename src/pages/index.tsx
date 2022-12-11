import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Task Manager</title>
        <meta name="description" content="Created and developed by fcaramez" />
      </Head>
      
    </>
  );
};

export default Home;
