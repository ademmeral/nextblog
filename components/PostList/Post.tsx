import Link from "next/link"
import ReactMarkdown from 'markdown-to-jsx';
import XDate from "@/utils/XDate";
import s from './style.module.css';

type PropsType = {
  post : PostType,
  excludeTitle?: boolean,
  children?: React.ReactNode
}

const src /* an example image */= "https://images.pexels.com/photos/1921326/pexels-photo-1921326.jpeg?auto=compress&cs=tinysrgb&w=600&h=6000&dpr=1"

function Post({ post, excludeTitle, children }: PropsType) {
  const date_ = XDate.moment('Y Ms D').format(post.createdAt);

  return (
    <div className={s.post}>
      <figure className={s.img}>
        <img src={src} alt={post.title} />
      </figure>
      <article className={s.article}>
        <header>
          <time dateTime={`${post.createdAt}`}>
            <small>{date_}</small>
          </time>
          <span>&nbsp;&#x2022;&nbsp;</span>
          <small className={s.ctg}>{post.category}</small>
        </header>
        <div className={s.texts}>
          {excludeTitle ? null : <h4>{post.title}</h4>}
          <ReactMarkdown 
            className={
              `prose lg:prose-xl line-clamp-4`
            }
          >{post.content}
          </ReactMarkdown>
        </div>
        <Link 
          href={`/posts?name=${post.title}&id=${post._id}`}
        >{children ? children : 'READ MORE'}
        </Link>
      </article>
    </div>
  )
}

export default Post