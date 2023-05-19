import React, {useState, useEffect} from "react";
import styled from "styled-components";
import logo from "../qdb_logo.png";
import userImg from "../user_img.jpg";
import {colors} from "../config";
import {setUser} from "../store/reducers/user";
import {useSelector, useDispatch} from "react-redux";

const User = () => {
  const dispatch = useDispatch();

  const user = useSelector((state: any) => state.user.user);
  const isMobile = useSelector((state: any) => state.settings.isMobile);

  useEffect(() => {
    (async () => {
      try {
        const random = Math.floor(Math.random() * 10) + 1;
        const response = await fetch(
          process.env.REACT_APP_USER_API_URL
            ? process.env.REACT_APP_USER_API_URL + random
            : ""
        );
        const user_response = await response.json();
        if (user_response) {
          dispatch(setUser(user_response));
        }
      } catch (error) {}
    })();
  }, []);

  return (
    <Container>
      {!isMobile && (
        <LogoContainer>
          <LogoImage src={logo} />
        </LogoContainer>
      )}
      {user && (
        <UserContainer>
          <UserImage src={userImg} />
          <UserNameContainer>
            <UserGreeting>Hello</UserGreeting>
            <UserName>{user.name}</UserName>
            <UserEmail>{user.email}</UserEmail>
          </UserNameContainer>
        </UserContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  height: 240px;
  margin-bottom: 20px;
`;

const LogoContainer = styled.div`
  height: 64px;
  background-color: ${colors.primary};
`;

const LogoImage = styled.img`
  height: 50px;
  width: 100px;
  margin-left: 20px;
  margin-top: 5px;
`;

const UserContainer = styled.div`
  height: 176px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UserImage = styled.img`
  height: 70px;
  width: 70px;
  border-radius: 35px;
  object-fit: cover;
`;

const UserNameContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const UserGreeting = styled.span`
  font-size: 12px;
  font-weight: 300;
  align-self: center;
`;

const UserName = styled.span`
  font-size: 14px;
  font-weight: 500;
  margin-top: 5px;
`;

const UserEmail = styled.span`
  font-size: 12px;
  font-weight: 300;
  margin-top: 5px;
`;

export default User;
