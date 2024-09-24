import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

import { 
  Button,
  Spinner
} from "@nextui-org/react";

import { usePDFStore } from '@/providers/pdf-store-provider';
import { BsStars } from 'react-icons/bs';
import { GenerateImage } from '@/app/utils/helpers';

export default function TinyEditor() {
  const { 
    text, setText, 
    loading, setLoading, 
    completed, setCompleted, 
    imageLoading, setImageLoading, 
    imagePrompt, setImagePrompt 
  } = usePDFStore(
    (state) => state,
  )

  useEffect(() => {
    setText('');
  }, []);

  return (
    <main className="w-full bg-background rounded-lg">
      {loading && <h2 className='text-center font-semibold py-4'>Generating PDF, please wait...</h2>}
      {imageLoading && <h2 className='text-center font-semibold py-4'>Regenerating image, please wait...</h2>}
      {completed && <h2 className='text-green-700 font-semibold text-center py-4'>PDF Generated!</h2>}

      <Button isDisabled={imagePrompt === '' || loading || imageLoading} className="pr-4 my-4 rounded bg-primary text-primary-foreground shadow hover:bg-primary/90" onPress={async () => 
        {
          setCompleted(false);
          setImageLoading(true);
          const imagesString = (await GenerateImage(imagePrompt))
                            .map((url: string) => `<img src="${url}" alt="Generated Image" height="240">`).join('<br>');
          console.log(imagesString);
          const imgTagPattern = /<img src="[^"]+" alt="Generated Image" height="240">/g;          
          console.log(text.replace(imgTagPattern, imagesString));
          setText(text.replace(imgTagPattern, imagesString));
          setImageLoading(false);
          setCompleted(true);
        }
      }>
        {/* Keep the spinner even when switch tabs */}
        {imageLoading ? <Spinner color="default" size="sm" /> : <BsStars className="mr-1 h-3 w-3" />}Regenerate image
      </Button>

      <Editor
        apiKey='gx6fx50hvmguud2inxshqdkfx8qi1qy2bqtcip6slgm8qmif'
        init={{
          plugins: [
            // Core editing features
            'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
            // Your account includes a free trial of TinyMCE premium features
            // Try the most popular premium features until Oct 7, 2024:
            'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'mentions', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown',
          ],
          toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
          height: "90vh",
        }}
        value={text}
        onEditorChange={(newValue, editor) => setText(newValue)}
      />

    </main>
  );
}