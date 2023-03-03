import React, {useEffect, useState} from 'react';
import Input from "./Input";
import formatDate from '../utils/dateFormatter';
import ApiService from '../services/api';
import {mappingDepartment, mappingGender, mappingGenderReverse, mappingDepartmentReverse} from '../constants.js/mapping';

const FormInfo = (props) => {
    const defaultFormData = {
        maSV: '',
        tenSV: '',
        ngaySinh: '',
        gioiTinh: '',
        khoa: 'kt'
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
                ApiService.post('/CreateStudent', {
                    ...formData,
                    gioiTinh: mappingGender[formData.gioiTinh],
                    khoa: mappingDepartment[formData.khoa]
                }).then(response => {
                    props.addItem(response);
                    setFormData(defaultFormData);
                    window.alert('Thêm thành công!');
                }).catch(error => {
                    console.error(error);
                    window.alert('Có lỗi xảy ra!');
                });
            } else {
                window.alert('Mã sinh viên đã tồn tại!');
            }
        }
    }

    const editItem = () => {
        if (checkValidateForm()) {
            ApiService.put(`/UpdateStudent/${props.dataEdit.id}`, {
                ...formData,
                gioiTinh: mappingGender[formData.gioiTinh],
                khoa: mappingDepartment[formData.khoa]
            }).then(response => {
                props.editItem(response);
                setFormData(defaultFormData);
                setErrorInput(defaultErrorInput);
                setDisables(defaultDisable);
                window.alert('Cập nhật thành công!');
            }).catch(error => {
                console.error(error);
                window.alert('Có lỗi xảy ra!');
            });
        }
    }

    const handleSubmit = () => {
        if (props.status === 'add') {
            addItem();
        } else if (props.status === 'edit') {
            editItem();
        }
    }

    const handleBack = () => {
        props.back();
    }

    useEffect(() => {
        if (props.dataEdit) {
            const data = props.dataEdit;

            const parts = data.ngaySinh.split('/');
            const dateObject = new Date(parts[2], parts[1] - 1, parts[0]);
            const dateValue = dateObject.toISOString().substring(0, 10);

            setFormData(() => {
                return {
                    ...formData,
                    ...data,
                    gioiTinh: mappingGenderReverse[data.gioiTinh],
                    ngaySinh: dateValue,
                    khoa: mappingDepartmentReverse[data.khoa]
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
                document.getElementById(mappingGenderReverse[data.gioiTinh]).checked = true;
            }
        }
    }, [props.dataEdit])

    return (
        <>
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

            <div className="action">
                <button className='button-danger mr-5'
                        onClick={handleSubmit}>
                    Xác nhận
                </button>
                <button className='button-danger'
                        onClick={handleBack}>
                    Quay lại
                </button>
            </div>
        </>
    )
}

FormInfo.defaultProps = {
    addItem: () => {},
    editItem: () => {},
    back: () => {}
}
export default FormInfo;
