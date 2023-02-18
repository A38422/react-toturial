import './App.css';
import Search from "./component/Search";
import List from "./component/List";
import FormInfo from "./component/FormInfo";
import ButtonAction from "./component/ButtonAction";
import React, {useState} from "react";
import moment from "moment";

const App = () => {
    const mappingGender = {
        'male': 'Nam',
        'female': 'Nữ'
    }

    const mappingDepartment = {
        'kt': 'Kinh tế',
        'nna': 'Ngôn ngữ Anh',
        'nnhq': 'Ngôn ngữ Hàn Quốc',
        'nnn': 'Ngôn ngữ Nhật',
        'cntt': 'Công nghệ thông tin',
        'ttdpt': 'Truyền thông đa phương tiện'
    }

    const defaultDataTable = [
        {
            checked: false,
            maSV: 'A12345',
            tenSV: 'Trần Văn A',
            ngaySinh: '11/05/2002',
            gioiTinh: 'Nam',
            khoa: 'Công nghệ thông tin'
        },
        {
            checked: false,
            maSV: 'A23456',
            tenSV: 'Nguyễn Thị B',
            ngaySinh: '06/07/2002',
            gioiTinh: 'Nữ',
            khoa: 'Ngôn ngữ Anh'
        },
        {
            checked: false,
            maSV: 'A34567',
            tenSV: 'Nguyễn Văn C',
            ngaySinh: '01/01/2002',
            gioiTinh: 'Nam',
            khoa: 'Truyền thông đa phương tiện'
        },
        {
            checked: false,
            maSV: 'A45678',
            tenSV: 'Đặng Ngọc D',
            ngaySinh: '02/06/2002',
            gioiTinh: 'Nữ',
            khoa: 'Kinh tế'
        },
        {
            checked: false,
            maSV: 'A56789',
            tenSV: 'Nguyễn Tuấn E',
            ngaySinh: '15/11/2002',
            gioiTinh: 'Nam',
            khoa: 'Ngôn ngữ Hàn Quốc'
        },
        {
            checked: false,
            maSV: 'A67890',
            tenSV: 'Đinh Thị F',
            ngaySinh: '11/12/2002',
            gioiTinh: 'Nữ',
            khoa: 'Ngôn ngữ Nhật'
        },
    ];

    const header = ['Mã SV', 'Tên sinh viên', 'Ngày sinh', 'Giới tính', 'Khoa', 'Hành động'];

    const [dataTable, setDataTable] = useState(defaultDataTable);

    const [dataEdit, setDataEdit] = useState(null);

    const [status, setStatus] = useState('');

    const addItem = (data) => {
        setDataTable(() => {
            return [...dataTable, {
                checked: false,
                ...data,
                gioiTinh: mappingGender[data.gioiTinh],
                khoa: mappingDepartment[data.khoa],
                ngaySinh: formatDate(data.ngaySinh)
            }]
        });
        setStatus('');
    }

    const editItem = (data) => {
        setDataTable(() => {
            return dataTable.map(i => {
                if (i.maSV === data.maSV) {
                    return {
                        checked: false,
                        ...data,
                        gioiTinh: mappingGender[data.gioiTinh],
                        khoa: mappingDepartment[data.khoa],
                        ngaySinh: formatDate(data.ngaySinh)
                    };
                }
                return i;
            })
        });
        setDataEdit(null);
        setStatus('');
    }

    const formatDate = (value) => {
        if (value && value.includes('-')) {
            let temp = value.split("-");
            let newDate = new Date(temp[0], temp[1] - 1, temp[2]);
            return moment(+newDate.getTime()).format('DD/MM/YYYY');
        }
        return '';
    }

    const handleEditItem = (data) => {
        setDataEdit(data);
        setStatus('edit');
    }

    const handleRemoveItem = (data) => {
        setDataTable(() => {
            return dataTable.filter(i => i.maSV !== data.maSV);
        });
    };

    const multiRemove = () => {
        setDataTable(() => {
            return dataTable.filter(i => !i.checked);
        });
    };

    const handleAdd = () => {
        setStatus('add');
    };

    const handleSearch = (search) => {
        let filter, tr, td, i, txtValue;
        let table = document.getElementsByTagName('table')[0];
        filter = search.toUpperCase();
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    };

    const handleChangeChecked = (value) => {
        setDataTable(() => {
            return dataTable.map(i => {
                if (value.maSV === i.maSV) {
                    return {
                        ...i,
                        checked: !i.checked,
                    };
                }
                return i;
            })
        });
    };

    return (
        <div className="App">
            {status ? <div className="form">
                    <FormInfo dataTable={dataTable}
                              addItem={addItem}
                              editItem={editItem}
                              removeItem={handleRemoveItem}
                              status={status}
                              dataEdit={dataEdit}/>
                </div>
                : <>
                    <div className="search">
                        <Search search={handleSearch}/>
                    </div>

                    <div className="list">
                        <List dataTable={dataTable}
                              header={header}
                              checkbox={true}
                              editRow={handleEditItem}
                              removeRow={handleRemoveItem}
                              changeChecked={handleChangeChecked}/>
                    </div>

                    <div className="enter-info">
                        <ButtonAction dataTable={dataTable}
                                      handleAdd={handleAdd}
                                      multiRemove={multiRemove}/>
                    </div>
                </>}
        </div>
    );
}
export default App;
