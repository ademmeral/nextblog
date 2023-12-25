'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
});
import Buttons from './Buttons';
import "./quill.bubble.css";
import s from './style.module.css';

function PostWriteForm() {
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')

  return (
    <form className={`${s.wrapper} wrapper`}>
      <textarea
        name="title"
        className={s.title}
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        placeholder="Title..."
      />
      <article className={`${s.article}`}>
        <ReactQuill
          theme='bubble'
          value={content}
          onChange={setContent}
          placeholder='Content...'
        />
        <Buttons />
      </article>
    </form>
  )
}

export default PostWriteForm