import { useEffect, useRef, useState } from "react";
import styles from "~/styles/index.css"
import type {
  LinksFunction,
  MetaFunction,
} from "@remix-run/node";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles},
]

export const meta: MetaFunction = () => {
  return [
    { title: "Alan Lee | Terminal" },
    { name: "description", content: "Welcome to my profile!" },
  ];
};

export default function Index() {
  const texterRef = useRef<HTMLTextAreaElement>(null);
  const typerRef = useRef<HTMLSpanElement>(null);
  const linerRef = useRef<HTMLDivElement>(null);
  const charIndex = useRef(0);
  const arrayIndex = useRef(0);
  const currentStrArray = useRef(welcomeBanner);

  const [content, setContent] = useState("");
  
  useEffect(() => {
    const sentence = currentStrArray.current[arrayIndex.current];
    if (arrayIndex.current < currentStrArray.current.length) {
      if (charIndex.current < sentence.length) {
        let addChar = setInterval(tick, 2);
        return () => clearInterval(addChar);
      } else {
        charIndex.current = 0;
        arrayIndex.current++;
        setContent(content + " ");
      }
    }

    function tick() {
      setContent(content + sentence[charIndex.current]);
      charIndex.current++;
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [content]);

  return (
    <div id="background" onClick={() => texterRef.current?.focus()}>
      <div id="terminal">
        <div id="terminalContent" className="multiline">
          {content}
        </div>
      </div>
      <div id="command">
        <textarea
          id="texter"
          ref={texterRef}
          autoFocus
          onChange={(event) => {
            if (
              typerRef.current != undefined &&
              texterRef.current != undefined
            ) {
              typerRef.current.innerText = texterRef.current.value;
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
            } else if (event.key === "ArrowUp") {
              // TODO:
            } else if (event.key === "ArrowDown") {
              // TODO:
            } else if (event.key === "ArrowLeft") {
              event.preventDefault();
            } else if (event.key === "ArrowRight") {
              event.preventDefault();
            }
          }}
          onKeyUp={(event) => {
            if (
              typerRef.current != undefined &&
              texterRef.current != undefined
            ) {
              if (event.key === "Enter") {
                const prefix = "[visitor@alanlee.app ~]$ ";
                const command = texterRef.current.value.trim();
                texterRef.current.value = "";
                typerRef.current.innerText = "";
                // Excuting command
                switch (command) {
                  case "help":
                    currentStrArray.current = help;
                    break;
                  case "whois":
                    currentStrArray.current = whois;
                    break;
                  case "github":
                    currentStrArray.current = github;
                    setTimeout(function () {
                      window.open(
                        "https://github.com/alansiuminglee/portfolio/tree/master"
                      );
                    }, 1000);
                    break;
                  case "linkedin":
                    currentStrArray.current = linkedin;
                    setTimeout(function () {
                      window.open(
                        "https://www.linkedin.com/in/alan-ka-yan-lee-b1a57a1ab/"
                      );
                    }, 1000);
                    break;
                  case "email":
                    currentStrArray.current = email;
                    setTimeout(function () {
                      window.open("mailto:lky0201@hotmail.com", "_self");
                    }, 1000);
                    break;
                  case "clear":
                    break;
                  case "sudo":
                    currentStrArray.current = admin;
                    break;
                  case "exit":
                    currentStrArray.current = exit;
                    if (linerRef.current != undefined)
                      linerRef.current.hidden = true;
                    break;
                  default:
                    currentStrArray.current = cmdNotFound;
                }

                if (command === "clear") {
                  setContent("");
                } else {
                  arrayIndex.current = 0;
                  setContent(content + "\n " + prefix + command + "\n ");
                }
              }
            }
          }}
        />
      </div>
      <div id="liner" ref={linerRef}>
        <span id="typer" ref={typerRef}></span>
        <b id="cursor" className="cursor">
          █
        </b>
      </div>
    </div>
  );
}

const cmdNotFound = [
  "Command not found. For a list of commands, type 'help'."
];

const welcomeBanner = [
  " No Copyright (C). No right reserved.\n",
  "   __  __         _____                   _             _ \n",
  "  |  \\/  |_   _  |_   _|__ _ __ _ __ ___ (_)_ __   __ _| |\n",
  "  | |\\/| | | | |   | |/ _ \\ '__| '_ ` _ \\| | '_ \\ / _` | |\n",
  "  | |  | | |_| |   | |  __/ |  | | | | | | | | | | (_| | |\n",
  "  |_|  |_|\\__, |   |_|\\___|_|  |_| |_| |_|_|_| |_|\\__,_|_|\n",
  "          |___/                                           \n",
  "\n",
  "Welcom to my terminal profile\n",
  "For a list of available commands, type 'help'.",
];

const help = [
  " \n",
  " whois             Who is Alan Lee\n",
  " github            View Github\n",
  " linkedin          View LinkedIn\n",
  " email             Email me\n",
  " clear             clear terminal\n",
];

const whois = [
  " \n",
  " Hi, I am Alan Lee👋\n",
  " \n",
  " I bring over 7 years of dedicated experience in\n",
  " back-end development, coupled with active involvement\n",
  " in front-end development projects.\n",
  " \n",
  " My proficiency spans versatile programming languages\n",
  " such as Java, C#, and other object-oriented languages.\n",
  " \n",
  " I possess in-depth knowledge and hands-on experience\n",
  " in customizing and leveraging IBM FileNet-related products.\n",
  " \n",
  " Furthermore, I have a proven track record in constructing\n",
  " robust network infrastructures using IIS and Azure Front Door.\n",
];

const github = [" \n", " Opening github...\n"];

const linkedin = [" \n", " Opening LinkedIn...\n"];

const email = [" \n", " Opening Email...\n"];

const admin = ["Permission denied"];

const exit = ["logout\n\n", "Thank you for your time ^_^"];
