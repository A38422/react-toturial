import React from "react";

const Square = (props) => {
    return (
        <div className="square">
            <button className={props.className + " tic-tac-toe"}
                    onClick={props.onClick}
                    disabled={props.disabled}>
                {props.value}
            </button>
        </div>
    )
}

export default Square;
