//css
import "../../styles/notfound.css";
//assets
import animation from "../../assets/animation/Cat.riv";
//rive
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import UIToggler from "../UiToggler";

const STATE_MACHINE_NAME = "Practice Cat";

const NotFound = () => {
  const { rive, RiveComponent } = useRive({
    src: animation,
    autoplay: true,
    artboard: "New Artboard",
    stateMachines: STATE_MACHINE_NAME,
  });

  const stateTail = useStateMachineInput(rive, STATE_MACHINE_NAME, "Pressed");

  const stateLick = useStateMachineInput(rive, STATE_MACHINE_NAME, "Pressed 2");

  const triggerTail = (value) => {
    stateTail.fire();
  };

  const triggerLick = (value) => {
    stateLick.fire();
  };

  return (
    <div className="notfound-contatiner">
      <div className="toggler-container">
        <UIToggler animation={{ triggerTail, triggerLick }} />
        <RiveComponent
          style={{
            width: "20rem",
            height: "20rem",
          }}
        />
      </div>
      <p className="error">404</p>
      <p className="message">
        <span>Whiskers</span>
        couldn't find
        <span>Lovebirds</span>
      </p>
    </div>
  );
};
export default NotFound;
