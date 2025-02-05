import { CardDescription } from "@/components/ui/card";
import React from "react";
import Markdown from "react-markdown";

export default function AIResponse ({ response }: { response: string }) {
  return (
    <CardDescription>
        <Markdown disallowedElements={["h1", "h2", "p"]} unwrapDisallowed className="whitespace-pre-wrap">
            {response}
        </Markdown>
    </CardDescription>
  );
};
