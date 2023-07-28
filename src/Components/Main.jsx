import React, { useEffect, useState } from 'react'
import Die from './/Die'
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

export default function Main() {

    const [dice, setDice] = useState(allNewDice())
    const [result, setResult] = useState(false)

    useEffect(() => {
        let allStatus = dice.every(value => value.isHeld == true)
        let firstDice = dice[0].value
        let allNumber = dice.every(die => die.value == firstDice)
        if (allStatus && allNumber) {
            setResult(true)
        }
    }, [dice])

    function allNewDice() {
        let randomNumbers = []
        for (let i = 0; i < 10; i++) {
            let randomNo = Math.floor(Math.random() * 6)
            randomNumbers.push({ id: nanoid(), value: randomNo + 1, isHeld: false })
        }
        return randomNumbers
    }

    function holdDice(id) {
        // console.log("Dice Hold ", id)
        setDice((prev) => {
            return prev.map((value) => {
                return value.id == id ? { ...value, isHeld: !value.isHeld } : value
            })
        })
    }

    let dies = dice.map((die) => {
        return <Die value={die.value} key={die.id} isHeld={die.isHeld} id={die.id} holdDice={holdDice} />
    })

    function rollDice() {

        setDice((prev) => {
            return prev.map((value) => {
                return value.isHeld ? value : { id: nanoid(), value: Math.floor(Math.random() * 6), isHeld: false }
            })
        })

    }

    function handleNewGame() {
        setDice(allNewDice())
        setResult(false)
    }

    return (
        <div className='main'>
            {result && <Confetti />}
            <h2>Tenzies Dice Game</h2>
            <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dieContainer">
                {dies}
            </div>
            {!result && <div className='rollBtn' onClick={rollDice}>Roll</div>}
            {result && <div className='rollBtn finishBtn'>Game Finished</div>}
            {result && <div onClick={handleNewGame} className='rollBtn newGameBtn'>Start a New Game</div>}
        </div>
    )
}
