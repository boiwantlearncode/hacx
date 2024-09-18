"use client"

import * as React from "react"
import { useState } from 'react';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button1 } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Button } from "@nextui-org/button";

import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger
} from "@nextui-org/dropdown";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { toast } from "@/components/ui/use-toast"

import { BsEmojiAstonishedFill, BsStars } from "react-icons/bs";

import { Gallery } from "next-gallery"
import { SelectedOverlay, OverlayProvider } from './components/SelectedOverlay'
import FileUpload from "./components/FileUpload"

/*              Documentation reference                */

/*
  Input variables that will be bundled together into prompt.
  (1) watchFormats
  (2) watchAudiences
  (3) textCustomValue
  (4) textReasonValue
  (5) dropdownReasonValue
                                
*/

type checkboxType = {
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

const formats: checkboxType[] = [
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

const audiences: checkboxType[] = [
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

const FormSchema = z.object({
  formats: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select one output format.",
  }),
  audiences: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select one target audience.",
  }),
})

export default function AIGeneratorForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      formats: [],
      audiences: []
    },
  })

  // Handling the state of the form inputs
  const { watch } = form
  const watchFormats = watch("formats");
  const watchAudiences = watch("audiences");

  const [textCustomValue, setTextCustomValue] = useState<string>('');
  const [textReasonValue, setTextReasonValue] = useState<string>('');
  const [dropdownReasonValue, setDropdownReasonValue] = useState<string>(reasonPrompts[0].prompt);

  // Filter prompts based on input value
  const filterPrompts = reasonPrompts.filter(item =>
    item.prompt.toLowerCase().includes(textReasonValue.toLowerCase())
  );

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <main className="flex flex-col w-full items-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-4/5 py-8 px-10 space-y-8 bg-background rounded-lg">
          <h1 className="text-xl text-foreground">Generate your PDE Materials</h1>
          {/* Output Format Checkboxes */}
          <FormField
            control={form.control}
            name="formats"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Select at least 1 output format(s): <span className="text-red-400">*</span></FormLabel>
                </div>
                {formats.map((format) => (
                  <FormField
                    key={format.id}
                    control={form.control}
                    name="formats"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={format.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={""}
                              className="flex flex-col space-y-1"
                            >
                                <FormItem key={format.id} className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value={format.id} />
                                  </FormControl>
                                  {/* <FormLabel className="font-normal">
                                    {format.label}
                                  </FormLabel> */}
                                </FormItem>

                            </RadioGroup>

                            {/* <Checkbox
                              checked={field.value?.includes(format.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, format.id])
                                  : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== format.id
                                    )
                                  )
                              }}
                            /> */}
                          </FormControl>
                          <FormLabel className="font-normal">
                            {format.label}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Target Audience Checkboxes */}
          <FormField
            control={form.control}
            name="audiences"
            render={() => (
              <FormItem>
                <div className="my-2">
                  <FormLabel className="text-base">Select target audience(s): <span className="text-red-400">*</span></FormLabel>
                </div>
                {audiences.map((audience) => (
                  <FormField
                    key={audience.id}
                    control={form.control}
                    name="audiences"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={audience.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(audience.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, audience.id])
                                  : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== audience.id
                                    )
                                  )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {audience.label}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Custom Audience Input Field */}
          <div>
            <Label htmlFor="custom-audience">Custom Audience</Label>
            <Input
              className="w-96 mt-1"
              type="text"
              id="custom-audience"
              placeholder="Your prompt"
              value={textCustomValue}
              onChange={(e) => setTextCustomValue(e.target.value)}
            />
          </div>

          {/* Reasons the target audience uses drugs */}
          <div>
            <Label htmlFor="reasons">Reasons the target audience uses drugs</Label>
            <Input className="w-96 mt-1" type="text" id="reasons" placeholder="Enter reasons" value={textReasonValue}
              onChange={(e) => setTextReasonValue(e.target.value)} />
            {/* Show DropdownMenu if input is not empty */}
            {(
              <Dropdown>
                <DropdownTrigger>
                  <Button1>{dropdownReasonValue}</Button1>
                </DropdownTrigger>
                <DropdownMenu className="bg-white border-2 rounded border-black" selectionMode="single" selectedKeys={dropdownReasonValue}
                  onSelectionChange={setDropdownReasonValue}>
                  {filterPrompts.map((item) => (
                    <DropdownItem key={item.prompt} className="border-none hover:bg-slate-200">
                      {item.prompt}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            )}
          </div>



          <h2 className="font-medium">Select reference materials:</h2>
          <OverlayProvider>
            <Gallery
              {...{ images, widths, ratios }}
              lastRowBehavior="match-previous"
              overlay={(i) => <SelectedOverlay index={i} />}
            />
          </OverlayProvider>

          {/* FileUpload file format limits based on output format. Will have to implement this */}
          <FileUpload label="Upload a file to be used as reference material (.png, .jpg)" />

          {/* <Button className="pr-4 rounded bg-primary text-primary-foreground shadow hover:bg-primary/90" onPress={() => {BundleInputs(watchFormats, watchAudiences, textCustomValue, textReasonValue, dropdownReasonValue); ChatBotResponse(textCustomValue); GenerateImage(textCustomValue)}}> */}
          <Button className="pr-4 rounded bg-primary text-primary-foreground shadow hover:bg-primary/90" onPress={() => {BundleInputs(watchFormats, watchAudiences, textCustomValue, textReasonValue, dropdownReasonValue)}}>
          {/* <Button className="pr-4 rounded bg-primary text-primary-foreground shadow hover:bg-primary/90" onPress={() => {GenerateImage("HI")}}> */}
            <BsStars className="mr-1 h-3 w-3" />Generate
          </Button>
        </form>
      </Form>
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

async function BundleInputs(formats: string[], audiences: string[], textCustomValue: string, textReasonValue: string, dropdownReasonValue: string) {

  // console.log over here look at browser!!!
  const prompt: string = `
    Consider the following information and generate the necessary materials that is appropriate for all the target audience listed:
    Target audiences: ${audiences.join(" and ") || "NIL"}
    Additional target audience: ${textCustomValue || "NIL"}
    Reasons the target audience use drugs: ${textReasonValue || "NIL"}
  `
    .split('\n')
    .map(line => line.trim())
    .join('\n')
    .trim();
  console.log("BRUH");
  console.log(formats);

  formats.forEach((format) => {
    console.log("LOOK OVER HERE");
    console.log(format);
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
  });
}
