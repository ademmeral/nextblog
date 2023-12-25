'use client';

import { useAuth } from '@/contexts/AuthProvider';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import XFetch from '@/XFetch/api';
import s from './style.module.css';

function CommentTextArea() {
  const { auth } = useAuth();
  const [comment, setComment] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [message, setMessage] = useState('');
  const [currentUrl, setCurrentUrl] = useState<URL|null>();
  let {current : timeout} = useRef(0);

  useEffect(() => {
    if (window != undefined) 
      setCurrentUrl(new URL(window.location.href));
  }, [])

  useEffect(() => {
    comment.length > 10 ? setDisabled(false) : setDisabled(true);
  }, [comment])

  useEffect(() => {
    window.clearTimeout(timeout);
    if (message.length)
      timeout = window.setTimeout(() => setMessage(''), 10000)
  }, [message])

  async function handleSubmit() {
    XFetch.resume();
    try{
      if (!(currentUrl || auth)) return;
      const body = !!auth && { 
        content: comment, userId: auth._id, 
        postId : currentUrl?.searchParams.get('id')
      };
      const resp = await XFetch.post('/comments/single', body);
      const result = await resp.json()
      if (resp.status > 199 && resp.status < 300) 
        setMessage('Added successfully!')
      else throw new Error(result.message);
      setComment('');
    } catch (err){
      console.log(err);
      if (err instanceof Error) setMessage(err.message);
    };
    XFetch.cancel();
  }

  if (!auth) return (
    <article className={`${s.visitorText} visitorsText`}>
      <span>You should</span>
      <Link href={'/login'}>login</Link>
      <span>or</span>
      <Link href={'/register'}>register</Link>
      <span>to interact.</span>
    </article>
  )
  return (
    <div className={s.textarea}>
      <textarea
        name='comment'
        id={s.textarea}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        minLength={10}
        maxLength={250}
        placeholder="Your comment..."
      />
      <div className={s.sendArea}>
        <span className='text-green-600 mr-4'>{message}</span>
        <button 
          type='submit' 
          className={s.submit}
          onClick={handleSubmit}
          disabled={disabled}
        >Send
        </button>
      </div>
    </div>
  )
}

export default CommentTextArea