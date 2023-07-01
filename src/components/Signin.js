//css
import "../styles/signin.css";
//assets
import google from "../assets/icons/google.svg";
//components
import Input from "./Input";
//react
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = (props) => {
  const navigate = useNavigate;

  const pattern = {
    email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    password: /^.{6,}$/,
  };

  const [lift, setLift] = useState({
    email: false,
    password: false,
  });

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const onChange = (value, name) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const { turnLeft, walk, start, stop, started } = props.animation;

  const slide = () => {
    props.setFacingRight(true);
    if (!started) start();
    walk();
    setTimeout(()=>{
      stop();
      turnLeft()
    },2900)
  };

  return (
    <div className="signin-container">
      <p className="lovebirds-title">Lovebirds</p>
      <p className="lovebirds-welcome">Welcome to Lovebirds</p>
      <form className="signin-form">
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
        </div>
        <button
          className="forgot-btn"
          onClick={(e) => {
            e.preventDefault();
            navigate("/forgotpassword");
          }}
        >
          Forgot password?
        </button>
        <input className="submit-btn" type="submit" value="Sign in" />
      </form>
      <div className="signin-foot">
        <p className="or-section">or</p>
        <button className="google-btn">
          <img src={google} alt="google" />
          Sign in with Google
        </button>
        <div className="new-container">
          <p className="new-text">New Lovebirds?</p>
          <button
            className="create-btn"
            onClick={(e) => {
              e.preventDefault();
              slide();
            }}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
