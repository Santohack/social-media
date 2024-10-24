import PostEditor from "@/components/posts/editor/PostEditor";
import Post from "@/components/posts/Post";
import TrendSideBar from "@/components/TrendSideBar";
import prisma from "@/lib/prisma";

import Image from "next/image";
import ForYouFeed from "./ForYouFeed";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FollowingFeed from "./FollowingFeed";

export default async function Home() {
  
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />

<Tabs defaultValue="for-you">
  <TabsList>
    <TabsTrigger value="for-you">For You</TabsTrigger>
    <TabsTrigger value="following">Following</TabsTrigger>
    </TabsList>

  <TabsContent value="for-you">
    <ForYouFeed />
    </TabsContent>  
  <TabsContent value="following">
    <FollowingFeed />
    </TabsContent>
  </Tabs>
       {/* <ForYouFeed /> */}
      </div>
      <TrendSideBar />
    </main>
  );
}
