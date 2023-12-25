'use client';

import { useLayoutEffect, useState, useEffect } from 'react';
import { getUserById } from "@/utils/utils";
import XDate from "@/utils/XDate";
import ClampedCommentText from "./ClampedCommentText";
import CommentUptDelButtons from "./CommentUptDelButtons";
import s from './style.module.css';
import XFetch from '@/XFetch/api';
import CommentEdit from './CommentEdit';

type PropsType = {
  comment : SingleComment,
}

const src = "https://images.pexels.com/photos/1921326/pexels-photo-1921326.jpeg\
?auto=compress&cs=tinysrgb&w=600&h=6000&dpr=1"


function Comment({comment}: PropsType) {
  const [author, setAuthor] = useState<UserType|null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState(comment.content);
  const [message, setMessage] = useState('');
  const date_ = XDate.fromNow(comment.createdAt);
  
  useEffect(() => {
    XFetch.resume();
    const getAuthor = async () => {
      const user:Awaited<ReturnType<typeof getUserById>> = 
        await getUserById(comment.userId);
      if (user) setAuthor({...user});
    }
    getAuthor();

    return () => {
      XFetch.cancel();
    }
  }, [])

  if (isEditing) return (
    <CommentEdit
      comment={comment}
      newComment={newComment} 
      setNewComment={setNewComment}
      setIsEditing={setIsEditing}
    />
  )
  if (!isEditing) return (
    <li className={s.comment}>
      <div className={s.wrapper}>
        <figure className={s.figure}>
          <img src={src} alt={''} className={s.img} />
          <figcaption className={s.figcaption}>
              <p className="capitalize">
                {`${author?.firstname} ${author?.lastname}`}<br />
                <time className={s.time}>
                  <small>{date_}</small>
                </time>
              </p>
            <CommentUptDelButtons 
              comment={comment} 
              setIsEditing={setIsEditing}
              setMessage={setMessage}
            />
          </figcaption>
        </figure>
        <ClampedCommentText content={newComment}/>
      </div>
    </li>
  )
}

export default Comment