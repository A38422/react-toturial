import moment from "moment";

const formatDate = (value) => {
    return moment(value).format('DD/MM/YYYY');
}

// const formatDate = (value) => {
//     if (value && value.includes('-')) {
//         let temp = value.split("-");
//         let newDate = new Date(temp[0], temp[1] - 1, temp[2]);
//         return moment(+newDate.getTime()).format('DD/MM/YYYY');
//     }
//     return '';
// }
export default formatDate;