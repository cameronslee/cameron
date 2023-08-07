import type { InferGetServerSidePropsType, GetServerSideProps } from "next"
import Link from "next/link"

import { useRouter } from 'next/router';
import { env } from "~/env.mjs";
import {Client, IPinnedItem} from "../components/gh-pins"

const username = 'cameronslee'

export const getServerSideProps: GetServerSideProps = async () => { 
  Client.init(env.GITHUB_ACCESS_TOKEN);
  const repo = await Client.getPins().then((res: IPinnedItem[]) => {
    return res
  });
  return repo ? { props: { repo } } : { props: {} };
}

const RepoCard = (repo: IPinnedItem) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 m-2.5 font-mono">
      <div className="w-full max-w-sm overflow-hidden rounded-lg bg-green-600 shadow-md duration-300 hover:scale-105 hover:shadow-xl p-4 space-x-4 space-y-4">
        <h1 className="font-extrabold font-mono tracking-tight text-white text-xl">
          <Link target='_blank' className="hover:text-slate-800" href={
            repo.homepageUrl ? repo.homepageUrl : repo.url
          }>{repo.name}</Link>
        </h1>
        <div className="text-white bg-gradient-to-b border-white">
            {repo.description}
        </div>
      </div>
    </div>
  )
}

export default function ProjectsView ({repo}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()
  function handleBack() {
    router.push('/').catch(err => console.log(err));
  }
  
  return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold font-mono tracking-tight text-white sm:text-[5rem]">
            <Link target='_blank' className="hover:text-white/80" href={`https://github.com/${username}`}>@{username}</Link>
          </h1>
          <div className="text-white">
          {[...repo].map((repo) => (
            <RepoCard {...repo} key={repo.id}/>
          ))}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <div className="flex flex-col items-center justify-center gap-4">
            </div>
          </div>
        </div>
        <button onClick={() => handleBack()}  className="font-mono text-white w-10 rounded bg-gradient-to-b hover:text-white/80">
        Back
        </button>
      </div>
  );
}
