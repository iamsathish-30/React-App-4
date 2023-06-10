import React from "react";
import './main.css'
import Die from './components/Die.jsx';
import { nanoid } from "nanoid";


export default function App(){

    const [tenzies , setTenzies] = React.useState(false);

    const [ dice , setDice] = React.useState(allNewDice());

    React.useEffect(()=>{
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true);
            console.log("You won!")
        }
    },[dice]);

    function allNewDice(){
        const arrDice = [];
        for(let i = 0 ; i < 10 ; i++){
            arrDice.push({
                id:nanoid(),
                number:Math.ceil(Math.random()*6),
                isHeld : false
            })
        }
        return arrDice;
    }
    const [noOfRolls , setNoOfRolls] = React.useState(0);

    function handleClick(){
        setNoOfRolls(prevRoll => prevRoll+1);
        setDice(prevDice=>prevDice.map(e=>{
                return e.isHeld === true ? e 
                : {id:nanoid() , number:Math.ceil(Math.random()*6),isHeld : false}
            })
        );
        console.log(noOfRolls); 
    }

    function handleReset(){
        setDice(allNewDice);
        setTenzies(false);
    }

    function holdDice(id){
        setDice(prevDice=>prevDice.map(e =>{
                return e.id === id ? {...e , isHeld:!e.isHeld} : e
            })
        )
    }

    const diceElement = dice.map( diceObj => <Die 
        number={diceObj.number}
        key = {diceObj.id}
        id={diceObj.id}
        isHeld = {diceObj.isHeld}
        hold={holdDice}
        />)
    const btn = tenzies ? "New Game" :"Roll";
    return (
        <main>
            <div className="header-container">
                <h1 className="title">Tenzies</h1>
                <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            </div>
            <div className="dice-container">
                {diceElement}
            </div>
            <button className="roll-dice" onClick={btn==="Roll" ? handleClick : handleReset}>{btn}</button>
        </main>
    );
}