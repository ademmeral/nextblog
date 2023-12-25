import XFetch from "@/XFetch/api";

export function delay(ms:number){
  return new Promise(res => setTimeout(res, ms))
};

export function compactByWords(str:string, len : number):string{
  const splitted = str.split(' ')
  if (!(splitted.length > len)) return str;
  const modified = splitted.slice(0, len).join(' ');
  if (modified.endsWith('.')) return modified + '..'
  else return modified + '...';
}

export async function getUserById(userId: string|number): Promise<UserType|void> {
  try {
    const resp = await XFetch.get(`/users/single/${userId}`)
    const result = await resp.json();
    return result;

  } catch (err) { 
    console.log(err); 
  };
};

export async function getPostsByPage(p: number, pp:number): Promise<PostType[]|void> {
  try {
    const url = `/posts?page=${p}&perPage=${pp}`;
    const resp =  await XFetch.get(url);
    const result = await resp.json();
    return result;
  } catch (err) {
    if (err instanceof Error)
      console.log(err);
  };
};

export async function getPostsByCategory(p:number, pp:number, q:string): Promise<PostType[]|void>{
  try{
    const url = `/posts/category?name=${q}&page=${p}&perPage=${pp}`
    const resp = await XFetch.get(url)
    const result = await resp.json();
    if (!resp.ok) throw new Error(result.message);
    return result;
  } catch (err) {
    if (err instanceof Error)
      console.log(err); 
  };
}

export async function getPostById(id: number|string, short = false): Promise<PostType|void> {
  try {
    const resp = await XFetch.get(`/posts/single/post?id=${id}&short=${short}`);
    const result = await resp.json();
    return result;
  } catch (err) {
    if (err instanceof Error)
      console.log(err);
  };
};

export async function getCommentsByPostId(postId:string|number):Promise<SingleComment[]|void>{
  try{
    const resp = await XFetch.get(`/comments?postId=${postId}`);
    const result = await resp.json();
    return result;

  } catch (err) {
    if (err instanceof Error)
      console.log(err);
  }
}

export async function updatePost(body:Record<string, any>, id:number|string):Promise<void>{
  try{
    await XFetch.put(`/posts/single/${id}`, body);
  } catch (err){
    console.log(err);
  }
}

export async function getIpAddress(){
  try{
    const resp = await XFetch.get('/controls/ip')
    const result = await resp.json();
    return result
  } catch (err) {
    throw 'Failed to get IP Address!';
  }
}