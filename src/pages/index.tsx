import Head from "next/head";
import Link from "next/link";

import { Client, IPinnedItem } from "../components/gh-pins"

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

import { env } from "~/env.mjs";

export const getServerSideProps: GetServerSideProps<{
  repo: IPinnedItem[];
}> = async () => {
  Client.init(env.GITHUB_ACCESS_TOKEN);
  const repo : IPinnedItem[] = await Client.getPins().then((res: IPinnedItem[]) => {
    return res;
  });
  return { props: { repo } }
}


const RepoCard = (repo: IPinnedItem) => {
  console.log(repo.name)
  return (
    <div>
      <Link target='_blank' href={repo.homepageUrl ? repo.homepageUrl : repo.url}>
        <div className="flex flex-col items-center justify-center gap-4 m-2.5 font-mono">
          <div className="w-full max-w-sm overflow-hidden rounded-lg bg-zinc-800 shadow-md duration-300 hover:scale-105 hover:shadow-xl p-4 space-x-4 space-y-4">
            <h1 className="font-extrabold font-mono tracking-tight text-white text-sm">
              <Link target='_blank' className="hover:text-fuchsia-500" href={
                repo.homepageUrl ? repo.homepageUrl : repo.url
              }>{repo.name}</Link>
            </h1>
            <div className="text-white bg-gradient-to-b border-white text-sm">
              {repo.description}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}


export default function Home({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(repo)
  return (
    <>
      <Head>
        <title>cameron</title>
        <meta name="description" content="foo" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center text-white gap-12 font-mono px-4 py-16 ">
          <h1 className="text-5xl tracking-tight sm:text-[5rem]">
            cameron
          </h1>
          <div>
            <br />
            <span className="text-sky-600">Cameron Lee</span>
            <p>(Computer Programmer)</p> <br />

            <span className="text-sky-600">About: </span>
            <p> 
            - Curious and Dilligent
            <br/>
            - Interested in compilers and operating systems
            </p>
            <br />

            <span className="text-sky-600">Links: </span> <br />
            <Link href={"https://cameronslee.github.io/blog/"} target="_blank" className="underline">Blog</Link><br />
            <Link href={"https://github.com/cameronslee"} target="_blank" className="underline">Github</Link><br />
            <Link href={"https://www.linkedin.com/in/cameronseilee/"} target="_blank" className="underline">LinkedIn</Link><br /><br />
            <span className="text-sky-600">Education: </span>
            &nbsp;&nbsp;<p>Computer Science B.S - Seattle University</p> <br />
            <span className="text-sky-600">Notable Projects: </span>
            {repo.map((repo) => (
              <RepoCard {...repo} key={repo.id} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
