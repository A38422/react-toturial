import React from 'react';

const Input = (props) => {
    return (
        <div className="flex-row">
            <span className={props.classLabel + ' mr-10'}>{props.label}</span>
            <div className="flex-colum">
                <input type={props.type}
                       id={props.id}
                       className={props.classInput}
                       value={props.value}
                       name={props.name}
                       placeholder={props.placeholder}
                       onChange={props.onChange}
                       onKeyDown={props.onKeyDown}
                       disabled={props.disabled}/>
                <small className={props.classError}>{props.error}</small>
            </div>
        </div>
    );
}

Input.defaultProps = {
    type: 'text',
    classLabel: '',
    classError: 'text-error',
    classInput: '',
    onChange: () => {}
}
export default Input;
