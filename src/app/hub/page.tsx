"use client";

import React, { useState } from "react";
import Link from 'next/link';
// import {NextUIProvider, Tabs, Tab, Spacer, Button} from "@nextui-org/react";
import { Button1 } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/VerticalTabs";

import AIGeneratorForm from "./AIGeneratorForm";
import EditForm from "./EditForm";


export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-muted">
      <section className="flex flex-col w-full items-center">
        <Tabs defaultValue="Generate" className="w-5/6">
          <TabsList>
            <TabsTrigger key="Generate" value="Generate">Generate</TabsTrigger>
            <TabsTrigger key="Edit" value="Edit">Edit</TabsTrigger>
            <Link href="/"><TabsTrigger key="Logout" value="Logout">Logout</TabsTrigger></Link>
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
