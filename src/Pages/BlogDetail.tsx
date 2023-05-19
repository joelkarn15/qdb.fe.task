import React, {useState, useEffect} from "react";
import {useLocation, useNavigate, Route, Routes} from "react-router-dom";
import styled from "styled-components";
import {colors} from "../config";
import {Space, Spin} from "antd";

const {innerWidth: width, innerHeight: height} = window;

const BlogDetail = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  const [blog, setBlog] = useState(state);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [blogEditValue, setBlogEditValue] = useState({
    title: blog.title,
    description: blog.body
  });

  const handleOnSave = async () => {
    if (
      blogEditValue.title.length > 0 &&
      blogEditValue.description.length > 0
    ) {
      setLoading(true);
      try {
        const response = await fetch(
          process.env.REACT_APP_UPDATE_POST_API_URL + blog.id,
          {
            method: "PUT",
            body: JSON.stringify({
              id: blog.id,
              title: blogEditValue.title,
              body: blogEditValue.description,
              userId: blog.userId
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          }
        );

        const response_json = await response.json();

        setBlog({...response_json, image: state.image});
        setEditing(false);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  };

  const handleOnDelete = async () => {
    setLoading(true);
    try {
      const response = fetch("https://jsonplaceholder.typicode.com/posts/1", {
        method: "DELETE"
      });

      const res = await response;

      if (res.ok) {
        navigate("/blogs");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <BlogDetailContainer>
      {!editing && (
        <ActionContainer>
          <Spin size="large" style={{marginRight: "20px"}} spinning={loading} />
          <EditButton onClick={() => setEditing(true)}>Edit</EditButton>
          <DeleteButton onClick={() => handleOnDelete()}>Delete</DeleteButton>
        </ActionContainer>
      )}
      {editing && (
        <ActionContainer>
          <Spin size="large" style={{marginRight: "20px"}} spinning={loading} />
          <EditButton onClick={() => handleOnSave()}>Save</EditButton>
          <EditButton onClick={() => setEditing(false)}>Exit</EditButton>
        </ActionContainer>
      )}
      {!editing && (
        <BlogContainer>
          <BlogTitle>
            <BlogImage src={blog.image} />
            <BlogTitleText>
              {blog.title.charAt(0).toUpperCase() + blog.title.slice(1)}
            </BlogTitleText>
          </BlogTitle>

          <BlogDescription>
            <BlogDescriptionText>
              {blog.body.charAt(0).toUpperCase() + blog.body.slice(1)}
            </BlogDescriptionText>
          </BlogDescription>
        </BlogContainer>
      )}
      {editing && (
        <BlogContainer>
          <BlogTitle>
            <BlogImage src={blog.image} />

            <BlogTitleTextEdit
              name="body"
              onChange={(event) => {
                setBlogEditValue({
                  ...blogEditValue,
                  title: event.target.value
                });
              }}
              value={blogEditValue.title}
            />
          </BlogTitle>

          <BlogDescription>
            <BlogDescriptionTextEdit
              name="description"
              onChange={(event) =>
                setBlogEditValue({
                  ...blogEditValue,
                  description: event.target.value
                })
              }
              value={blogEditValue.description}
            />
          </BlogDescription>
        </BlogContainer>
      )}
    </BlogDetailContainer>
  );
};

const BlogDetailContainer = styled.div`
  height: ${height - 100}px;
  background: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const ActionContainer = styled.div`
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding-right: 50px;
`;

const EditButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: none;
  height: 30px;
  width: 80px;
  border-width: 1.8px;
  border-color: ${colors.primary}90;
  color: ${colors.primary};
  border-radius: 5px;
  padding: 0px;
  font: inherit;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background: ${colors.primary}15;
    -webkit-transition: background-color 500ms linear;
    -ms-transition: background-color 500ms linear;
    transition: background-color 500ms linear;
  }
  margin-right: 30px;
`;

const DeleteButton = styled(EditButton)`
  border-color: ${colors.error}90;
  color: ${colors.error};
  &:hover {
    background: ${colors.error}15;
    -webkit-transition: background-color 500ms linear;
    -ms-transition: background-color 500ms linear;
    transition: background-color 500ms linear;
  }
`;

const BlogContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  flex: 1;
`;

const BlogImage = styled.img`
  height: 130px;
  min-width: 200px;
  max-width: 200px;
  margin-top: 5px;
  margin-left: 5px;
`;

const BlogTitle = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const BlogTitleText = styled.span`
  font-size: 16px;
  font-weight: 600;
  margin-right: 10px;
  margin-left: 20px;
  margin-top: 5px;
  display: block;
  white-space: pre-line;
`;

const BlogDescription = styled.div`
  display: flex;
  padding-top: 10px;
  height: ${height - 360}px;
  overflow-y: scroll;
`;

const BlogDescriptionText = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: ${colors.textLight};
  white-space: pre-line;
`;

const BlogTitleTextEdit = styled.textarea`
  width: 100%;
  height: 80px;
  margin: 10px;
  margin-left: 20px;
  font-weight: 500;
  border-color: ${colors.primary}70;
  border-width: 2px;
  border-radius: 10px;
  padding: 10px;
`;

const BlogDescriptionTextEdit = styled.textarea`
  width: 100%;
  height: ${height - 390}px;
  margin: 10px;
  border-color: ${colors.primary}70;
  border-width: 2px;
  border-radius: 10px;
  padding: 10px;
`;

export default BlogDetail;
