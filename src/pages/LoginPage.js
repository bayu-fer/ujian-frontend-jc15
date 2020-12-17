import Axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button, Input, Alert } from "reactstrap";
import { api_url } from "../helpers/api_url";
import { loginAction, fetchCartAction } from "../redux/actions";

//! BELUM NAMBAHIN NO 1 poin 3

class LoginPage extends Component {
  state = {
    loginInfo: {
      email: "",
      password: "",
    },
  };

  UncorectPass = () => {
    return (
        <Alert color="danger">"email dan password harus mengandung angka dan minimal 6 karakter"</Alert>
    )
  }

  onchangeInput = (e) => {
    this.setState({
      loginInfo: { ...this.state.loginInfo, [e.target.id]: e.target.value },
    });
  };

  clickLogin = () => {
    var regex = /^(?=.*\d)(?=.*[a-z]).{6,}$/;
    const { email, password } = this.state.loginInfo;

    if (email.match(regex) && password.match(regex)) {
      // !ini nyarik
      Axios.get(`${api_url}/users?email=${email}&password=${password}`)
        .then((res) => {
          if (res.data.length === 1) {
            this.props.loginAction(res.data[0]);
            localStorage.setItem("id", res.data[0].id);
            this.props.fetchCartAction(res.data[0].id);
          } else if (res.data.length === 0) {
            // ! ini yang nambahin
            Axios.post(`${api_url}/users`, { email, password })
              .then((res) => {
                this.props.loginAction(res.data);
                localStorage.setItem("id", res.data.id);
                console.log(res.data);
                this.props.fetchCartAction(res.data.id);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // this.UncorectPass()
      alert('password dan email min 6 karakter dan ada angka')
    }
  };
  render() {
    const { userID } = this.props;
    // console.log(userID);
    if (userID !== 0) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            paddingTop: "100px",
          }}
        >
          <div style={{ color: "black" }}>
            <h1>Welcome To KameraKawan Store</h1>
          </div>
          <div>
            <Input
              placeholder="email"
              type="email"
              id="email"
              onChange={this.onchangeInput}
              style={{ margin: "5px" }}
            />
          </div>
          <div>
            <Input
              placeholder="password"
              type="password"
              id="password"
              onChange={this.onchangeInput}
              style={{ margin: "5px" }}
            />
          </div>
            <div>{this.UncorectPass}</div>
          <div>
            <Button
              onClick={this.clickLogin}
              style={{ margin: "5px" }}
              color="primary"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStatetoPros = (state) => {
  return {
    userID: state.user.id,
    emailUser: state.user.email,
  };
};

export default connect(mapStatetoPros, { loginAction, fetchCartAction })(
  LoginPage
);
