"use client"

import * as React from "react"
import { useState } from 'react';

import { 
  RadioGroup, Radio,
  Button,
  Input,
  Dropdown, DropdownMenu, DropdownItem, DropdownTrigger
} from "@nextui-org/react";

import {Selection} from "@react-types/shared";

import { BsEmojiAstonishedFill, BsStars } from "react-icons/bs";

import { Gallery } from "next-gallery"
import { SelectedOverlay, OverlayProvider } from './components/SelectedOverlay'
// import FileUpload from "./components/FileUpload"

/*              Documentation reference                */

/*
  Input variables that will be bundled together into prompt.
  (1) watchFormats
  (2) watchAudiences
  (3) textCustomValue
  (4) textReasonValue
  (5) dropdownReasonValue
                                
*/

type radioType = {
  id: string,
  label: string
}


const images = [
  { src: "/first.jpg", aspect_ratio: 16 / 9 },
  { src: "/second.png", aspect_ratio: 16 / 9 },
  { src: "/third.png", aspect_ratio: 16 / 9 },
  { src: "/forth.png", aspect_ratio: 16 / 9 },
]

const reasonPrompts = [
  { prompt: "Too high" },
  { prompt: "Peer pressure" },
];

// const customPrompts = [
//   { prompt: "View previously used prompts" },
//   { prompt: "Blue Lock styled" },
//   { prompt: "Lookism styled" },
//   { prompt: "Has guy smoking weed" },
//   { prompt: "People playing sports" },
// ];

const widths = [500, 1000, 1600]
const ratios = [2.2, 4, 6, 8]

const formats: radioType[] = [
  {
    id: "poster",
    label: "Poster",
  },
  {
    id: "info-package",
    label: "Info Package",
  },
  {
    id: "resource-toolkit",
    label: "Resource Toolkit",
  },
  {
    id: "article",
    label: "Article",
  },
  {
    id: "email",
    label: "Email",
  },
  {
    id: "video",
    label: "Video",
  },
]

const audiences: radioType[] = [
  {
    id: "All Students",
    label: "Students (General)",
  },
  {
    id: "Primary School Students",
    label: "Primary School",
  },
  {
    id: "Secondary School Students",
    label: "Secondary School",
  },
  {
    id: "Tertiary Level Students",
    label: "Tertiary Level",
  },
  {
    id: "University Students",
    label: "University",
  },
  {
    id: "SAF (Singapore Armed Forces)",
    label: "SAF (Singapore Armed Forces)",
  },
  {
    id: "SPF (Singapore Police Force)",
    label: "SPF (Singapore Police Force)",
  },
  {
    id: "SCDF (Singapore Civil Defence Force)",
    label: "SCDF (Singapore Civil Defence Force)",
  },
  {
    id: "Parents",
    label: "Parents",
  },
  {
    id: "Athletes",
    label: "Athletes",
  },
]

