//css
import "../styles/signup.css";
//assets
import google from "../assets/icons/google.svg";
//components
import Input from "./Input";
import UIToggler from "./UiToggler";
//react
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const navigate = useNavigate();

  const pattern = {
    email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    password: /^.{6,}$/,
  };

  const [lift, setLift] = useState({
    email: false,
    password: false,
    confirm_password: false,
  });

  const [values, setValues] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });

  const onChange = (value, name) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const { turnRight, walk, start, stop, started } = props.animation;

  const slide = () => {
    props.setFacingRight(false);
    if (!started) start();
    walk();
    setTimeout(() => {
      stop();
      turnRight();
    }, 2900);
  };

  return (
    <div className="signup-container">
      <div className="toggler-container">
        <UIToggler />
      </div>
      <p className="lovebirds-title">Lovebirds</p>
      <p className="lovebirds-welcome">Welcome to Lovebirds</p>
      <form className="signup-form">
        <div className="fields-container">
          <Input
            className="email"
            name="email"
            type="text"
            placeholder="Email*"
            required={true}
            value={values.email}
            onChange={onChange}
            pattern={pattern.email}
            lift={lift.email}
            setLift={setLift}
          />
          <Input
            className="password"
            name="password"
            type="password"
            placeholder="Password*"
            required={true}
            value={values.password}
            onChange={onChange}
            pattern={pattern.password}
            lift={lift.password}
            setLift={setLift}
          />
          <Input
            className="confirm-password"
            name="confirm_password"
            type="password"
            placeholder="Confirm password*"
            required={true}
            value={values.confirm_password}
            onChange={onChange}
            pattern={pattern.password}
            lift={lift.confirm_password}
            setLift={setLift}
          />
        </div>
        <input className="submit-btn" type="submit" value="Sign up" />
      </form>
      <div className="signup-foot">
        <div className="new-container">
          <p className="new-text">Already Lovebirds?</p>
          <button
            className="signin-btn"
            onClick={(e) => {
              e.preventDefault();
              slide();
              navigate("./signin", {replace: true});
            }}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
