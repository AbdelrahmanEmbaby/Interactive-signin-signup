//css
import "../../styles/page.css";
//assets
import animation from "../../assets/animation/Bird.riv";
//components
import Signin from "../Signin";
//react
import { useEffect, useState } from "react";
import Signup from "../Signup";
//rive
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
//react
import { useNavigate, useLocation } from "react-router-dom";

const STATE_MACHINE_NAME = "State Machine 1";

const Page = () => {
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/signin",{replace: true})
    }
  }, []);

  const [facingRight, setFacingRight] = useState(false);

  const [stateMachine, setStateMachine] = useState({
    start: true,
    walk: true,
    faceRight: true,
  });

  const { rive, RiveComponent } = useRive({
    src: animation,
    autoplay: true,
    artboard: "Bird",
    stateMachines: STATE_MACHINE_NAME,
  });

  const { rive: rive2, RiveComponent: RiveComponentMobile } = useRive({
    src: animation,
    autoplay: true,
    artboard: "Bird",
    stateMachines: STATE_MACHINE_NAME,
  });

  const stateStartMobile = useStateMachineInput(rive2, STATE_MACHINE_NAME, "start");

  const stateWalkMobile = useStateMachineInput(rive2, STATE_MACHINE_NAME, "walk");

  const triggerStartMobile = (value) => {
    stateStartMobile.value = value;
  };

  const triggerWalkMobile = (value) => {
    stateWalkMobile.value = value;
  };

  const stateStart = useStateMachineInput(rive, STATE_MACHINE_NAME, "start");

  const stateWalk = useStateMachineInput(rive, STATE_MACHINE_NAME, "walk");

  const stateFaceRight = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    "faceRight"
  );
  // const stateTurnR = useStateMachineInput(
  //   rive,
  //   STATE_MACHINE_NAME,
  //   "turnR"
  // );

  // const stateTurnL = useStateMachineInput(
  //   rive,
  //   STATE_MACHINE_NAME,
  //   "turnL"
  // );
  // const stateWalkLeft = useStateMachineInput(
  //   rive,
  //   STATE_MACHINE_NAME,
  //   "walkLeft"
  // );

  // const boolWalk = useStateMachineInput(
  //   rive,
  //   STATE_MACHINE_NAME,
  //   "walk"
  // );

  // const stateWalkLeft = useStateMachineInput(
  //   rive,
  //   STATE_MACHINE_NAME,
  //   "walkLeft"
  // );

  const triggerStart = (value) => {
    stateStart.value = value;
  };

  const triggerWalk = (value) => {
    stateWalk.value = value;
  };

  const triggerFaceRight = (value) => {
    stateFaceRight.value = value;
  };

  useEffect(() => {
    if (stateWalk) {
      triggerStart(stateMachine.start);
      triggerWalk(stateMachine.walk);
      triggerFaceRight(stateMachine.faceRight);
    }
    if(stateWalkMobile){
      triggerStartMobile(stateMachine.start);
      triggerWalkMobile(stateMachine.walk);
    }
  }, [stateMachine]);

  const start = () => {
    setStateMachine((prevState) => ({
      ...prevState,
      start: true,
    }));
  };

  const walk = () => {
    setStateMachine((prevState) => ({
      ...prevState,
      walk: true,
    }));
  };

  const stop = () => {
    setStateMachine((prevState) => ({
      ...prevState,
      walk: false,
    }));
  };

  const turnLeft = () => {
    setStateMachine((prevState) => ({
      ...prevState,
      walk: false,
      faceRight: true,
    }));
  };

  const turnRight = () => {
    setStateMachine((prevState) => ({
      ...prevState,
      walk: false,
      faceRight: false,
    }));
  };


  useEffect(()=>{
    console.log(location.pathname)
    if (location.pathname === "/signup") {
      setFacingRight(true);
      if (!stateMachine.start) start();
      setTimeout(() => {
        stop();
        turnLeft();
      }, 2900);
    }else if(location.pathname === "/signin"){
      setFacingRight(false);
      if (!stateMachine.start) start();
      setTimeout(() => {
        stop();
        turnRight();
      }, 2900);
    }
  },[rive,rive2])

  return (
    <div className="page-container">
      <div className="card-container">
        <div
          className={`${
            facingRight ? "slide-bottom" : "slide-top"
          } mobile-slider`}
        >
          <RiveComponentMobile
            style={{
              width: "20rem",
              height: "20rem",
            }}
          />
          <p className="title">Lorem ipsum dolor sit amet.</p>
          <p className="text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div className="one-piece">
          <div
            className={`${
              facingRight ? "ani-right" : "ani-left"
            } animation-container`}
          >
            <RiveComponent
              style={{
                width: "20rem",
                height: "20rem",
              }}
            />
          </div>
        </div>
        <div className={`${facingRight ? "slide-right" : "slide-left"} slider`}>
          <p className="title">Lorem ipsum dolor sit amet.</p>
          <p className="text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <Signup
          setFacingRight={setFacingRight}
          animation={{
            turnRight,
            walk,
            start,
            stop,
            started: stateMachine.start,
            facingRight,
          }}
        />
        <Signin
          setFacingRight={setFacingRight}
          animation={{
            turnLeft,
            walk,
            start,
            stop,
            started: stateMachine.start,
            facingRight
          }}
        />
      </div>
    </div>
  );
};

export default Page;
