import Post from './Post';
import { ReactNode } from 'react'
import s from './style.module.css';

type PropsType = {
  post:PostType, 
  children?: ReactNode,
  readMore?: boolean
}

async function FeaturedPost({post, children, readMore} : PropsType) {
  
  return (
    <div className={s.featured}>
      <h1 className={s.title}>{!children ? post.title : children}</h1>
      <Post post={post} excludeTitle={true}>{readMore ? 'READ MORE' : null}</Post>
    </div>
  )
}

export default FeaturedPost