import React from 'react'

export default function Die(props) {
    return (
        <div className='die' onClick={() => { props.holdDice(props.id) }} style={{ backgroundColor: props.isHeld == true ? "#89771c" : "#e1e1e1", color: props.isHeld == true ? "white" : "" }}>
            {props.value}
        </div>
    )
}
