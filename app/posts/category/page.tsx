import FeaturedPost from "@/components/PostList/FeaturedPost";
import PostList from "@/components/PostList/PostList"
import { getPostsByCategory } from "@/utils/utils";

type Props = {
  searchParams: { q: string }
};

async function Category({searchParams : {q}}:Props) {
  const postsByCtg:Awaited<ReturnType<typeof getPostsByCategory>> = 
    await getPostsByCategory(1,3, q);

  if (postsByCtg) return (
    <div className="flex flex-col gap-20">
      <FeaturedPost post={postsByCtg[0]}/>
      <div className="flex gap-10">
        {postsByCtg
          ? <PostList posts={postsByCtg} title={q}/>
          : ''
        }
      </div>
    </div>
  )
}

export default Category