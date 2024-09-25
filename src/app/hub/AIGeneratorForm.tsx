"use client"

import * as React from "react"
import { useState, useEffect } from 'react';

import { 
  RadioGroup, Radio,
  Button,
  Input,
  Dropdown, DropdownMenu, DropdownItem, DropdownTrigger,
  Spinner
} from "@nextui-org/react";

import type { Selection } from "@react-types/shared";

import { BsStars } from "react-icons/bs";

import { Gallery } from "next-gallery"
import { SelectedOverlay, OverlayProvider } from './components/SelectedOverlay'
import Spacer from "./components/Spacer";
// import FileUpload from "./components/FileUpload"

import { usePDFStore } from '@/providers/pdf-store-provider';
import { BundleInputs } from "../utils/helpers";

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
  { prompt: "View previously used prompts" },
  { prompt: "Too high" },
  { prompt: "Peer pressure" },
];

const customPrompts = [
  { prompt: "View previously used prompts" },
  { prompt: "Blue Lock styled" },
  { prompt: "Lookism styled" },
  { prompt: "Has guy smoking weed" },
  { prompt: "People playing sports" },
];

const widths = [500, 1000, 1600]
const ratios = [2.2, 4, 6, 8]

const formats: radioType[] = [
  {
    id: "Info Package",
    label: "Info Package",
  },
  {
    id: "Poster",
    label: "Poster",
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
  const [dropdownSelectedReason1, setDropdownSelectedReason1] = useState(() => {
    const saved = localStorage.getItem('dropdownSelectedReason1');
    return saved ? JSON.parse(saved) : reasonPrompts;
  });
  const [customSelectedReason1, setCustomSelectedReason1] = useState(() => {
    const saved = localStorage.getItem('customSelectedReason1');
    return saved ? JSON.parse(saved) : customPrompts;
  });
  const [customSelectedReason, setCustomSelectedReason] = useState<Selection>(new Set([customPrompts[0].prompt]));
  const [dropdownSelectedReason, setDropdownSelectedReason] = useState<Selection>(new Set([reasonPrompts[0].prompt]));
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);
  const [generatedFormat, setGeneratedFormat] = useState<string>('Info Package');

  useEffect(() => {
    localStorage.setItem('dropdownSelectedReason1', JSON.stringify(dropdownSelectedReason1));
  }, [dropdownSelectedReason1]);

  useEffect(() => {
    localStorage.setItem('customSelectedReason1', JSON.stringify(customSelectedReason1));
  }, [customSelectedReason1]);

  const { workingPDF, setWorkingPDF, loading, setLoading, completed, setCompleted, imageLoading, setImageLoading, imagePrompt, setImagePrompt } = usePDFStore(
    (state) => state,
  )

  React.useEffect(() => {
  }, [loading, completed]);

  const handleCreatePdf = () => {
    if (textReasons) {
      setCustomSelectedReason1([...customSelectedReason1, { prompt: textCustom }]);
      setDropdownSelectedReason1([...dropdownSelectedReason1, { prompt: textReasons }]);
    }
  };

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
         /*      (format.id === "Info Package") ? (
                <Radio key={format.id} value={format.id}>{format.label}</Radio>
              ) : (
                <Radio isDisabled key={format.id} value={format.id}>{format.label}</Radio>
              ) */
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
          <><Input
            key="textCustom"
            type="text"
            label="Insert custom target audience"
            labelPlacement="outside"
            placeholder="Enter any target audience that is not listed above"
            value={textCustom}
            onValueChange={setTextCustom} /><h3>or use previously used prompts</h3><Dropdown>
              <DropdownTrigger>
                <Button variant="faded">{customSelectedReason}</Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={customSelectedReason}
                onSelectionChange={setCustomSelectedReason}
                variant="faded"
              >
                {customSelectedReason1.map((item: { prompt: string }) => (
                  <DropdownItem key={item.prompt}>
                    {item.prompt}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown></>: null
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
            {dropdownSelectedReason1.map((item: { prompt: string }) => (
              <DropdownItem key={item.prompt}>
                {item.prompt}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        {/*<h2 className="font-medium">Select reference materials:</h2>
        <OverlayProvider>
          <Gallery
            {...{ images, widths, ratios }}
            lastRowBehavior="match-previous"
            overlay={(i) => <SelectedOverlay index={i} />}
          />
        </OverlayProvider>*/}

        <Spacer y={36}/>
        
        <Input
          key="attachments"
          type="file"
          label="Upload multiple files at once to be used as reference material (.pdf, .png, .jpg etc). Ensure the filename is relevant to the file content."
          labelPlacement="outside"
          multiple={true}
          onChange={(e) => setSelectedFiles(e.target.files ? Array.from(e.target.files) : null)}
        />
     
      </section>


      {/* FileUpload file format limits based on output format. Will have to implement this */}
      {/* <FileUpload label="Upload a file to be used as reference material (.png, .jpg)" /> */}

      {completed && <h2 className="text-green-700 font-semibold mt-4">{generatedFormat} has been generated! View the result in the "Edit" tab.</h2>}
      <Button isDisabled={loading || imageLoading} className="pr-4 my-4 rounded bg-primary text-primary-foreground shadow hover:bg-primary/90" onPress={async () => 
        {
          handleCreatePdf();
          setCompleted(false);
          setLoading(true);
          setGeneratedFormat(radioFormat)
          const cr = Array.from(customSelectedReason).join('') === "View previously used prompts" ? textCustom : Array.from(customSelectedReason).join('');
          const dr = Array.from(dropdownSelectedReason).join('') === "View previously used prompts" ? textReasons : Array.from(dropdownSelectedReason).join('');
          const generatedText = await BundleInputs(radioFormat, radioAudience, cr, dr, selectedFiles, setImagePrompt) as string;
          // setText(generatedText);
          setWorkingPDF({ content: generatedText });
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