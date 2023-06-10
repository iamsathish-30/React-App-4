import React from "react";
import '../main.css'
export default function Die(props){
    //console.log(props);
    const styles ={ backgroundColor:  props.isHeld === true ? "#59E391" : "#fff"}
    return (
        <div className="die-face" style={styles} onClick={()=>props.hold(props.id)}>
            <h4 className="die-num">{props.number}</h4>
        </div>
    );
}