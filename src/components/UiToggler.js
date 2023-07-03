//css
import "../styles/uitoggler.css"
//react
import { useContext } from "react";
//context
import { UI } from "../App";

const UIToggler = (props)=>{
    const {isDark,setIsDark} = useContext(UI)
    const toggle = ()=>{
      if(props.animation){
        const {triggerTail, triggerLick} = props.animation
        isDark?triggerTail():triggerLick()
      }
      setIsDark(!isDark)
    }
    return (
      <div className="ui-toggler" onClick={toggle}>
        <i className="fa-solid fa-sun sun"></i>
        <div className="toggler"></div>
        <i className="fa-solid fa-moon moon"></i>
      </div>
    );
}

export default UIToggler