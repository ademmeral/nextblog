import SinglePostMain from "@/components/PostList/SinglePost/SinglePostMain";
import { delay, getCommentsByPostId, getPostById, getUserById } from "@/utils/utils";
import SinglePostFooter from "@/components/PostList/SinglePost/SinglePostFooter";
import CommentList from "@/components/CommentList/CommentList";
import XRReadObserver from "@/XReact/contexts/XRReadObserver/XRReadObserver";
import FeaturedPost from "@/components/PostList/FeaturedPost";

type PropsType = {
  searchParams?: { name?: string, id?:string }
};

async function SinglePostPage({ searchParams }: PropsType) {
  const { id, name } = searchParams 
    ? searchParams 
    : { id: null, name: null };

    const post:Awaited<ReturnType<typeof getPostById>|null> = id
    ? await getPostById(id, false)
    : null;

  const [user, comments] = post && id
    ? await Promise.all([
      getUserById(post.userId), 
      getCommentsByPostId(id)
    ])
    : [null, null];

  if (post && user && comments) return (
    <section>
      <div className={'flex-[70%] flex flex-col gap-8'}>
        <FeaturedPost post={post} readMore={false}/>
        <XRReadObserver readSpeed={5 * 60 * 1000}>
          <SinglePostMain post={post} />
          <SinglePostFooter
            coomentLength={comments.length}
            post={post}
          />
        </XRReadObserver>
        <CommentList comments={comments} />
      </div>
    </section>
  ) 
}

export default SinglePostPage