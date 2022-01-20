import React, { useState, useEffect } from "react";
import axios from "axios";
import { Menu } from "antd";

export default function Section() {
  const [sectionNews, setSectionNews] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SECTION_URL}?api-key=${process.env.REACT_APP_API_KEY}`,
    }).then((response) => {
      console.log(response.data.results);
      setSectionNews(response.data.results);
    });
  }, []);

  return (
    <>
      <Menu
        mode="inline"
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        {sectionNews.map((sectionNews, index) => {
          return (
            <Menu.Item style={{ color: "black" }} key={index}>
              {sectionNews.display_name}
            </Menu.Item>
          );
        })}
      </Menu>
    </>
  );
}
