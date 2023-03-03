import moment from "moment";

const formatDate = (value) => {
    return moment(value).format('DD/MM/YYYY');
}

export default formatDate;