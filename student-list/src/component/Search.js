import React, {useState} from 'react';
import Input from "./Input";

const Search = (props) => {
    const [valueInput, setValueInput] = useState('');

    const handleChangeInput = (e) => {
        setValueInput(e.target.value);
    };

    const submit = () => {
        props.search(valueInput);
    };

    return (
        <div className="flex-row">
            <Input classLabel="label"
                   label="Từ khóa"
                   placeholder="Từ khóa cần tìm"
                   value={valueInput}
                   onChange={handleChangeInput}/>
            <button className="button-danger ml-5" onClick={submit}>Tìm kiếm</button>
        </div>
    )
}
export default Search;
