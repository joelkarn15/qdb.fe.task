import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import styled from "styled-components";
import {colors} from "../config";
import {useLocation, useNavigate, Route, Routes} from "react-router-dom";
import {
  List as _List,
  ListProps,
  AutoSizer as _AutoSizer,
  AutoSizerProps
} from "react-virtualized";

const List = _List as unknown as React.FC<ListProps>;
const AutoSizer = _AutoSizer as unknown as React.FC<AutoSizerProps>;

const {innerWidth: width, innerHeight: height} = window;

//Virtualized list for big lists performance issues
function rowRenderer({
  key,
  index,
  parent,
  style
}: {
  key: any;
  index: any;
  parent: any;
  style: any;
}) {
  let {blogs, navigate} = parent.props;
  let blog = blogs[index];
  return (
    <BlogWrapper key={key} style={style}>
      <BlogContainer
        onClick={() =>
          navigate("/blogs/" + blog.id, {
            state: {
              ...blog,
              image: process.env.REACT_APP_IMAGES_API_URL
                ? process.env.REACT_APP_IMAGES_API_URL + index
                : ""
            }
          })
        }
      >
        <BlogImage
          src={
            process.env.REACT_APP_IMAGES_API_URL
              ? process.env.REACT_APP_IMAGES_API_URL + index
              : ""
          }
        />
        <BlogDetail>
          <BlogTitle>
            <BlogTitleText>
              {blog.title.charAt(0).toUpperCase() + blog.title.slice(1)}
            </BlogTitleText>
          </BlogTitle>

          <BlogDescription>
            <BlogDescriptionText>
              {blog.body.charAt(0).toUpperCase() + blog.body.slice(1)}
            </BlogDescriptionText>
          </BlogDescription>

          <BlogReadMore
            style={{marginBottom: index === blogs.length - 1 ? "20px" : "0px"}}
          >
            <ReadMoreText>Read More</ReadMoreText>
          </BlogReadMore>
        </BlogDetail>
      </BlogContainer>
    </BlogWrapper>
  );
}

const Blogs = () => {
  let navigate = useNavigate();

  const user = useSelector((state: any) => state.user.user);
  const isMobile = useSelector((state: any) => state.settings.isMobile);

  const [blogs, setBlogs] = useState<
    {id: number; title: string; body: string}[]
  >([]);

  useEffect(() => {
    if (user) {
      (async () => {
        try {
          const response = await fetch(
            process.env.REACT_APP_POSTS_API_URL
              ? process.env.REACT_APP_POSTS_API_URL.replace("user_id", user.id)
              : ""
          );
          const posts = await response.json();

          if (posts) {
            setBlogs(posts);
          }
        } catch (error) {}
      })();
    }
  }, [user]);

  return (
    <Container>
      {/* {blogs.map((blog, index) => (
        <BlogWrapper key={index}>
          <BlogContainer
            onClick={() =>
              navigate("/blogs/" + blog.id, {
                state: {
                  ...blog,
                  image: process.env.REACT_APP_IMAGES_API_URL
                    ? process.env.REACT_APP_IMAGES_API_URL + index
                    : ""
                }
              })
            }
          >
            <BlogImage
              src={
                process.env.REACT_APP_IMAGES_API_URL
                  ? process.env.REACT_APP_IMAGES_API_URL + index
                  : ""
              }
            />
            <BlogDetail>
              <BlogTitle>
                <BlogTitleText>
                  {blog.title.charAt(0).toUpperCase() + blog.title.slice(1)}
                </BlogTitleText>
              </BlogTitle>

              <BlogDescription>
                <BlogDescriptionText>
                  {blog.body.charAt(0).toUpperCase() + blog.body.slice(1)}
                </BlogDescriptionText>
              </BlogDescription>

              <BlogReadMore>
                <ReadMoreText>Read More</ReadMoreText>
              </BlogReadMore>
            </BlogDetail>
          </BlogContainer>
        </BlogWrapper>
      ))} */}

      {/* //Virtualized list for big lists performance issues */}
      <AutoSizer>
        {({height, width}) => (
          <List
            width={width}
            height={height}
            rowCount={blogs.length}
            rowHeight={({index}) => (index === blogs.length - 1 ? 165 : 140)}
            rowRenderer={rowRenderer}
            blogs={blogs}
            navigate={navigate}
            style={{paddingBottom: "30px"}}
          />
        )}
      </AutoSizer>
    </Container>
  );
};

const Container = styled.div`
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  height: ${height - 100}px;
  overflow-x: hidden;
`;

const BlogWrapper = styled.div`
  margin: 20px;
  width: 100%;
  height: 140px;
  display: flex;
  flex-direction: row;
  padding-right: 40px;
`;

const BlogContainer = styled.button`
  display: flex;
  flex-direction: row;
  background: none;
  height: 100%;
  width: ${width - 200}px;
  border: none;
  padding: 0px;
  font: inherit;
  cursor: pointer;
  text-align: left;
  &:hover {
    background: ${colors.primary}15;
    -webkit-transition: background-color 500ms linear;
    -ms-transition: background-color 500ms linear;
    transition: background-color 500ms linear;
  }
`;

const BlogImage = styled.img`
  height: 130px;
  min-width: 200px;
  max-width: 200px;
  margin-top: 5px;
  margin-left: 5px;
`;

const BlogDetail = styled.div`
  padding: 10px;
  padding-top: 0px;
  padding-right: 30px;
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-left: 10px;
`;

const BlogTitle = styled.div`
  display: flex;
`;

const BlogTitleText = styled.span`
  font-size: 16px;
  font-weight: 600;
  margin-top: 5px;
  display: block;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  max-height: 1.6em;
  line-height: 1.6em;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const BlogDescription = styled.div`
  display: flex;
  padding-top: 10px;
  flex: 1;
  overflow: hidden;
`;

const BlogDescriptionText = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: ${colors.textLight};
  display: block;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  max-height: 4.8em;
  line-height: 1.6em;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const BlogReadMore = styled.div`
  display: flex;
`;

const ReadMoreText = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: ${colors.primary};
`;

export default Blogs;
