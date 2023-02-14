import React, {useEffect, useState} from 'react';
import Input from "./Input";
import moment from "moment";

const FormInfo = (props) => {
    const mappingGender = {
        'Nam': 'male',
        'Nữ': 'female'
    }

    const mappingDepartment = {
        'Kinh tế': 'kt',
        'Ngôn ngữ Anh': 'nna',
        'Ngôn ngữ Hàn Quốc': 'nnhq',
        'Ngôn ngữ Nhật': 'nnn',
        'Công nghệ thông tin': 'cntt',
        'Truyền thông đa phương tiện': 'ttdpt'
    }

    const defaultFormData = {
        maSV: '',
        tenSV: '',
        ngaySinh: '',
        gioiTinh: '',
        khoa: ''
    }

    const defaultErrorInput = {
        maSV: '',
        tenSV: ''
    }

    const defaultDisable = {
        btnAdd: false,
        btnEdit: true,
        btnRemove: true,
        inputMaSV: false
    }

    const [formData, setFormData] = useState(defaultFormData);

    const [errorInput, setErrorInput] = useState(defaultErrorInput);

    const [disables, setDisables] = useState(defaultDisable);

    const handleChangeInput = (e, key) => {
        setFormData(() => {
            return {
                ...formData,
                [key]: e.target.value
            }
        });
    }

    const handleChangeGender = (e) => {
        if (e.target.checked && e.target.value !== formData.gioiTinh) {
            setFormData(() => {
                return {
                    ...formData,
                    gioiTinh: e.target.value
                }
            });
        }
    }

    const handleChangeKhoa = (e) => {
        setFormData(() => {
            return {
                ...formData,
                khoa: e.target.value
            }
        })
    }

    const checkValidateForm = () => {
        let isCheck = true;
        let tempError = {
            tenSV: '',
            maSV: ''
        }

        if (!formData.maSV) {
            tempError.maSV = 'Vui lòng điển mã sinh viên!';
            isCheck = false;
        }

        if (!formData.tenSV) {
            tempError.tenSV = 'Vui lòng điển tên sinh viên!';
            isCheck = false;
        }
        setErrorInput(tempError);
        return isCheck;
    }

    const addItem = () => {
        if (checkValidateForm()) {
            let checkUnique = props.dataTable.find(i => i.maSV.toLowerCase() === formData.maSV.toLowerCase());
            if (!checkUnique) {
                props.addItem(formData);
                setFormData(defaultFormData);
                window.alert('Thêm thành công!');
            } else {
                window.alert('Mã sinh viên đã tồn tại!');
            }
        }
    }

    const editItem = () => {
        if (checkValidateForm()) {
            props.editItem(formData);
            setFormData(defaultFormData);
            setErrorInput(defaultErrorInput);
            setDisables(defaultDisable);
            window.alert('Cập nhật thành công!');
        }
    }

    const removeItem = () => {
        if (window.confirm('Xác nhận xóa!')) {
            props.removeItem(formData);
            setFormData(defaultFormData);
            setErrorInput(defaultErrorInput);
            setDisables(defaultDisable);
            document.getElementById('male').checked = false;
            document.getElementById('female').checked = false;
        }
    }

    const formatDate = (value) => {
        if (value && value.includes('/')) {
            let temp = value.split("/");
            let newDate = new Date(temp[2], temp[1] - 1, temp[0]);
            return moment(+newDate.getTime()).format('YYYY-MM-DD');
        }
        return '';
    }

    useEffect(() => {
        if (props.dataEdit) {
            const data = props.dataEdit;
            setFormData(() => {
                return {
                    ...formData,
                    ...data,
                    gioiTinh: mappingGender[data.gioiTinh],
                    ngaySinh: formatDate(data.ngaySinh),
                    khoa: mappingDepartment[data.khoa]
                }
            });
            setDisables(() => {
                return {
                    ...disables,
                    btnAdd: true,
                    btnEdit: false,
                    btnRemove: false,
                    inputMaSV: true,
                }
            });
            setErrorInput(defaultErrorInput);
            if (data.gioiTinh) {
                document.getElementById(mappingGender[data.gioiTinh]).checked = true;
            }
        }
    }, [props.dataEdit])

    return (
        <>
            <div className="action">
                <button className={disables.btnAdd
                                    ? 'not-allowed button-danger mr-5'
                                    : 'button-danger mr-5'}
                        disabled={disables.btnAdd}
                        onClick={addItem}>
                    Thêm mới
                </button>

                <button className={disables.btnEdit
                                    ? 'not-allowed button-danger mr-5'
                                    : 'button-danger mr-5'}
                        disabled={disables.btnEdit}
                        onClick={editItem}>
                    Cập nhật
                </button>

                <button className={disables.btnRemove
                                    ? 'not-allowed button-danger'
                                    : 'button-danger'}
                        disabled={disables.btnRemove}
                        onClick={removeItem}>
                    Xóa
                </button>
            </div>

            <div className="info">
                <div className="item-info">
                    <Input label="Mã SV"
                           classLabel="require label"
                           value={formData.maSV}
                           error={errorInput.maSV}
                           disabled={disables.inputMaSV}
                           onChange={(e) => {
                               handleChangeInput(e, 'maSV')
                           }}/>
                </div>

                <div className="item-info">
                    <Input label="Tên SV"
                           classLabel="require label"
                           value={formData.tenSV}
                           error={errorInput.tenSV}
                           onChange={(e) => {
                               handleChangeInput(e, 'tenSV')
                           }}/>
                </div>
                <div className="item-info">
                    <Input label="Ngày sinh"
                           classLabel="label"
                           type="date"
                           value={formData.ngaySinh}
                           onChange={(e) => {
                               handleChangeInput(e, 'ngaySinh')
                           }}/>
                </div>

                <div className="item-info">
                    <span className="label mr-10">Giới tính</span>
                    <input type="radio"
                           id="male"
                           name="rdbGioiTinh"
                           value="male"
                           onChange={handleChangeGender}/>
                    <label htmlFor="male">Nam</label>
                    <input type="radio"
                           id="female"
                           name="rdbGioiTinh"
                           value="female"
                           onChange={handleChangeGender}/>
                    <label htmlFor="female">Nữ</label><br/>
                </div>

                <div className="item-info">
                    <label htmlFor="drpKhoa" className="label mr-10 require">Khoa</label>
                    <select name="drpKhoa"
                            id="drpKhoa"
                            value={formData.khoa}
                            required
                            onChange={handleChangeKhoa}>
                        <option value="kt">Kinh tế</option>
                        <option value="nna">Ngôn ngữ Anh</option>
                        <option value="nnhq">Ngôn ngữ Hàn Quốc</option>
                        <option value="nnn">Ngôn ngữ Nhật</option>
                        <option value="cntt">Công nghệ thông tin</option>
                        <option value="ttdpt">Truyền thông đa phương tiện</option>
                    </select>
                </div>
            </div>
        </>
    )
}

FormInfo.defaultProps = {
    addItem: () => {},
    editItem: () => {},
    removeItem: () => {}
}
export default FormInfo;
