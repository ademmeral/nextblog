import CategoryList from "@/components/CategoryList/CategoryList"
import FeaturedPost from "@/components/PostList/FeaturedPost"
import PostList from "@/components/PostList/PostList"
import { getPostsByPage } from "@/utils/utils"

type PropsType = { searchParams: { page: string } } 

async function Home({ searchParams: { page } }: PropsType) {
  const posts:Awaited<ReturnType<typeof getPostsByPage>> = await getPostsByPage(+page || 1,4);

  if (posts) return (
    <section className="home">
      <div className="flex">
        <FeaturedPost post={posts[0]} readMore={true}/>
      </div>
      <CategoryList title="Popular Categories"/>
      <PostList posts={posts}/>
    </section>
  )
}

export default Home;
