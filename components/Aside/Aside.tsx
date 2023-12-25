import CategoryList from "../CategoryList/CategoryList";
import PopularPostList from "./PopularPostList"
import { getPostsByPage } from "@/utils/utils";
import s from './style.module.css';

async function Aside() {
  const posts:Awaited<ReturnType<typeof getPostsByPage>> = await getPostsByPage(1,3);

  if (posts) return (
    <aside className={`${s.aside} scrolled no-scrollbar`}>
      <div className="hots">
        <small className={s.desc}>What's hot</small>
        <PopularPostList title="Most Popular" posts={posts}/>
      </div>
      <div className="">
        <small className={s.desc}>Discover by topic</small>
        <CategoryList title="Categories"/>
      </div>
      <div className="">
        <small className={s.desc}>Chosen by editor</small>
        <PopularPostList title="Editor's Pick" includeImg={true} posts={posts}/>
      </div>
    </aside>
  )
}

export default Aside