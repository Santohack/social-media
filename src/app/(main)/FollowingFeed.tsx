"use client";

import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import DeletePostDialog from "@/components/posts/DeletePostDialog";
import Post from "@/components/posts/Post";
import PostLoadingSkeleton from "@/components/posts/PostLoadingSkeleton";
import { Button } from "@/components/ui/button";
import kyInstance from "@/lib/ky";
import { PostData, PostPage } from "@/lib/types";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export default function FollowingFeed() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["post-feed", "following"],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          "/api/posts/following",
          pageParam ? { searchParams: { cursor: pageParam } } : {},
        )
        .json<PostPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
  // queryFn: async () => {
  //   const res = await fetch("/api/posts/for-you");
  //   if (!res.ok) {
  //     throw Error(`Failed to fetch posts: ${res.status}`);
  //   }
  //   return res.json();
  // },
  const posts = data?.pages.flatMap((page) => page.posts) || [];
  if (status === "pending") {
    return <PostLoadingSkeleton />;
  }

  if (status === "success" && !posts.length && !hasNextPage) {
    return (
      <p className="text-center text-muted-foreground">
       No post found. Start Following people to see  their posts
      </p>
    );
  }
  if (status === "error") {
    return (
      <p className="text-center text-destructive">
        {" "}
        An error occurred while fetching posts.
      </p>
    );
  }

  return (
    <InfiniteScrollContainer
      className="space-y-5"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}

      {!isFetchingNextPage && <Loader2 className="mx-auto animate-spin" />}
     
      {/* for load more posts */}
      {/* <Button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage ? "Loading..." : hasNextPage ? "Load More" : "No more posts"}
      </Button> */}
    </InfiniteScrollContainer>
  );
}
