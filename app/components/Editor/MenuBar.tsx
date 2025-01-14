/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useCallback } from 'react';

import {
  FaCode,
  FaBold,
  FaItalic,
  FaListUl,
  FaListOl,
  FaYoutube,
  FaRegImage,
  FaTurnDown,
  FaQuoteLeft,
  FaUnderline,
  FaAlignLeft,
  FaAlignRight,
  FaAlignCenter,
  FaAlignJustify,
  FaStrikethrough,
  FaWindowMinimize,
  FaLink,
} from 'react-icons/fa6';

import {
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuHeading4,
  LuHeading5,
  LuHeading6,
} from 'react-icons/lu';

import { FaRedoAlt, FaUndoAlt } from 'react-icons/fa';

import EditorButtons from './EditorButtons';

const MenuBar = ({ editor }: any) => {
  if (!editor) {
    return null;
  }

  const addImage = useCallback(() => {
    const url = window.prompt('URL');

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const addYouTubeVideo = () => {
    const url = window.prompt('Enter YouTube video URL');

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: 640,
        height: 480,
      });
    }
  };

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }

    // update link
    try {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run();
    } catch (e: any) {
      alert(e.message);
    }
  }, [editor]);

  return (
    <div className="editor-custom flex flex-wrap p-5 bg-gray-100 rounded-t-lg gap-5 md:gap-4">
      <EditorButtons
        title="Underline It"
        editor={editor}
        handleClick={() => editor.commands.toggleUnderline()}
        toggleName="underline"
      >
        <FaUnderline
          className={`${editor.isActive('underline') && 'text-primary'}`}
        />
      </EditorButtons>

      <EditorButtons
        title="Bold It"
        editor={editor}
        handleClick={() => editor.chain().focus().toggleBold().run()}
        toggleName="bold"
      >
        <FaBold className={`${editor.isActive('bold') && 'text-primary'}`} />
      </EditorButtons>

      <EditorButtons
        title="Italic"
        editor={editor}
        handleClick={() => editor.chain().focus().toggleItalic().run()}
        toggleName="italic"
      >
        <FaItalic
          className={`${editor.isActive('italic') && 'text-primary'}`}
        />
      </EditorButtons>

      <EditorButtons
        title="OverLine"
        editor={editor}
        handleClick={() => editor.chain().focus().toggleStrike().run()}
        toggleName="strike"
      >
        <FaStrikethrough
          className={`${editor.isActive('strike') && 'text-primary'}`}
        />
      </EditorButtons>

      <EditorButtons
        title="Align Right"
        editor={editor}
        handleClick={() => editor.chain().focus().setTextAlign('right').run()}
        toggleName={{ textAlign: 'right' }}
      >
        <FaAlignRight
          className={`${
            editor.isActive({ textAlign: 'right' }) && 'text-primary'
          }`}
        />
      </EditorButtons>

      <EditorButtons
        title="Align Center"
        editor={editor}
        handleClick={() => editor.chain().focus().setTextAlign('center').run()}
        toggleName={{ textAlign: 'center' }}
      >
        <FaAlignCenter
          className={`${
            editor.isActive({ textAlign: 'center' }) && 'text-primary'
          }`}
        />
      </EditorButtons>

      <EditorButtons
        title="Align Left"
        editor={editor}
        handleClick={() => editor.chain().focus().setTextAlign('left').run()}
        toggleName={{ textAlign: 'left' }}
      >
        <FaAlignLeft
          className={`${
            editor.isActive({ textAlign: 'left' }) && 'text-primary'
          }`}
        />
      </EditorButtons>

      <EditorButtons
        title="Justify"
        editor={editor}
        handleClick={() => editor.chain().focus().setTextAlign('justify').run()}
        toggleName={{ textAlign: 'justify' }}
      >
        <FaAlignJustify
          className={`${
            editor.isActive({ textAlign: 'justify' }) && 'text-primary'
          }`}
        />
      </EditorButtons>

      <EditorButtons
        title="Heading H1"
        editor={editor}
        handleClick={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
        toggleName="heading"
        level={1}
      >
        <LuHeading1
          className={`${
            editor.isActive('heading', { level: 1 })
              ? 'text-primary border-red-500'
              : 'text-black border-black'
          }`}
          size={22}
        />
      </EditorButtons>

      <EditorButtons
        title="Heading H2"
        toggleName="heading"
        editor={editor}
        handleClick={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
        level={2}
      >
        <LuHeading2
          className={`${
            editor.isActive('heading', { level: 2 })
              ? 'text-amber-500'
              : 'text-black'
          }`}
          size={22}
        />
      </EditorButtons>

      <EditorButtons
        title="Heading H3"
        editor={editor}
        handleClick={() =>
          editor.chain().focus().toggleHeading({ level: 3 }).run()
        }
        toggleName="heading"
        level={3}
      >
        <LuHeading3
          className={`${
            editor.isActive('heading', { level: 3 })
              ? 'text-amber-500'
              : 'text-black'
          }`}
          size={22}
        />
      </EditorButtons>

      <EditorButtons
        title="Heading H4"
        editor={editor}
        handleClick={() =>
          editor.chain().focus().toggleHeading({ level: 4 }).run()
        }
        toggleName="heading"
        level={4}
      >
        <LuHeading4
          className={`${
            editor.isActive('heading', { level: 4 })
              ? 'text-primary'
              : 'text-black'
          }`}
          size={22}
        />
      </EditorButtons>

      <EditorButtons
        title="Heading H5"
        editor={editor}
        handleClick={() =>
          editor.chain().focus().toggleHeading({ level: 5 }).run()
        }
        toggleName="heading"
        level={5}
      >
        <LuHeading5
          className={`${
            editor.isActive('heading', { level: 5 })
              ? 'text-primary'
              : 'text-black'
          }`}
          size={22}
        />
      </EditorButtons>

      <EditorButtons
        title="Heading H6"
        editor={editor}
        handleClick={() =>
          editor.chain().focus().toggleHeading({ level: 6 }).run()
        }
        toggleName="heading"
        level={6}
      >
        <LuHeading6
          className={`${
            editor.isActive('heading', { level: 6 })
              ? 'text-primary'
              : 'text-black'
          }`}
          size={22}
        />
      </EditorButtons>

      <EditorButtons
        title="Bullet List"
        editor={editor}
        handleClick={() => editor.chain().focus().toggleBulletList().run()}
        toggleName="bulletList"
      >
        <FaListUl
          className={`${editor.isActive('bulletList') && 'text-amber-500'}`}
        />
      </EditorButtons>

      <EditorButtons
        title="Ordered List"
        editor={editor}
        handleClick={() => editor.chain().focus().toggleOrderedList().run()}
        toggleName="orderedList"
      >
        <FaListOl
          className={`${editor.isActive('orderedList') && 'text-amber-500'}`}
        />
      </EditorButtons>

      <EditorButtons
        title="Codeblock"
        toggleName="codeblock"
        handleClick={() => editor.chain().focus().toggleCodeBlock().run()}
        editor={editor}
      >
        <FaCode
          className={`${
            editor.isActive('codeblock') ? 'text-primary' : 'text-black'
          }`}
        />
      </EditorButtons>

      <EditorButtons
        title="Blockquote"
        editor={editor}
        handleClick={() => editor.chain().focus().toggleBlockquote().run()}
        toggleName="blockquote"
      >
        <FaQuoteLeft
          className={`${editor.isActive('blockquote') && 'text-primary'}`}
        />
      </EditorButtons>

      <button
        title="Horizontal Rule"
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <FaWindowMinimize />
      </button>

      <button
        title="Hard Break"
        type="button"
        onClick={() => editor.chain().focus().setHardBreak().run()}
      >
        <FaTurnDown size={15} />
      </button>

      <button title="Add Image" type="button" onClick={addImage}>
        <FaRegImage />
      </button>

      <button title="Add YouTube Video" type="button" onClick={addYouTubeVideo}>
        <FaYoutube size={20} />
      </button>

      <button title="Anchor Link" type="button" onClick={setLink}>
        <FaLink size={20} />
      </button>

      <button
        title="Undo"
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <FaUndoAlt size={15} />
      </button>

      <button
        title="Redo"
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <FaRedoAlt size={15} />
      </button>
    </div>
  );
};

export default MenuBar;
