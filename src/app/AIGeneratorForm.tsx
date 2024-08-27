"use client"

import * as React from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { Gallery } from "next-gallery"
import { SelectedOverlay, OverlayProvider } from './components/SelectedOverlay'
import FileUpload from "./components/FileUpload"

const images = [
    { src: "/first.jpg", aspect_ratio: 16/9 },
    { src: "/second.png", aspect_ratio: 16/9 },
    { src: "/third.png", aspect_ratio: 16/9 },
    { src: "/forth.png", aspect_ratio: 16/9 },
]

const widths = [ 500, 1000, 1600 ]
const ratios = [ 2.2, 4, 6, 8 ]

const formats = [
  {
    id: "poster",
    label: "Poster",
  },
  {
    id: "infographic",
    label: "Infographic",
  },
  {
    id: "email",
    label: "Email",
  },
  {
    id: "video",
    label: "Video",
  },
] as const

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
] as const

// const images = [
//   {
//     filename: "first.jpg", 
//     title: "First Image"
//   },
//   {
//     filename: "second.png",
//     title: "Second Image"
//   },
//   {
//     filename: "third.png",
//     title: "Third Image"
//   }
// ];

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

  // Carousel API
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
 
  React.useEffect(() => {
    if (!api) {
      return
    }
 
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <main className="flex flex-col w-full items-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-4/5 p-8 space-y-8 bg-background rounded-lg">
          <h1 className="text-xl text-foreground">Generate your PDE Materials</h1>
          {/* Output Format Checkboxes */}
          <FormField
            control={form.control}
            name="formats"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Select at least 1 output format(s):</FormLabel>
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
                  <FormLabel className="text-base">Select target audience(s):</FormLabel>
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
          <div className="w-64">
            <Label htmlFor="custom-audience">Custom Audience (Optional)</Label>
            <Input type="custom-audience" id="custom-audience" placeholder="Your prompt" />
          </div>
          <h2 className="font-medium">Select reference materials:</h2>

          <OverlayProvider>
            <Gallery 
              {...{images, widths, ratios}} 
              lastRowBehavior="match-previous"
              overlay={(i) => <SelectedOverlay index={i} />} 
            />
          </OverlayProvider>

          <FileUpload label="Upload a file to be used as reference material (.png, .jpg)" />

          <h1>&lt;EDITABLE OUTPUT MEDIA&gt;</h1>
          <h1>&lt;EXPORT BUTTON&gt;</h1>



          {/* <Carousel setApi={setApi} className="w-4/5">
            <CarouselContent>
              {images.map(({filename, title}) => {
                return (
                  <CarouselItem className="basis-1/3">
                    <Image
                      src={`/${filename}`}
                      width={200}
                      height={200}
                      alt={`${title}`}
                    />
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="py-2 text-center text-sm text-muted-foreground">
            Slide {current} of {Math.ceil(count / 3)}
          </div> */}

          {/* <Button type="submit">Submit</Button> */}
        </form>
      </Form>

    </main>
  )
}