import Comment from "./Comment";
import CommentTextArea from "./CommentTextArea";
import s from './style.module.css';

type Props = {comments: SingleComment[]};

async function CommentList({comments}: Props) {
  return (
    <div className={s.comments}>
      <CommentTextArea />
      <ul className={s.ul}>
        {
          comments.map((c:SingleComment,i:number) => (
            <Comment key={i} comment={c}/>
          ))
        }
      </ul>
    </div>
  )
}

export default CommentList