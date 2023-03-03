import React, {useState, useEffect} from 'react';
import Input from "./Input";
import { useLocation } from 'react-router-dom';

const Search = (props) => {
    const location = useLocation();

    const [valueInput, setValueInput] = useState('');

    const handleChangeInput = (e) => {
        setValueInput(e.target.value);
    };

    const submit = () => {
        props.search(valueInput);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            submit();
        }
    };

    useEffect(() => {
        const search = new URLSearchParams(location.search).get('query');
        if (search) {
            setValueInput(search);
        }
    }, [])

    return (
        <div className="flex-row">
            <Input classLabel="label"
                   label="Từ khóa"
                   placeholder="Nhập tên hoặc mã sinh viên"
                   value={valueInput}
                   onKeyDown={handleKeyDown}
                   onChange={handleChangeInput}/>
            <button className="button-danger ml-5" onClick={submit}>Tìm kiếm</button>
        </div>
    )
}
export default Search;
