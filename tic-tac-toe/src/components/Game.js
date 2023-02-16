import React from "react";
import {useState} from "react";
import Board from "./Game/Board";

const Game = () => {
    const [sizeBoard, setSizeBoard] = useState(0);

    const submit = () => {
        const element = document.getElementById('size-board');

        if (!element.value) {
            alert('Vui lòng nhập kích thước bảng!');
            return;
        } else if (element.value === '0' || element.value === 0) {
            alert('Kích thước bảng phải khác 0!');
            return;
        }
        setSizeBoard(Number(element.value));
        element.disabled = true;
    }

    const handleChangeInput = (e) => {
        e.target.value = Math.abs(Number(e.target.value));
        if (e.target.value === '0'
            || e.target.value === '1'
            || e.target.value === '2')
            e.target.value = '';
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') submit();
    }

    return (
        <div className="game">
            {sizeBoard
            ? <Board sizeBoard={sizeBoard}/>
            : <div className="form">
                <label htmlFor="size-board">Nhập kích thước bảng:</label>
                <input type="number"
                       name="size-board"
                       id="size-board"
                       onKeyDown={handleKeyDown}
                       onChange={handleChangeInput}/>
                <button onClick={submit}>Xác nhận</button>
            </div>}
        </div>
    )
}

export default Game;
