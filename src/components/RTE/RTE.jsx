import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
import conf from '../../conf/conf'

export default function RTE({ name, control, label, defaultValue = '', isRequired }) {
  return (
    <div className='w-full'>
      {label && <label className='text-sm font-medium text-left block mb-1 pl-1'>
        {label}
        {isRequired && (
          <span className='text-red-600'>
              *
          </span>
        )}
      </label>}

      <Controller 
        name={name || 'content'}
        control={control}
        render={({field: {onChange}}) => (
          <Editor 
              apiKey={conf.tinymceEditorKey}
              initialValue={defaultValue}
              init={
                  {
                      height: 500,
                      menubar: true,
                      plugins: [
                          "image",
                          "advlist",
                          "autolink",
                          "lists",
                          "link",
                          "image",
                          "charmap",
                          "preview",
                          "anchor",
                          "searchreplace",
                          "visualblocks",
                          "code",
                          "fullscreen",
                          "insertdatetime",
                          "media",
                          "table",
                          "code",
                          "help",
                          "wordcount",
                          "anchor",
                      ],
                      toolbar: "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                      content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                  }
              }
              onEditorChange={onChange}
          />
        )}
      />
    </div>
  )
}