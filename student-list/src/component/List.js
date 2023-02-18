import React from 'react';

const List = (props) => {
    return (
        <div>
            <table className={props.className} style={props.style}>
                <thead>
                <tr>
                    <th></th>
                    {props.header.map((value, index) => {
                        return <th key={index}>{value}</th>
                    })}
                </tr>
                </thead>

                <tbody>
                    {props.dataTable.map((value, index) => {
                        return <tr key={index}>
                            {Object.keys(value).map(key => {
                                if (key === 'checked') {
                                    return <td key={key}><input type="checkbox"
                                                      checked={value[key]}
                                                      onChange={() => props.changeChecked(value)}/></td>
                                }
                                return <td key={`${key}${index}`}>{value[key]}</td>
                            })}
                            <td>
                                <i className="fa fa-edit icon-action mr-5"
                                   onClick={() => props.editRow(value)}></i>
                                <i className="fa fa-trash icon-action"
                                   onClick={() => {
                                       if (window.confirm('Xác nhận xóa!')) props.removeRow(value)
                                   }}></i>
                            </td>
                        </tr>
                    })}
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