export default function AIGeneratorForm() {

  // Handling the state of the form inputs

  const [radioFormat, setRadioFormat] = useState<string>('');
  const [radioAudience, setRadioAudience] = useState<string>('');
  const [textCustom, setTextCustom] = useState<string>('');
  const [textReasons, setTextReasons] = useState<string>('');
  // const [dropdownSelectedReason, setDropdownSelectedReason] = useState<string>(reasonPrompts[0].prompt);
  const [dropdownSelectedReason, setDropdownSelectedReason] = useState<Selection>(new Set([reasonPrompts[0].prompt]));

  // Filter prompts based on input value
  // const filterPrompts = reasonPrompts.filter(item =>
  //   item.prompt.toLowerCase().includes(textReasonValue.toLowerCase())
  // );


  return (
    <main className="flex flex-col w-full items-center">
      <section className="w-4/5 py-8 px-10 space-y-8 bg-background rounded-lg">
        <h1 className="text-xl text-foreground">Generate your PDE Materials</h1>
        <RadioGroup
          label="Select your favorite city"
          value={radioFormat}
          onValueChange={setRadioFormat}
        >
          {
            formats.map((format) => (
              <Radio key={format.id} value={format.id}>{format.label}</Radio>
            ))
          }
        </RadioGroup>
        <RadioGroup
          label="Select target audience(s): "
          value={radioAudience}
          onValueChange={setRadioAudience}
        >
          {
            audiences.map((audience) => (
              <Radio key={audience.id} value={audience.id}>{audience.label}</Radio>
            ))
          }
        </RadioGroup>
        <Input
          key="textCustom"
          type="text"
          label="Custom target audience"
          labelPlacement="outside"
          placeholder=""
          description="Enter any target audience that are not listed above."
          value={textCustom}
          onValueChange={setTextCustom}
        />
        <Input
          key="textReasons"
          type="text"
          label="Reasons for drug usage"
          labelPlacement="outside"
          placeholder=""
          description="Enter any reason(s) that the target audience engage in drug usage."
          value={textReasons}
          onValueChange={setTextReasons}
        />
        <h2>View previously used prompts</h2>
        <Dropdown>
          <DropdownTrigger>
            <Button>{dropdownSelectedReason}</Button>
          </DropdownTrigger>
          <DropdownMenu 
            className="bg-white border-2 rounded border-black" 
            selectionMode="single" 
            selectedKeys={dropdownSelectedReason}
            onSelectionChange={setDropdownSelectedReason}
          >
            {reasonPrompts.map((item) => (
              <DropdownItem key={item.prompt} className="border-none hover:bg-slate-200">
                {item.prompt}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

      </section>

      <h2 className="font-medium">Select reference materials:</h2>
      <OverlayProvider>
        <Gallery
          {...{ images, widths, ratios }}
          lastRowBehavior="match-previous"
          overlay={(i) => <SelectedOverlay index={i} />}
        />
      </OverlayProvider>

      {/* FileUpload file format limits based on output format. Will have to implement this */}
      {/* <FileUpload label="Upload a file to be used as reference material (.png, .jpg)" /> */}

      {/* <Button className="pr-4 rounded bg-primary text-primary-foreground shadow hover:bg-primary/90" onPress={() => {BundleInputs(watchFormats, watchAudiences, textCustomValue, textReasonValue, dropdownReasonValue); ChatBotResponse(textCustomValue); GenerateImage(textCustomValue)}}> */}
      <Button className="pr-4 rounded bg-primary text-primary-foreground shadow hover:bg-primary/90" onPress={() => {BundleInputs(radioFormat, radioAudience, textCustom, textReasons, dropdownSelectedReason as Set<string>)}}>
      {/* <Button className="pr-4 rounded bg-primary text-primary-foreground shadow hover:bg-primary/90" onPress={() => {GenerateImage("HI")}}> */}
        <BsStars className="mr-1 h-3 w-3" />Generate
      </Button>
    </main>
  )
}

async function ChatBotResponse(input: string) {
  console.log("ChatBotResponse called!")
  console.log(input);
  try {
    const response = await fetch('../api/chatbot', { // Ensure the correct API route
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: input }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Check if the response has content before trying to parse it
    const responseText = await response.text();
    if (!responseText) {
      throw new Error('Empty response from server');
    }

    // Parse the response as JSON
    console.log("Before parsing");
    const data = JSON.parse(responseText);
    console.log(data);
    console.log("Inside AIGeneratorForm.tsx");
    console.log(data.response);
    return data.response;
  } catch (error) {
    console.error('Error parsing JSON or fetching data:', error);
  }
}

async function GenerateImage(input: string) {
  console.log(input)
  try {
    const response = await fetch('../api/imager', { // Ensure the correct API route
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: input }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Check if the response has content before trying to parse it
    const responseText = await response.text();
    if (!responseText) {
      throw new Error('Empty response from server');
    }

    // Parse the response as JSON
    console.log("Before parsing");
    const data = JSON.parse(responseText);
    console.log("Inside AIGeneratorForm.tsx");
    console.log(data.response);
  } catch (error) {
    console.error('Error parsing JSON or fetching data:', error);
  }
}

async function BundleInputs(format: string, audience: string, textCustomValue: string, textReasonValue: string, dropdownSelectedReason: Set<string>) {

  // console.log over here look at browser!!!
  const prompt: string = `
    Consider the following information and generate the necessary materials that is appropriate for all the target audience listed:
    Target audiences: ${audience || "NIL"}
    Additional target audience: ${textCustomValue || "NIL"}
    Reasons the target audience use drugs: ${textReasonValue || "NIL"}
    Additional reasons the target audience use drugs: ${dropdownSelectedReason.values().next().value || "NIL"}
  `
    .split('\n')
    .map(line => line.trim())
    .join('\n')
    .trim();

  switch (format) {
    case "poster":
      console.log("In construction");
      break;
    case "info-package": // Only one we have implemented
      console.log(prompt);
      ChatBotResponse(prompt);
      break;
    case "resource-toolkit":
      console.log("In construction");
      break;
    case "article":
      console.log("In construction");
      break;
    case "email":
      console.log("In construction");
      break;
    case "video":
      console.log("In construction");
      break;
  }
}
