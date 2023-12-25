import Post from './Post';
import Pagination from './Pagination';
import s from './style.module.css';

async function PostList({posts, title}:{title?: string, posts:PostType[]}) {

  return (
    <div className={s.postlist}>
      <h3>{!title ? 'Recent Posts' : title}</h3>
      <ul className={s.posts}>
        {posts 
          ? posts.map((post:PostType,i:number) => <Post key={i} post={post}/>) 
          : ''
        }
      </ul>
      <Pagination max={3}/>
    </div>
  )
}


export default PostList