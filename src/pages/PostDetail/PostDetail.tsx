import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import queryString from "query-string";
import Post from "./Post/Post";
import Author from "./Author";
import SubLinkSection from "../../components/SubLinkSection/SubLinkSection";
import NewPostSection from "../../components/NewPostSection/NewPostSection";

import "./PostDetail.scss";
import postAPI from "../../api/postAPI";
import { IPost } from "../../interfaces/post";

const PostDetail: React.FC = () => {
  const [post, setPost] = useState<IPost>();
  const location = useLocation();
  useEffect(() => {
    const { _id } = queryString.parse(location.search);

    console.log(_id);

    const getPostDetail = async (_id: any) => {
      console.log("zoooooo");

      try {
        const postData = await postAPI.getPostDetail(_id);
        if (postData.data.result) {
          console.log(postData.data.data);

          setPost(postData.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getPostDetail(_id!);
  }, [location]);

  return (
    <main id="main">
      <div className="container">
        <div className="container-page">
          <div className="left-col">{post && <Post post={post} />}</div>
          <div className="aside">
            {post && <Author userInfo={post.user_id} />}

            {/* <NewPostSection /> */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default PostDetail;
