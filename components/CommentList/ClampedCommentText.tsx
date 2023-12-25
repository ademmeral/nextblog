'use client'

import { useState } from "react"
import { compactByWords } from "@/utils/utils";
import s from './style.module.css';

function ClampedCommentText({content} : {content:string}) {
  const [readMore, setReadMore] = useState(false);
  const compactedContent = compactByWords(content, 20);
  const condition = content.length > compactedContent.length;

  return (
    <article className={s.article}>
      <p className={!readMore ? "line-clamp-3" : ''}>
        {readMore ? content : compactedContent}
      </p>
      {condition
        ? (
          <button type="button" className={s.readMore} onClick={() => setReadMore(!readMore)}>
            <small>{readMore ? 'Read less' : 'Read more'}</small>
          </button>
        ) : ''
      }
    </article>
  )
}

export default ClampedCommentText