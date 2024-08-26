import {CheckboxGroup, Checkbox, Spacer} from "@nextui-org/react";

export default function Form() {
  return (
    <main className="flex-col px-12 w-full">
      <CheckboxGroup label="Select at least 1 output format(s):">
        <Checkbox value="poster">Poster</Checkbox>
        <Checkbox value="infographic">Infographic</Checkbox>
        <Checkbox value="email">Email</Checkbox>
        <Checkbox value="video">Video</Checkbox>
      </CheckboxGroup>
      <Spacer y={12} />
      <CheckboxGroup label="Select target audience(s):">
        <Checkbox value="students-primary">Primary School</Checkbox>
        <Checkbox value="students-secondary">Secondary School</Checkbox>
        <Checkbox value="students-tertiary">Post-Secondary Institutes</Checkbox>
        <Checkbox value="students-university">University</Checkbox>
        <Checkbox value="nsmen-saf">SAF</Checkbox>
        <Checkbox value="nsmen-spf">SPF</Checkbox>
        <Checkbox value="nsmen-scdf">SCDF</Checkbox>
      </CheckboxGroup>
      <Spacer y={12} />
      <h2>Select reference materials:</h2>
    </main>
  )
}