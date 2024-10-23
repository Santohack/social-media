import PostEditor from "@/components/posts/editor/PostEditor";
import Post from "@/components/posts/Post";
import TrendSideBar from "@/components/TrendSideBar";
import prisma from "@/lib/prisma";
import { postDataInclude } from "@/lib/types";
import Image from "next/image";

export default async function Home() {
  const posts = await prisma?.post?.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: postDataInclude,
  });
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />

        {posts?.map((post) => <Post key={post.id} post={post} />)}
      </div>
      <TrendSideBar />
    </main>
  );
}
