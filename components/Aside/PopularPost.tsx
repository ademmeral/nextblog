import { getUserById } from "@/utils/utils";
import ReactMarkdown from 'markdown-to-jsx';
import XDate from "@/utils/XDate";
import s from './style.module.css';

type PropsType = {
  includeImg?: boolean,
  post : PostType
}
const src = "https://randomuser.me/api/portraits/men/26.jpg";

async function PopularPost({post, includeImg} : PropsType){
  const user:Awaited<ReturnType<typeof getUserById>> = await getUserById(post.userId);

  const style = {
    backgroundColor : `var(--${post.category.toLowerCase()}-bg)`, 
    color : `var(--${post.category.toLowerCase()})`
  };
  const date_ = XDate.moment('Y M D').format(post.createdAt);
  return (
    <div className={s.popular}>
      {includeImg &&
        <figure className={s.img}>
          <img src={src} alt={`${user?.firstname} ${user?.lastname}`} />
        </figure>
      }
      <article className={s.article}>
        <header>
          <small className={s.ctg} style={style}>{post.category}</small>
        </header>
        <ReactMarkdown className={`markdown line-clamp-3 text-sm`}>
          {post.content}
        </ReactMarkdown>
        <footer>
          {!user 
            ? null 
            : <small className={s.author}>{`${user.firstname} ${user.lastname}`}</small>
          }
          <small> &#x2022; </small>
          <time dateTime={`${post.createdAt}`} className={s.time}>
            <small>{date_}</small>
          </time>
        </footer>
      </article>
    </div>
  )
}

export default PopularPost