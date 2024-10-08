"use client";

import React, { useState } from "react";
import Link from 'next/link';
// import {NextUIProvider, Tabs, Tab, Spacer, Button} from "@nextui-org/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/VerticalTabs";
import Spacer from "./components/Spacer";
import { useUser } from '../../context/userContext'; 

import AIGeneratorForm from "./AIGeneratorForm";
import EditForm from "./EditForm";


export default function Home() {
  const { username } = useUser();

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-muted">
      <h1 className="text-xl font-normal text-center"><em>Welcome, {username}</em></h1>
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
