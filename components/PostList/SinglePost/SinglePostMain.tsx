import Aside from "@/components/Aside/Aside";
import ReactMarkdown from 'markdown-to-jsx';
import s from './style.module.css';
import XRReadObserver from "@/XReact/contexts/XRReadObserver/XRReadObserver";

type Props = {
  post : PostType,
};
function SinglePostMain({ post }: Props) {
  return (
    <article className={s.article}>
      <h3>{post.title}</h3>
      <ReactMarkdown className="markdown">
        {post.content}
      </ReactMarkdown>
    </article>
  )
}

export default SinglePostMain