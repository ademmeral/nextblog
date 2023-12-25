'use client';
import { FaRegCommentDots } from "react-icons/fa";
import { BsTags } from "react-icons/bs";
import { PiShareFat } from 'react-icons/pi';
import s from './style.module.css';
import { useAuth } from "@/contexts/AuthProvider";
import LikeButton from "./LikeButton";
import { useReadObserverContext } from "@/XReact/contexts/XRReadObserver/XRReadObserver";
import ReadIndicator from "./ReadIndicator";
import ViewIndicator from "./ViewIndicator";

type PropsType = {
  coomentLength: number,
  post : PostType
}


function SinglePostFooter({ post, coomentLength }: PropsType) {
  const { auth } = useAuth();

  return (
    <footer className={s.postFooter}>
      <div className={s.footerWrapper}>
        <div className={s.postFooterLeft}>
          <LikeButton post={post} />
          <button type="button" className={s.buttonIconWrapper} disabled={!Boolean(auth)}>
            <FaRegCommentDots size={25} />
            <span>{coomentLength}</span>
          </button>
          <button type="button" className={s.buttonIconWrapper} disabled>
            <BsTags size={25} />
            <span>{post.tags.length}</span>
          </button>
          <button type="button">
            <PiShareFat size={25} />
          </button>
        </div>
        <div className={s.postFooterRight}>
          <ReadIndicator readBy={post.readBy} id={post._id}/>
          <ViewIndicator viewedBy={post.viewedBy} id={post._id}/>
        </div>
      </div>
    </footer>
  )
}

export default SinglePostFooter