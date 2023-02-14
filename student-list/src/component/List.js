import React from 'react';

const List = (props) => {
    return (
        <div style={{height: "200px", overflow: "auto"}}>
            <table className={props.className} style={props.style}>
                <thead>
                <tr>
                    {props.checkbox ? <th></th> : null}
                    {props.header.map((value, index) => {
                        return <th key={index}>{value}</th>
                    })}
                </tr>
                </thead>

                <tbody>
                    {props.dataTable.map((value, index) => {
                        return <tr key={index}>
                            {props.checkbox
                                ? <td><input type="checkbox"/></td>
                                : null
                            }
                            {Object.keys(value).map(key => {
                                return <td key={key}>{value[key]}</td>
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
    removeRow: () => {}
}
export default List;
