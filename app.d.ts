type PostType = {
    _id: string,
    userId: number,
    title: string,
    content: string,
    tags : string[],
    likedBy : string[],
    viewedBy : string[],
    sharedBy : string[],
    readBy : string[],
    title:string,
    category: string,
    createdAt: string|number|Date
}

type UserType = {
  _id: string,
  firstname : string,
  lastname: string,
  username: string,
  email: string,
  password: string
  isFrozen : boolean,
  refreshTokens : string|never[],
  accessToken : string,
  roles : number[]
}

type SingleComment = {
    _id: string,
    postId: number,
    userId: string,
    content: string,
    createdAt: string|number|Date
}