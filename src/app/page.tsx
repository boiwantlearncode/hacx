"use client";

import React, { useState } from "react";
// import {NextUIProvider, Tabs, Tab, Spacer, Button} from "@nextui-org/react";
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/VerticalTabs";
import Spacer from "./components/Spacer";

import AIGeneratorForm from "./AIGeneratorForm";
import EditForm from "./EditForm";


export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center p-16 bg-muted">
      <Spacer y={16}></Spacer>
      <section className="flex flex-col w-full items-center">
        <Tabs defaultValue="Generate" className="w-4/5">
          <TabsList>
            <TabsTrigger key="Generate" value="Generate">Generate</TabsTrigger>
            <TabsTrigger key="Edit" value="Edit">Edit</TabsTrigger>
          </TabsList>
            <TabsContent key="Generate" value="Generate" className="w-full">
              <AIGeneratorForm />
            </TabsContent>
            <TabsContent key="Edit" value="Edit" className="w-full">
              <EditForm />
            </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
