import React, {useEffect, useState} from "react";
import "./App.css";
import styled from "styled-components";
import logo from "./qdb_logo.png";
import {Layout, Menu, Tooltip} from "antd";
import {
  DashboardOutlined,
  BookOutlined,
  TeamOutlined,
  UserOutlined
} from "@ant-design/icons";
import {useLocation, useNavigate, Route, Routes} from "react-router-dom";
import "antd/dist/reset.css";
import {colors} from "./config";
import Dashboard from "./Pages/Dashboard";
import Blogs from "./Pages/Blogs";
import BlogDetail from "./Pages/BlogDetail";
import User from "./Components/User";
import {setIsMobile} from "./store/reducers/settings";
import {useSelector, useDispatch} from "react-redux";

const {Content, Sider, Header} = Layout;
const {innerWidth: width, innerHeight: height} = window;

const App = () => {
  const [collapsed, setCollapsed] = useState(true);
  const dispatch = useDispatch();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  let navigate = useNavigate();
  const selectedKey = useLocation().pathname;

  const highlight = () => {
    if (selectedKey === "/") {
      return ["1"];
    } else if (selectedKey === "/dashboard") {
      return ["1"];
    } else if (selectedKey === "/blogs") {
      return ["2"];
    }
  };

  const isMobile = useSelector((state: any) => state.settings.isMobile);

  useEffect(() => {
    if (width < 580) {
      dispatch(setIsMobile(true));
    } else {
      dispatch(setIsMobile(false));
    }
  }, [width]);

  const StyledSider = styled(Sider)`
    overflow: auto;
    overflow-y: hidden;
    height: 100vh;
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
  `;

  return (
    <Layout hasSider>
      {!isMobile && (
        <Sider
          theme="light"
          collapsed={false}
          style={{
            overflow: "auto",
            overflowY: "hidden",
            height: "100vh",
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          }}
        >
          <User />
          <Menu
            mode="inline"
            theme="light"
            defaultSelectedKeys={["1"]}
            selectedKeys={highlight()}
            style={{height: "100%", borderRight: 0}}
            items={[
              {
                key: "1",
                icon: <DashboardOutlined />,
                label: "Dashboard",
                onClick: () => {
                  navigate("/dashboard");
                }
              },
              {
                key: "2",
                icon: <BookOutlined />,
                label: "Blogs",
                onClick: () => {
                  navigate("/blogs");
                }
              }
            ]}
          />
        </Sider>
      )}
      <Layout
        className="site-layout"
        style={{marginLeft: isMobile ? 0 : 200, height: "100vh"}}
      >
        <Header
          style={{padding: 0, background: isMobile ? colors.primary : "white"}}
        >
          {isMobile && (
            <LogoContainer>
              <LogoImage src={logo} />
            </LogoContainer>
          )}
        </Header>
        {isMobile && <User />}
        <Content style={{margin: "24px 16px 0", overflow: "initial"}}>
          <Routes>
            <Route path="/*" element={isMobile ? <Blogs /> : <Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:slug" element={<BlogDetail />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

const LogoContainer = styled.div`
  height: 64px;
  background-color: ${colors.primary};
`;

const LogoImage = styled.img`
  height: 50px;
  width: 100px;
  margin-left: 20px;
`;

export default App;
