//css
import "../../styles/page.css";
//assets
import bird from "../../assets/images/Love_Birds.jpg";
import animation from "../../assets/animation/Bird.riv";
//components
import Signin from "../Signin";
//react
import { useEffect, useState } from "react";
import Signup from "../Signup";
//rive
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";

const STATE_MACHINE_NAME = "State Machine 1";

const Page = () => {
  const [facingRight, setFacingRight] = useState(false);
  console.log(facingRight);

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


  // const triggerTurnR = () => {
  //   stateTurnR && stateTurnR.fire();
  // };

  // const triggerWalkLeft= () => {
  //   stateWalkLeft && stateWalkLeft.fire();
  // };

  return (
    <div className="page-container">
      <div className="card-container">
        <div className={`${facingRight ? "slide-right" : "slide-left"} slider`}>
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
          }}
        />
      </div>
    </div>
  );
};

export default Page;
