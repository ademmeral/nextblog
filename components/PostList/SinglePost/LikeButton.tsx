import XFetch from "@/XFetch/api";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useAuth } from "@/contexts/AuthProvider";
import {useState, useRef, useEffect} from 'react';
import { updatePost } from "@/utils/utils";
import s from './style.module.css';

function LikeButton({ post }: { post: PostType }) {
  const { auth } = useAuth();
  const [liked, setLiked] = useState(
    auth ? post.likedBy.includes((auth._id) as string) : false
  );
  const [likeLength, setLikeLength] = useState(+post.likedBy.length);
  let {current : timeout} = useRef<number>(0);

  useEffect(() => {
    
    if (auth) {
      window.clearTimeout(timeout);
      XFetch.cancel();
      XFetch.resume();
      timeout = window.setTimeout(async () => {
        const body = liked
          ? { $addToSet: { likedBy: auth._id } }
          : { $pull: { likedBy: auth._id } };
        await updatePost(body, post._id);
        XFetch.cancel();
      }, 1000);
    }
    return () => {
      window.clearTimeout(timeout);
      XFetch.cancel();
    };
  }, [liked])

  function handleLikeClick(){
    if (auth){
      const newLiked = !liked;
      setLiked(newLiked);
      if (newLiked) setLikeLength( p => p += 1 )
      else setLikeLength(p => p -= 1)
    }
  }

  return (
    <div className={s.buttonIconWrapper}>
      <button type="button" onClick={handleLikeClick} disabled={!auth}>
        {auth && liked
          ? <FaHeart size={25} className="text-red-600" />
          : <FaRegHeart size={25} />
        }
      </button>
      <span>{likeLength}</span>
    </div>

  )

}

export default LikeButton