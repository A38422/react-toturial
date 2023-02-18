import React, {useState} from "react";
import Square from "./Square";

const Board = (props) => {
    const [dataBoard, setDataBoard] = useState(() => {
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

        if (checkWin(turn, row, col)) {
            let temp = dataBoard;
            temp.map(i => {
                i.data.map(j => {
                    j.disabled = true;
                });
            })
            setDataBoard(temp);
            const eResult = document.getElementsByClassName('result')[0];
            eResult.textContent = checkWin(turn, row, col).turn ? `${checkWin(turn, row, col).turn} thắng` : 'Hòa';
            eResult.className = checkWin(turn, row, col).turn ? 'text-win' : 'text-draw';
        }
    }

    const checkWin = (turn, row, col) => {
        const sizeWin = 3;

        // Kiểm tra hàng ngang
        let count = 0;
        let arrIndex = [];
        for (let i = col; i >= 0; i--) {
            if (dataBoard[row].data[i].value === turn) {
                count++;
                arrIndex.push({row: row, col: i});
            } else {
                break;
            }
        }
        for (let i = col + 1; i < dataBoard.length; i++) {
            if (dataBoard[row].data[i].value === turn) {
                count++;
                arrIndex.push({row: row, col: i});
            } else {
                break;
            }
        }
        if (count >= sizeWin) {
            let temp = dataBoard;
            arrIndex.forEach(i => {
                temp[i.row].data[i.col].className = 'btn-danger';
            });
            setDataBoard(temp);

            return {
                result: true,
                turn: turn
            };
        }

        // Kiểm tra hàng dọc
        count = 0;
        arrIndex = [];
        for (let i = row; i >= 0; i--) {
            if (dataBoard[i].data[col].value === turn) {
                count++;
                arrIndex.push({row: i, col: col});
            } else {
                break;
            }
        }
        for (let i = row + 1; i < dataBoard.length; i++) {
            if (dataBoard[i].data[col].value === turn) {
                count++;
                arrIndex.push({row: i, col: col});
            } else {
                break;
            }
        }
        if (count >= sizeWin) {
            let temp = dataBoard;
            arrIndex.forEach(i => {
                temp[i.row].data[i.col].className = 'btn-danger';
            });
            setDataBoard(temp);

            return {
                result: true,
                turn: turn
            };
        }

        // Kiểm tra đường chéo chính
        count = 0;
        arrIndex = [];
        for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
            if (dataBoard[i].data[j].value === turn) {
                count++;
                arrIndex.push({row: i, col: j});
            } else {
                break;
            }
        }
        for (let i = row + 1, j = col + 1; i < dataBoard.length && j < dataBoard.length; i++, j++) {
            if (dataBoard[i].data[j].value === turn) {
                count++;
                arrIndex.push({row: i, col: j});
            } else {
                break;
            }
        }
        if (count >= sizeWin) {
            let temp = dataBoard;
            arrIndex.forEach(i => {
                temp[i.row].data[i.col].className = 'btn-danger';
            });
            setDataBoard(temp);

            return {
                result: true,
                turn: turn
            };
        }

        // Kiểm tra đường chéo phụ
        count = 0;
        arrIndex = [];
        for (let i = row, j = col; i >= 0 && j < dataBoard.length; i--, j++) {
            if (dataBoard[i].data[j].value === turn) {
                count++;
                arrIndex.push({row: i, col: j});
            } else {
                break;
            }
        }
        for (let i = row + 1, j = col - 1; i < dataBoard.length && j >= 0; i++, j--) {
            if (dataBoard[i].data[j].value === turn) {
                count++;
                arrIndex.push({row: i, col: j});
            } else {
                break;
            }
        }
        if (count >= sizeWin) {
            let temp = dataBoard;
            arrIndex.forEach(i => {
                temp[i.row].data[i.col].className = 'btn-danger';
            });
            setDataBoard(temp);

            return {
                result: true,
                turn: turn
            };
        }

        // Kiểm tra hòa
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
                                    onClick={sort}>Sắp xếp
                            </button>
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
