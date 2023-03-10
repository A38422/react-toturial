import './App.css';
import Search from "./component/Search";
import List from "./component/List";
import FormInfo from "./component/FormInfo";
import ButtonAction from "./component/ButtonAction";
import React, {useState, useEffect} from "react";
import ApiService from './services/api';
import formatDate from './utils/dateFormatter';
import { useHistory, useLocation } from 'react-router-dom';

const App = () => {
    const history = useHistory();

    const location = useLocation();

    const defaultDataTable = [
        // {
        //     checked: false,
        //     maSV: 'A12345',
        //     tenSV: 'Trần Văn A',
        //     ngaySinh: '11/05/2002',
        //     gioiTinh: 'Nam',
        //     khoa: 'Công nghệ thông tin'
        // },
        // {
        //     checked: false,
        //     maSV: 'A23456',
        //     tenSV: 'Nguyễn Thị B',
        //     ngaySinh: '06/07/2002',
        //     gioiTinh: 'Nữ',
        //     khoa: 'Ngôn ngữ Anh'
        // },
        // {
        //     checked: false,
        //     maSV: 'A34567',
        //     tenSV: 'Nguyễn Văn C',
        //     ngaySinh: '01/01/2002',
        //     gioiTinh: 'Nam',
        //     khoa: 'Truyền thông đa phương tiện'
        // },
        // {
        //     checked: false,
        //     maSV: 'A45678',
        //     tenSV: 'Đặng Ngọc D',
        //     ngaySinh: '02/06/2002',
        //     gioiTinh: 'Nữ',
        //     khoa: 'Kinh tế'
        // },
        // {
        //     checked: false,
        //     maSV: 'A56789',
        //     tenSV: 'Nguyễn Tuấn E',
        //     ngaySinh: '15/11/2002',
        //     gioiTinh: 'Nam',
        //     khoa: 'Ngôn ngữ Hàn Quốc'
        // },
        // {
        //     checked: false,
        //     maSV: 'A67890',
        //     tenSV: 'Đinh Thị F',
        //     ngaySinh: '11/12/2002',
        //     gioiTinh: 'Nữ',
        //     khoa: 'Ngôn ngữ Nhật'
        // },
    ];

    const header = ['Mã SV', 'Tên sinh viên', 'Ngày sinh', 'Giới tính', 'Khoa', 'Hành động'];

    const [dataTable, setDataTable] = useState(defaultDataTable);

    const [dataEdit, setDataEdit] = useState(null);

    const [status, setStatus] = useState('');

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        const search = new URLSearchParams(location.search).get('query');

        const endpoint = search ? `/GetListStudent?search=${search}` : '/GetListStudent';

        ApiService.get(endpoint)
            .then(response => {
                setDataTable(() => {
                    return response.items.map(i => {
                        return {
                            checked: false,
                            ...i,
                            ngaySinh: formatDate(i.ngaySinh)
                        }
                    })
                });
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, [location]);

    const addItem = (data) => {
        setDataTable(() => {
            return [...dataTable, {
                checked: false,
                ...data,
                ngaySinh: formatDate(data.ngaySinh)
            }]
        });
        setStatus('');
    }

    const editItem = (data) => {
        setDataTable(() => {
            return dataTable.map(i => {
                if (i.id === data.id) {
                    return {
                        checked: false,
                        ...data,
                        gioiTinh: data.gioiTinh,
                        khoa: data.khoa,
                        ngaySinh: formatDate(data.ngaySinh)
                    };
                }
                return i;
            })
        });
        setDataEdit(null);
        setStatus('');
    }

    const handleEditItem = (data) => {
        setDataEdit(data);
        setStatus('edit');
    }

    const handleRemoveItem = (data) => {
        setDataTable(() => {
            return dataTable.filter(i => i.id !== data.id);
        });
    };

    const multiRemove = () => {
        const checkedList = [];
        dataTable.forEach(i => {
            if (i.checked) {
                checkedList.push(i.id);
            }
        });

        ApiService.deleteMultip('/DeleteMultipleStudents', checkedList)
        .then(() => {
            setDataTable(() => {
                return dataTable.filter(i => !i.checked);
            });
        })
        .catch(error => {
            console.error(error);
            window.alert('Có lỗi xảy ra');
        });

    };

    const handleAdd = () => {
        setStatus('add');
    };

    const handleSearch = (search) => {
        const params = new URLSearchParams();
        params.append('search', search);

        if (search) {
            history.push(`/search?query=${search}`);
        } else {
            history.push('/');
        }
    };

    const handleChangeChecked = (value) => {
        setDataTable(() => {
            return dataTable.map(i => {
                if (value.id === i.id) {
                    return {
                        ...i,
                        checked: !i.checked,
                    };
                }
                return i;
            })
        });
    };

    const back = () => {
        setStatus('');
    }

    return (
        <div className="App">
            {status ? <div className="form">
                    <FormInfo dataTable={dataTable}
                              addItem={addItem}
                              editItem={editItem}
                              removeItem={handleRemoveItem}
                              status={status}
                              back={back}
                              dataEdit={dataEdit}/>
                </div>
                : <>
                    <div className="search">
                        <Search search={handleSearch}/>
                    </div>

                    <div className="list">
                        <List dataTable={dataTable}
                              loading={loading}
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
