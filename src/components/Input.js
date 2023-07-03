//css
import { useState } from "react";
import "../styles/input.css";

const Input = (props) => {
  const handleFocus = (bool) => {
    props.setLift((prevState) => ({
      ...prevState,
      [props.name]: bool,
    }));
  };

  const [show, setShow] = useState(false);
  return (
    <div
      className={`${props.className}-input-container input-container`}
    >
      <label
        className={`${props.lift || props.value ? "lift" : ""} placeholder`}
      >
        {props.placeholder}
      </label>
      <input
        className="input"
        name={props.name}
        type={props.type === "password" && !show ? "password" : "text"}
        required={props.required}
        onFocus={() => handleFocus(true)}
        onBlur={() => handleFocus(false)}
        value={props.value}
        onChange={(e) => {
          props.onChange(e.target.value, e.target.name);
        }}
      />
      {props.type === "password" && (
        <button
          className={`${props.lift || props.value ? "dim" : ""} eye-btn`}
          onClick={(e) => {
            e.preventDefault();
            setShow(!show);
          }}
        >
          {show ? (
            <i className="fa-solid fa-eye"></i>
          ) : (
            <i className="fa-solid fa-eye-slash"></i>
          )}
        </button>
      )}
      <span className="error"></span>
    </div>
  );
};

export default Input;
