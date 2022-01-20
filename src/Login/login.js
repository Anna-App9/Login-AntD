import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [logSuccess, setLogSuccess] = useState(true);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

//--------------- SUCCESS/ERROR MESSAGES ---------------

  const error = () => {
    message.error("Wrong Credentials, Please try again!");
  };
  const success = () => {
    message.success("Loggedin Successfully, Happy reading!");
  };

  //-------------- LOGIN FORM SUBMIT HANDLER ------------

  const onSubmit = (e) => {
    let userData = localStorage.getItem("users");
    let usersArray = JSON.parse(userData);
    usersArray.map((arr) => {
      if (arr.email == email && arr.password == password) {
        success();
        setLogSuccess(true);
        navigate("/home");
        let loggedUser = {
          email: e.email,
          password: e.password,
        };
        loggedUser = localStorage.setItem(
          "loggedUser",
          JSON.stringify(loggedUser)
        );
      } else {
        setLogSuccess(false);
      }
    });
  };

  return (
    <>
      <img src="data:image/png;base64,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" />

      <div className="container">
        <h2 style={{ textAlign: "center" }}>
          New Here?
          <Link to={"/register"} className="nav-link">
            Sign-up to read
          </Link>
        </h2>

        <h2> TImes News Articles</h2>
        <h2 style={{ textAlign: "center" }}>Login</h2>
        <Form
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 8,
          }}
          onFinish={onSubmit}
        >
          <Form.Item
            label="Email"
            name="email"
            value={email}
            onChange={onChangeEmail}
          >
            <Input placeholder="Enter your Email-ID" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            style={{ color: "#fff" }}
            value={password}
            onChange={onChangePassword}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 8,
            }}
          >
            <Button block type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Login;
