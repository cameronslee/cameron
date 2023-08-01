import Head from "next/head";
import Link from "next/link";

import GeorgeImage from "public/george.png";
import { Terminal } from 'primereact/terminal';

import { TerminalService } from 'primereact/terminalservice';
import { useRouter } from 'next/router';
import {useEffect, useState } from 'react'; 

const TerminalDemo = () => {
  const router = useRouter();

  const [georgeUp, setGeorgeUp] = useState(false);
  const [help, setHelp] = useState(false);

  const commandHandler = (text: string) => {
    let response;
    const argsIndex = text.indexOf(' ');
    const command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;

    switch (command) {
      case 'date':
        response = 'Today is ' + new Date().toDateString();
        break;

      case 'clear':
        response = null;
        break;

      case 'shambles':
        setGeorgeUp(!georgeUp);
        console.log(georgeUp==true ? "George is up" : "George is down");
        response = <p>George is a good little monkey <br/> and always very curious.</p>;
        break;

      case 'help':
      case '-h': 
      case 'h':
      case '-help': 
      case '--help': 
        response = 
              <p>
                Commands: <br />
                <span className="text-green-400">about</span> - who am i?<br />
                <span className="text-green-400">projects</span> - view list of projects<br />
                <span className="text-green-400">clear</span> - clear output<br />
              </p>;
        break;

      case 'about':
        response = 
              <div>
              <br />
                <span className="text-green-400">Cameron Lee</span>
                <p>(Programmer / Scientist)</p> <br />

                <span className="text-green-400">About: </span>
                <p> Curious and passionate about technology <br/> with a strong foundation in Computer Science</p> <br />

                <span className="text-green-400">Links: </span> <br />
                <Link href={"https://github.com/cameronslee"} target="_blank" className="underline">Github</Link><br />
                <Link href={"https://www.linkedin.com/in/cameronseilee/"} target="_blank" className="underline">LinkedIn</Link><br /><br />
                <span className="text-green-400">Education: </span>
                &nbsp;&nbsp;<p>Computer Science B.S - Seattle University</p> <br />
              </div>;
        break;

      case 'projects':
        response = "To projects";
        router.push('/projects').catch(err => console.log(err));
        break;
        

      default:
        response = 'Unknown command: ' + command + '. Type "help" for a list of commands.';
        break;
    }

    if (response) {
      TerminalService.emit('response', response);
    }
    else {
      TerminalService.emit('clear');
    }
  }

  useEffect(() => {
      TerminalService.on('command', commandHandler);

      return () => {
      TerminalService.off('command', commandHandler);
      }
      });

  return (
      <div className="bg-slate-950 text-white p-4 rounded-2xl font-mono">
      {georgeUp && <img src={GeorgeImage.src} alt={"CG"} className="bg-transparent w-32" />}
      <Terminal 
      className="[&_.p-terminal-input]:bg-transparent
      [&_.p-terminal-input]:outline-none
      [&_.p-terminal-content]:break-words
      " prompt="cameron@entity $"/>
      </div>
      );
}


export default function Home() {
  return (
    <>
      <Head>
        <title>cameron</title>
        <meta name="description" content="foo" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-900">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold font-mono tracking-tight text-white sm:text-[5rem]">
            cameron
          </h1>
          <div className="text-white bg-gradient-to-b border-white">
          
          <TerminalDemo />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <div className="flex flex-col items-center justify-center gap-4">
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
