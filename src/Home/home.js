import React, { useState, useEffect } from "react";
import { Layout, Menu, message, Card, Col, Row } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import Section from "./section";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const Home = () => {
  //---------------LOADS NEWS API ---------------
  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL}?api-key=${process.env.REACT_APP_API_KEY}`,
    }).then((response) => {
      console.log(response.data.results);
      setNews(response.data.results);
      setpaginatedNews(
        _(response.data.results)
          .slice(0)
          .take(pageSize)
          .value()
      );
    });
  }, []);

  var logLocal = JSON.parse(localStorage.getItem("loggedUser")); //logged user credentials

  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [paginatedNews, setpaginatedNews] = useState([]);
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = news ? Math.ceil(news.length / pageSize) : 0;
  const pages = _.range(1, pageCount + 1);

  //----------------- SET NAVIGATION -------------------

  const homeNav = () => {
    navigate("/home");
  };
  const profileNav = () => {
    navigate("/profile");
  };

  const logout = () => {
    success();
    navigate("/login");
  };

  //--------------- SUCCESS/ERROR MESSAGES ---------------

  const success = () => {
    message.success("Youre logged out, See you soon!!");
  };

  //--------------------- PAGINATION ---------------------

  const pagination = (pageNo) => {
    setCurrentPage(pageNo);
    const startI = (pageNo - 1) * pageSize;
    const paginated = _(news)
      .slice(startI)
      .take(pageSize)
      .value();
    setpaginatedNews(paginated);
  };

//   const showTotal = (total) => {
//     return `Total ${total} items`;
//   };

  return (
      <>
      <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" onClick={homeNav}>
            Home
          </Menu.Item>
          <Menu.Item key="2" onClick={profileNav}>
            Profile
          </Menu.Item>
          <Menu.Item key="3" onClick={logout}>
            Logout
          </Menu.Item>
        </Menu>
      </Header>
      <Layout>
      <Sider width={200} className="site-layout-background">
           <Menu
           mode="inline"
           defaultSelectedKeys={["1"]}
           defaultOpenKeys={["sub1"]}
           style={{ height: "100%", borderRight: 0 }}>
               <Section/>
             </Menu>
         </Sider>
 
          
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <h1 style={{ color: "#0b52bb", textDecoration: "underline" }}>
              News Headlines
            </h1>
            <div className="row">
              {paginatedNews.map((news, index) => {
                return (
                        <div style={{ background: "#ECECEC", padding: "30px" }}>
                          <Row gutter={20} key={index}>
                            <Col span={10}>
                              <img
                                src={
                                  news.multimedia && news.multimedia.length
                                    ? news.multimedia[2].url
                                    : ""
                                }
                                alt=""
                                height="250"
                                width="440"
                              ></img>
                              <Card
                                title={news.title}
                                extra={<a href={news.url}>Read More</a>}
                                style={{ width: 440 }}
                              >
                                {news.byline}
                                <p>{news.abstract}</p>
                              </Card>
                            </Col>
                          </Row>
                        </div>
                );
              })}
              <nav className="d-flex justify-content-center">
                <ul className="pagination">
                  {pages.map((page) => (
                    <li
                      className={
                        page === currentPage ? "page-item-active" : "page-item"
                      }
                    >
                      <p className="page-link" onClick={() => pagination(page)}>
                        {page}
                      </p>
                    </li>
                  ))}
                </ul>
              </nav>
              <div></div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
    </>
  );
};

export default Home;
