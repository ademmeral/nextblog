'use client';

import { useState, useEffect } from 'react';
import { useAuth } from "@/contexts/AuthProvider";
import { FaTrash, FaEdit } from "react-icons/fa";
import XFetch from "@/XFetch/api";
import s from './style.module.css';

type PropsType = {
  comment: SingleComment,
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

function CommentUptDelButtons({ comment, setIsEditing, setMessage}: PropsType) {
  const { auth } = useAuth();
  const cond = auth && (auth._id === comment.userId);

  async function handleClick(e:React.MouseEvent<HTMLButtonElement, MouseEvent>){
    const target = e.target as HTMLButtonElement;
    try {
      const resp = await XFetch.delete(`comments/single/${comment._id}`)
      const result = await resp.json();
      setMessage(result.message);
    } catch (err) {
      console.log(err);
      if (err instanceof Error)
        setMessage(err.message);
    }
  }

  if (!cond) return null;
  return (
    <div className={s.commentUptDel}>
      <button type="button" name="delete" onClick={handleClick}>
        <FaTrash color="crimson" size={20}/>
        </button>
      <button type="button" onClick={() => setIsEditing(true)}>
        <FaEdit color="dodgerblue" size={20}/>
        </button>
    </div>
  )
}

export default CommentUptDelButtons;