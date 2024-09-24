import PDFEditor from "./components/PDFEditor";
import TinyEditor from "./components/TinyEditor";

export default function EditForm() {
  return (
    <main className="flex flex-col w-full items-center">
      {/* <PDFEditor /> */}
      <TinyEditor />
    </main>
  )
}