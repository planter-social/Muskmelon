import axios from "axios";
import { Fragment, useEffect } from "react";
import PostCard from "./PostCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";

//NEED TO FILTER PAGES
export default function PopularPosts() {
  const fetchPosts = async ({ pageParam }) => {
    try {
      const res = await axios.get("/api/getPosts", {
        params: {
          filterType: "hot",
          val: pageParam?.params?.numoflikes,
          sortingId: pageParam?.params?.sortingid,
        },
      });

      console.log(pageParam, "pageParam after fetching in fetchPost");
      if (pageParam === undefined) {
        //Return without filtering for the first page
        console.log("first page");
        return res.data;
      }

      //Filter out the elements that are in the previous pages
      let newPage = res.data;
      pageParam.prevPages.forEach((page) =>
        page.forEach(
          (post) =>
            (newPage = newPage.filter((newPost) => newPost.id !== post.id))
        )
      );
      console.log(newPage, "new Page data");
      return newPage;
    } catch (err) {
      console.log(err);
    }
  };

  const { data, error, fetchNextPage, hasNextPage, status } = useInfiniteQuery(
    "popularPosts",
    fetchPosts,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage?.[lastPage.length - 1] === undefined) {
          return undefined;
        }
        return {
          prevPages: pages,
          params: lastPage?.[lastPage.length - 1],
        };
      },
    }
  );

  const calculateLength = () => {
    let count = 0;
    data.pages.forEach((page) => page.forEach((post) => count++));
    console.log(count);
    return count;
  };

  return status === "loading" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <div>
      {data && (
        <InfiniteScroll
          dataLength={calculateLength}
          pageStart={0}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={
            <div className="loader" key={0}>
              Loading ...
            </div>
          }
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {data.pages.map((page, i) => (
            <Fragment key={i}>
              {page.map((post) => {
                return <PostCard key={post.id} post={post}></PostCard>;
              })}
            </Fragment>
          ))}

          {console.log(data, "data in render")}
        </InfiniteScroll>
      )}
    </div>
  );
}
