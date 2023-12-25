import { useState, useEffect, useRef } from 'react';
import XFetch from '@/XFetch/api';
import s from './style.module.css';

type PropsType = {
  comment : SingleComment,
  newComment: string,
  setNewComment : React.Dispatch<React.SetStateAction<string>>,
  setIsEditing : React.Dispatch<React.SetStateAction<boolean>>,
}

function CommentEdit({comment, newComment, setNewComment, setIsEditing}: PropsType) {
  const [disabled, setDisabled] = useState(false);
  const [message, setMessage] = useState('');
  const [err, setErr] = useState(false);
  let {current : timeout} = useRef(0)
  
  useEffect(() => {
    if (comment.content === newComment) setDisabled(true)
    else setDisabled(false);
  }, [newComment])

  async function handleSubmit(){
    XFetch.resume();
    window.clearTimeout(timeout);
    try{
      const resp = await XFetch.put(
          `/comments/single/${comment._id}`, 
          {content : newComment}
      );
      const result = await resp.json();
      if (resp.status > 299) throw new Error(result.message);
      setErr(false);
      setMessage(result.message);
      timeout = window.setTimeout(() => setIsEditing(false), 3000);
      setDisabled(true);
    } catch (err) {
      console.log(err)
      setErr(true);
      if (err instanceof Error)
        setMessage(err.message);
    } finally { XFetch.cancel() };
  }
  console.log(message)
  return (
    <li className={s.textarea} id={s.edit}>
    <textarea
      value={newComment} 
      onChange={(e) => setNewComment(e.target.value)}
      id={s.textarea}
      className='edit'
    />
    <div className={s.sendArea}>
      <span className={`${err ? 'text-red-600': 'text-green-600'} mr-4`}>
        {message}
      </span>
      <button
        type='button'
        onClick={handleSubmit}
        disabled={disabled}
        className={s.submit}
      >Update
      </button>
      <button
        type='button'
        onClick={() => setIsEditing(false)}
        className={s.submit}
      >Cancel
      </button>
    </div>
  </li>
  )
}

export default CommentEdit