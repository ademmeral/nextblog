import PopularPost from "./PopularPost";
import s from './style.module.css';

type Props = {
  title: string,
  includeImg?: boolean,
  posts : PostType[]
};

function PopularPostList({posts, title, includeImg} : Props) {
  return (
    <div className={s.populars}>
      <h4>{title}</h4>
      {
        posts.map( (p,i) => 
          <PopularPost key={i} post={p} includeImg={includeImg}/> ) 
      }
    </div>
  )
}

export default PopularPostList