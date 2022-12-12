import { trpc } from "@/utils/trpc";
import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  const handleQuery = () => {
    trpc.auth.verify.useQuery({ authToken: "" });
  };
  return (
    <>
      <Head>
        <title>Task Manager</title>
        <meta name="description" content="Created and developed by fcaramez" />
      </Head>
      <button></button>
    </>
  );
};

export default Home;
