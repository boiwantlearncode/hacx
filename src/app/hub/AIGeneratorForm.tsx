"use client"

import * as React from "react"
import { useState } from 'react';

import { 
  RadioGroup, Radio,
  Button,
  Input,
  Dropdown, DropdownMenu, DropdownItem, DropdownTrigger,
  Spinner
} from "@nextui-org/react";

import type { Selection } from "@react-types/shared";

import { BsEmojiAstonishedFill, BsStars } from "react-icons/bs";

import { Gallery } from "next-gallery"
import { SelectedOverlay, OverlayProvider } from './components/SelectedOverlay'
import Spacer from "./components/Spacer";
// import FileUpload from "./components/FileUpload"

// import { usePDFStore } from '@/lib/store';
// import type { PDFState } from '@/lib/store';
// import { shallow } from 'zustand/shallow';
import { usePDFStore } from '@/providers/pdf-store-provider';

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
    id: "Poster",
    label: "Poster",
  },
  {
    id: "Info Package",
    label: "Info Package",
  },
  {
    id: "Resource Toolkit",
    label: "Resource Toolkit",
  },
  {
    id: "Article",
    label: "Article",
  },
  {
    id: "Email",
    label: "Email",
  },
  {
    id: "Video",
    label: "Video",
  },
]

const audiences: radioType[] = [
  {
    id: "Everyone",
    label: "General (Everyone)",
  },
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
    id: "Singapore Armed Forces",
    label: "Singapore Armed Forces",
  },
  {
    id: "Singapore Police Force",
    label: "Singapore Police Force",
  },
  {
    id: "Singapore Civil Defence Force",
    label: "Singapore Civil Defence Force",
  },
  {
    id: "Parents",
    label: "Parents",
  },
  {
    id: "Athletes",
    label: "Athletes",
  },
  {
    id: "Custom (Specify)",
    label: "Custom (Specify)",
  },
]

export default function AIGeneratorForm() {

  // Handling the state of the form inputs

  const [radioFormat, setRadioFormat] = useState<string>('Info Package');
  const [radioAudience, setRadioAudience] = useState<string>('All Students');
  const [textCustom, setTextCustom] = useState<string>('');
  const [textReasons, setTextReasons] = useState<string>('');
  const [dropdownSelectedReason, setDropdownSelectedReason] = useState<Selection>(new Set([reasonPrompts[0].prompt]));
  const [generatedFormat, setGeneratedFormat] = useState<string>('Info Package');

  const { text, setText, loading, setLoading, completed, setCompleted } = usePDFStore(
    (state) => state,
  )

  React.useEffect(() => {
  }, [loading, completed]);

  return (
    <main className="flex flex-col w-full items-center">
      <section className="w-4/5 py-8 px-10 space-y-8 bg-background rounded-lg">
        <h1 className="text-xl text-foreground">Generate your PDE Materials</h1>
        <RadioGroup
          label="Select resource type"
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
          label="Select target audience: "
          value={radioAudience}
          onValueChange={setRadioAudience}
        >
          {
            audiences.map((audience) => (
              <Radio key={audience.id} value={audience.id}>{audience.label}</Radio>
            ))
          }
        </RadioGroup>
        <Spacer y={6}/>
        {radioAudience == "Custom (Specify)" ? 
          <Input
            key="textCustom"
            type="text"
            label="Insert custom target audience"
            labelPlacement="outside"
            placeholder="Enter any target audience that is not listed above"
            value={textCustom}
            onValueChange={setTextCustom}
          /> : null
        }
        <Spacer y={24}/>
        <Input
          key="textReasons"
          type="text"
          label="Reasons for drug usage"
          labelPlacement="outside"
          placeholder="Enter any reason(s) that the target audience engage in drug usage."
          value={textReasons}
          onValueChange={setTextReasons}
        />
        <h3>or use previously used prompts</h3>
        <Dropdown>
          <DropdownTrigger>
            <Button variant="faded">{dropdownSelectedReason}</Button>
          </DropdownTrigger>
          <DropdownMenu 
            disallowEmptySelection
            selectionMode="single" 
            selectedKeys={dropdownSelectedReason}
            onSelectionChange={setDropdownSelectedReason}
            variant="faded"
          >
            {reasonPrompts.map((item) => (
              <DropdownItem key={item.prompt}>
                {item.prompt}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <h2 className="font-medium">Select reference materials:</h2>
        <OverlayProvider>
          <Gallery
            {...{ images, widths, ratios }}
            lastRowBehavior="match-previous"
            overlay={(i) => <SelectedOverlay index={i} />}
          />
        </OverlayProvider>

        <Spacer y={24}/>
     
        <span>Upload a file</span>
        
        <Input
          key="attachments"
          type="file"
          label="Upload a file to be used as reference material (.pdf, .png, .jpg etc). Ensure the filename is relevant to the file content."
          labelPlacement="outside"
        />
      
     
      </section>


      {/* FileUpload file format limits based on output format. Will have to implement this */}
      {/* <FileUpload label="Upload a file to be used as reference material (.png, .jpg)" /> */}

      {completed && <h2 className="text-green-700 font-semibold mt-4">{generatedFormat} has been generated! View the result in the "Edit" tab.</h2>}
      <Button isDisabled={loading} className="pr-4 my-4 rounded bg-primary text-primary-foreground shadow hover:bg-primary/90" onPress={async () => 
        {
          setCompleted(false);
          setLoading(true);
          setGeneratedFormat(radioFormat)
          const generatedText = await BundleInputs(radioFormat, radioAudience, textCustom, textReasons, dropdownSelectedReason as Set<string>);
          setText(generatedText);
          setLoading(false);
          setCompleted(true);
        }
      }>
        {/* Keep the spinner even when switch tabs */}
        {loading ? <Spinner color="default" size="sm" /> : <BsStars className="mr-1 h-3 w-3" />}Generate
      </Button>
    </main>
  )
}

async function ChatBotResponse(input: string, target: string) {
  console.log("ChatBotResponse called!")
  // console.log(input);
  try {
    const response = await fetch('../api/chatbot', { // Ensure the correct API route
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: input, audience: target }),
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
    const data = JSON.parse(responseText).message;
    // console.log(data);
    return data;
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

async function BundleInputs(format: string, audience: string, customAudience: string, reason: string, selectedReason: Set<string>) {

  // console.log over here look at browser!!!
  const prompt: string = `
    Consider the following information and generate the necessary materials that is appropriate for all the target audience listed.
    You should consider the background of the target audience and the potential ways they might get involved in drug usage, and address these issues in your response.
    Target audience: ${audience === "Custom (Specify)" ? customAudience : audience}
    Reasons the target audience use drugs: ${reason || "NIL"}
    Additional reasons the target audience use drugs: ${selectedReason.values().next().value || "NIL"}
  `
    .split('\n')
    .map(line => line.trim())
    .join('\n')
    .trim();

  switch (format) {
    case "Poster":
      console.log("In construction");
      break;
    case "Info Package": // Only one we have implemented
      console.log(prompt);
      return await ChatBotResponse(prompt, audience);
    case "Resource Toolkit":
      console.log("In construction");
      break;
    case "Article":
      console.log("In construction");
      break;
    case "Email":
      console.log("In construction");
      break;
    case "Video":
      console.log("In construction");
      break;
  }
}
