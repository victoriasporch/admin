/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from 'clsx';
import MenuBar from './MenuBar';

import Image from '@tiptap/extension-image';
import StarterKit from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color';
import YouTube from '@tiptap/extension-youtube';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import TextAlign from '@tiptap/extension-text-align';
import { Underline } from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import FileHandler from '@tiptap-pro/extension-file-handler';
import Link from '@tiptap/extension-link';

const Editor = ({ form }: { form: any }) => {
  const getContent = () => {
    if (
      typeof form.getValues('content') === 'string' &&
      form.getValues('content').length >= 1
    )
      return JSON.parse(form.getValues('content'));

    return form.getValues('content');
  };

  const editor = useEditor({
    extensions: [
      YouTube.configure({
        controls: true,
        nocookie: true,
      }),

      Underline.configure({}),

      Image.configure({
        allowBase64: true,
        inline: true,
        HTMLAttributes: {
          class: 'mx-auto w-full object-cover max-h-[300px]',
        },
      }),

      FileHandler.configure({
        allowedMimeTypes: [
          'image/png',
          'image/jpeg',
          'image/gif',
          'image/webp',
        ],
        onDrop: (currentEditor: any, files: any, pos: any) => {
          files.forEach((file: any) => {
            const fileReader = new FileReader();

            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
              currentEditor
                .chain()
                .insertContentAt(pos, {
                  type: 'image',
                  attrs: {
                    src: fileReader.result,
                  },
                })
                .focus()
                .run();
            };
          });
        },
        onPaste: (currentEditor: any, files: any, htmlContent: any) => {
          files.forEach((file: any) => {
            if (htmlContent) {
              // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
              // you could extract the pasted file from this url string and upload it to a server for example
              console.log(htmlContent); // eslint-disable-line no-console
              return false;
            }

            const fileReader = new FileReader();

            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
              currentEditor
                .chain()
                .insertContentAt(currentEditor.state.selection.anchor, {
                  type: 'image',
                  attrs: {
                    src: fileReader.result,
                  },
                })
                .focus()
                .run();
            };
          });
        },
      }),

      TextAlign.configure({
        types: ['heading', 'paragraph'],
        defaultAlignment: 'left',
      }),

      Color.configure({ types: [TextStyle.name, ListItem.name] }),

      //@ts-ignore
      TextStyle.configure({ types: [ListItem.name] }),

      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
        isAllowedUri: (url, ctx) => {
          try {
            // construct URL
            const parsedUrl = url.includes(':')
              ? new URL(url)
              : new URL(`${ctx.defaultProtocol}://${url}`);

            // use default validation
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false;
            }

            // disallowed protocols
            const disallowedProtocols = ['ftp', 'file', 'mailto'];
            const protocol = parsedUrl.protocol.replace(':', '');

            if (disallowedProtocols.includes(protocol)) {
              return false;
            }

            // only allow protocols specified in ctx.protocols
            const allowedProtocols = ctx.protocols.map((p) =>
              typeof p === 'string' ? p : p.scheme
            );

            if (!allowedProtocols.includes(protocol)) {
              return false;
            }

            // disallowed domains
            const disallowedDomains = [
              'example-phishing.com',
              'malicious-site.net',
            ];
            const domain = parsedUrl.hostname;

            if (disallowedDomains.includes(domain)) {
              return false;
            }

            // all checks have passed
            return true;
          } catch (error) {
            console.log({ error });
            return false;
          }
        },
        shouldAutoLink: (url) => {
          try {
            // construct URL
            const parsedUrl = url.includes(':')
              ? new URL(url)
              : new URL(`https://${url}`);

            // only auto-link if the domain is not in the disallowed list
            const disallowedDomains = [
              'example-no-autolink.com',
              'another-no-autolink.com',
            ];
            const domain = parsedUrl.hostname;

            return !disallowedDomains.includes(domain);
          } catch (error) {
            console.log({ error });
            return false;
          }
        },
      }),
    ],

    content: getContent(),
  });

  editor?.on('update', (e: any) => {
    const value = e.editor.getHTML();
    form.setValue('content', JSON.stringify(value));
  });

  return (
    <div
      className={clsx(
        'text-black rounded-xl overflow-hidden',
        form.formState.errors.content ? 'border border-red-400' : 'border'
      )}
    >
      <MenuBar editor={editor} />

      <EditorContent editor={editor} />

      {form.formState.errors.content && (
        <small className="text-red-400 p-2 text-xs">
          {form.formState.errors.content?.message}
        </small>
      )}
    </div>
  );
};

export default Editor;
