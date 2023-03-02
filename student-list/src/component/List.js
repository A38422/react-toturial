import React from 'react';
import ApiService from '../services/api';

const List = (props) => {
    const handleRemoveRow = (value) => {
        if (window.confirm('Xác nhận xóa!')) {
            ApiService.delete(`/DeleteStudent/${value.id}`
            ).then(response => {
                props.removeRow(response);
            }).catch(error => {
                console.error(error);
                window.alert('Có lỗi xảy ra!');
            });
        }
    }

    return (
        <div>
            <table className={props.className} style={props.style}>
                <thead>
                <tr>
                    <th style={{ width: '50px' }}></th>
                    {props.header.map((value, index) => {
                        return <th style={{ width: '150px' }} key={index}>{value}</th>
                    })}
                </tr>
                </thead>

                <tbody>
                    {!props.loading ? (
                        <>
                            {props.dataTable && props.dataTable.length > 0 ? (
                                <>
                                    {props.dataTable.map((value, index) => {
                                    return <tr key={index}>
                                            {Object.keys(value).map(key => {
                                                if (key === 'checked') {
                                                    return <td key={key}><input type="checkbox"
                                                                    checked={value[key]}
                                                                    onChange={() => props.changeChecked(value)}/></td>
                                                } else if (key !== 'id') {
                                                    return <td key={`${key}${index}`}>{value[key]}</td>
                                                }
                                            })}
                                            <td>
                                                <i className="fa fa-edit icon-action mr-5"
                                                onClick={() => props.editRow(value)}></i>
                                                <i className="fa fa-trash icon-action"
                                                onClick={() => handleRemoveRow(value)}></i>
                                            </td>
                                        </tr>
                                    })}
                                </>
                            ) : (
                                <tr>
                                <td colSpan="7" style={{ textAlign: 'center', height: "50px" }}>
                                    Không có dữ liệu
                                </td>
                            </tr>
                            )}
                        </>
                    ) : (
                        <tr>
                            <td colSpan="7" style={{ textAlign: 'center', height: "50px" }}>
                                <i className="fa fa-spinner fa-spin"></i>Loading
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

List.defaultProps = {
    header: [],
    dataTable: [],
    editRow: () => {},
    removeRow: () => {},
    handleChangeChecked: () => {}
}
export default List;
