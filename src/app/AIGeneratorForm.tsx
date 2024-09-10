"use client"

import * as React from "react"
import { useState } from 'react';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button1 } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

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

import { BsStars } from "react-icons/bs";

import { Gallery } from "next-gallery"
import { SelectedOverlay, OverlayProvider } from './components/SelectedOverlay'
import FileUpload from "./components/FileUpload"

const images = [
  { src: "/first.jpg", aspect_ratio: 16 / 9 },
  { src: "/second.png", aspect_ratio: 16 / 9 },
  { src: "/third.png", aspect_ratio: 16 / 9 },
  { src: "/forth.png", aspect_ratio: 16 / 9 },
]

const reasonPrompts = [
  { prompt: "Continue with custom input" },
  { prompt: "Too high" },
  { prompt: "Peer pressure" },
];

const customPrompts = [
  { prompt: "Continue with custom input" },
  { prompt: "Blue Lock styled" },
  { prompt: "Lookism styled" },
  { prompt: "Has guy smoking weed" },
];

const widths = [500, 1000, 1600]
const ratios = [2.2, 4, 6, 8]

const formats = [
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

const audiences = [
  {
    id: "primary",
    label: "Primary",
  },
  {
    id: "secondary",
    label: "Secondary",
  },
  {
    id: "tertiary",
    label: "Tertiary",
  },
  {
    id: "university",
    label: "University",
  },
  {
    id: "saf",
    label: "SAF",
  },
  {
    id: "spf",
    label: "SPF",
  },
  {
    id: "scdf",
    label: "SCDF",
  },
  {
    id: "parents",
    label: "Parents",
  },
  {
    id: "athletes",
    label: "Athletes",
  },
]

const FormSchema = z.object({
  formats: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one output format.",
  }),
  audiences: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one target audience.",
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

  const [reasonValue, setReasonValue] = useState('');
  const [customValue, setCustomValue] = useState('');
  const [reasonConfirmedValue, setReasonConfirmedValue] = useState('Continue with custom input');
  const [customConfirmedValue, setCustomConfirmedValue] = useState('Continue with custom input');

  // Filter prompts based on input value
  const filterPrompts = reasonPrompts.filter(item =>
    item.prompt.toLowerCase().includes(reasonValue.toLowerCase())
  );

  const filteredPrompts = customPrompts.filter(item =>
    item.prompt.toLowerCase().includes(customValue.toLowerCase())
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
                            <Checkbox
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
                            />
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

          {/* Reasons for using drugs */}
          <div>
            <Label htmlFor="reasons">Reasons the target audience use drugs</Label>
            <Input className="w-96 mt-1" type="text" id="reasons" placeholder="Enter reasons" value={reasonValue}
              onChange={(e) => setReasonValue(e.target.value)} />
            {/* Show DropdownMenu if input is not empty */}
            {(
              <Dropdown>
                <DropdownTrigger>
                  <Button1>{reasonConfirmedValue}</Button1>
                </DropdownTrigger>
                <DropdownMenu className="bg-white border-2 rounded border-black" selectionMode="single" selectedKeys={reasonConfirmedValue}
                  onSelectionChange={setReasonConfirmedValue}>
                  {filterPrompts.map((item) => (
                    <DropdownItem key={item.prompt} className="border-none hover:bg-slate-200">
                      {item.prompt}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            )}
          </div>

          {/* Custom Audience Input Field */}
          <div>
            <Label htmlFor="custom-audience">Custom Audience</Label>
            <Input
              className="w-96 mt-1"
              type="text"
              id="custom-audience"
              placeholder="Your prompt"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
            />
            {/* Show DropdownMenu if input is not empty */}
            {(
              <Dropdown>
                <DropdownTrigger>
                  <Button1>{customConfirmedValue}</Button1>
                </DropdownTrigger>
                <DropdownMenu className="bg-white border-2 rounded border-black" selectionMode="single" selectedKeys={customConfirmedValue}
                  onSelectionChange={setCustomConfirmedValue}>
                  {filteredPrompts.map((item) => (
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

          <Button className="pr-4 rounded bg-primary text-primary-foreground shadow hover:bg-primary/90" onPress={() => { console.log(customConfirmedValue.anchorKey) }}>
            <BsStars className="mr-1 h-3 w-3" />Generate
          </Button>
        </form>
      </Form>

    </main>
  )
}
