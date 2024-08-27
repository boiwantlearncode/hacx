"use client";

import React, { useState } from "react";
// import {NextUIProvider, Tabs, Tab, Spacer, Button} from "@nextui-org/react";
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/VerticalTabs";
import Spacer from "./components/Spacer";

import AIGeneratorForm from "./AIGeneratorForm";


export default function Home() {
  // Content will contain the saved information
  const [tabs, setTabs] = useState([
    {
      title: "Tab 1",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      title: "Tab 2",
      content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
      title: "Tab 3",
      content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
  ]);

  const addTab = () => {
    setTabs([...tabs, {
      title: `Tab ${tabs.length + 1}`,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }]);
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-16 bg-muted">
      <Spacer y={16}></Spacer>
      <section className="flex flex-col w-full items-center">
        <Tabs defaultValue="Tab 1" className="w-4/5">
          <TabsList>
            {Array.from(tabs).map(({title, content}) => (
              <TabsTrigger key={title} value={title}>{title}</TabsTrigger>
            ))}
            <Button variant="ghost" className="w-full h-8 mt-2" onClick={addTab}>+</Button>
          </TabsList>
          {Array.from(tabs).map(({title, content}) => (
            <TabsContent key={title} value={title} className="w-full">
              <AIGeneratorForm />
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </main>
  );
}
