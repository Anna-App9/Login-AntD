import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";


const Register = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [mobile, setMobile] = useState();
  const [cpassword, setCpassword] = useState();
  const navigate = useNavigate();
 

  const onChangename = (e) => {
    setUsername(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangeMobile = (e) => {
    setMobile(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangeCpassword = (e) => {
    setCpassword(e.target.value);
  };

  const success = () => {
    message.success('Congrats, your registration is successful. Please login now!');
  };

  //---------------FORM SUBMIT HANDLER---------------

  const onSubmit = (e) => {
    let newData = {
      username: e.username,
      email: e.email,
      mobile: e.mobile,
      password: e.password,
      cpassword: e.cpassword,
    };
    console.log(newData);
    let newUser = localStorage.getItem('users');
    if (!newUser) {
      localStorage.setItem('users', JSON.stringify([newData]));
    }
    else{
      let userArr = JSON.parse(newUser);
      userArr.map(arr=>{
        userArr.push(newData);
        localStorage.setItem('users', JSON.stringify(userArr));  
      })
      success();
      navigate('/login');
      
    }
  };

  return (
    <div style={{ textAlign: "center" }} className="reg">
      <h2>
        Do you have an account?
        <Link to={"/login"} className="nav-link">
          {" "}
          Login{" "}
        </Link>
      </h2>

      <Form
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 5 }}
        onFinish={onSubmit}
        // onSubmit={onSubmit}
        onFinishFailed={(error) => {
          console.log({ error });
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          value={username}
          onChange={onChangename}
          rules={[
            {
              required: true,
              message: "Please enter your name",
            },
            { whitespace: true },
            { min: 3, message: "Username must contain min 3 characters" },
          ]}
          hasFeedback
        >
          <Input placeholder="Enter your Username" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          onChange={onChangeEmail}
          value={email}
          rules={[
            {
              required: true,
              message: "Please enter your Email ID",
            },
            { type: "email", message: "Please enter a valid Email" },
          ]}
          hasFeedback
        >
          <Input placeholder="Enter your Email ID" />
        </Form.Item>
        <Form.Item
          label="Mobile"
          name="mobile"
          onChange={onChangeMobile}
          value={mobile}
          rules={[
            {
              required: true,
              message: "Mobile number is required",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (value.length !== 10) {
                  return Promise.reject("Please enter valid Mobile No!");
                }
                return Promise.resolve();
              },
            }),
          ]}
          hasFeedback
        >
          <Input placeholder="Enter your Mobile Number" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          onChange={onChangePassword}
          value={password}
          rules={[
            {
              required: true,
              message: "Password is required",
            },
            {
              min: 6,
              message: "Min 6 characters required",
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Enter your Password" />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="cpassword"
          value={cpassword}
          onChange={onChangeCpassword}
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Please enter your password again",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("Passwords do not match");
              },
            }),
          ]}
          hasFeedback
          style={{ color: "#fff" }}
        >
          <Input.Password placeholder="Confirm your Password" />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 5, offset: 10 }}>
          <Button block type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
