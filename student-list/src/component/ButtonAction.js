import React, {useEffect, useState} from "react";

const ButtonAction = (props) => {
    const [countChecked, setCountChecked] = useState(0);

    const add = () => {
        props.handleAdd();
    };

    const remove = () => {
        if (window.confirm('Xác nhận xóa!')) props.multiRemove();
    };

    useEffect(() => {
        setCountChecked(() => {
            let count = 0;
            props.dataTable.forEach(i => {
                if (i.checked) count++;
            });
            return count;
        });
    }, [props.dataTable]);

    return (
        <div className="action">
            <button className='button-danger mr-5'
                    onClick={add}>
                Thêm mới
            </button>

            <button className={!countChecked
                ? 'not-allowed button-danger'
                : 'button-danger'}
                    disabled={!countChecked}
                    onClick={remove}>
                Xóa
            </button>
        </div>
    )
}

ButtonAction.defaultProps = {
    handleAdd: () => {},
    multiRemove: () => {},
}
export default ButtonAction;
