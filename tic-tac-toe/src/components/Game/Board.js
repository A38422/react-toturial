import React, {useState} from "react";
import Square from "./Square";

const Board = (props) => {
    const [dataBoard, setDataBoard] =useState(() => {
        let board = [];
        for (let i = 0; i < props.sizeBoard; i++) {
            board.push({id: i, data: []});
            for (let j = 0; j < props.sizeBoard; j++) {
                board[i].data.push({
                    id: j,
                    value: '',
                    className: '',
                    disable: false,
                })
            }
        }
        return board;
    });

    const [turn, setTurn] = useState('X');

    const [history, setHistory] = useState([]);

    const [checkSort, setCheckSort] = useState(false);

    const handleClick = (row, col) => {
        let db = dataBoard;
        db[row].data[col] = {
            value: turn,
            disabled: true
        };
        setDataBoard(db);
        turn === 'X' ? setTurn('O') : setTurn('X');

        let htr = history;
        htr = htr.map(i => {
            return {
                ...i,
                bold: false
            }
        });
        if (!checkSort) {
            htr.push({col: col, row: row, bold: true});
        } else {
            htr = [{col: col, row: row, bold: true}, ...htr];
        }
        setHistory(htr);

        if (checkWin()) {
            let temp = dataBoard;
            temp.map(i => {
                i.data.map(j => {
                   j.disabled = true;
                });
            })
            setDataBoard(temp);
            const eResult = document.getElementsByClassName('result')[0];
            eResult.textContent = checkWin().turn ? `${checkWin().turn} thắng` : 'Hòa';
            eResult.className = checkWin().turn ? 'text-win' : 'text-draw';
        }
    }

    const checkWin = () => {
        let result = true;
        for (let i = 0; i < dataBoard.length; i++) {     //duong cheo 1
            result = result && (dataBoard[i].data[i].value === turn);
        }
        if (result) {
            for (let i = 0; i < dataBoard.length; i++) {
                let temp = dataBoard;
                temp[i].data[i].className = 'btn-danger';
                setDataBoard(temp);
            }
            return {
                result: result,
                turn: turn
            };
        }

        result = true;
        for (let i = 0; i < dataBoard.length; i++) {  //duong cheo 2
            result = result && (dataBoard[dataBoard.length - 1 - i].data[i].value === turn);
        }
        if (result) {
            for (let i = 0; i < dataBoard.length; i++) {
                let temp = dataBoard;
                temp[temp.length - 1 - i].data[i].className = 'btn-danger';
                setDataBoard(temp);
            }
            return {
                result: result,
                turn: turn
            };
        }

        for (let i = 0; i < dataBoard.length; i++) {
            result = true;
            for (let j = 0; j < dataBoard.length; j++) {      //dong
                result = result && (dataBoard[i].data[j].value === turn);
            }
            if (result) {
                for (let j = 0; j < dataBoard.length; j++) {
                    let temp = dataBoard;
                    temp[i].data[j].className = 'btn-danger';
                    setDataBoard(temp);
                }
                return {
                    result: result,
                    turn: turn
                };
            }

            result = true;
            for (let j = 0; j < dataBoard.length; j++) {      //cot
                result = result && (dataBoard[j].data[i].value === turn);
            }
            if (result) {
                for (let j = 0; j < dataBoard.length; j++) {
                    let temp = dataBoard;
                    temp[j].data[i].className = 'btn-danger';
                    setDataBoard(temp);
                }
                return {
                    result: result,
                    turn: turn
                };
            }
        }

        let checkDraw = true;
        for (let i = 0; i < dataBoard.length; i++) {
            for (let j = 0; j < dataBoard.length; j++) {
                if (!dataBoard[i].data[j].value) checkDraw = false;
            }
        }
        return checkDraw;
    }

    const refresh = () => {
        window.location.reload();
    }

    const sort = () => {
        setHistory([...history.reverse()]);
        setCheckSort(() => {
            return !checkSort;
        });
    }

    return (
        <div style={{display: "flex"}}>
            <div className="board">
                <div>
                    {
                        dataBoard.map((i, index1) => {
                            return <div className="row" key={index1}>{
                                i.data.map((j, index2) => {
                                    return <Square key={index2}
                                                   value={j.value}
                                                   className={j.className}
                                                   disabled={j.disabled}
                                                   onClick={() => handleClick(index1, index2)}/>;
                                })}</div>;
                        })
                    }
                </div>

                <div style={{textAlign: "center", marginTop: "30px"}}>
                    <div className="turn">
                        <span className="turn-label">Lượt chơi: </span>
                        <span className="current-turn">{turn}</span>
                    </div>

                    <div className="result"></div>

                    <div className="refresh">
                        <button onClick={refresh}>Làm mới</button>
                    </div>
                </div>
            </div>

            <div className="history">
                {
                    history && history.length > 0
                    ? <div>
                            <button style={{marginRight: "10px"}}
                                    onClick={sort}>Sắp xếp</button>
                        </div>
                    : ''
                }

                {
                    history.map((i, index) => {
                        if (i.bold) {
                            return <div className="bold"
                                        key={index}>
                                ({`${i.col}, ${i.row}`})
                            </div>
                        }
                        return <div key={index}>
                            ({`${i.col}, ${i.row}`})
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Board;
