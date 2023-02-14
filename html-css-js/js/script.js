class SinhVien {
    constructor(MaSV, TenSV, NgaySinh, GioiTinh, MaKhoa) {
        this.MaSV = MaSV;
        this.TenSV = TenSV;
        this.NgaySinh = NgaySinh;
        this.GioiTinh = GioiTinh;
        this.MaKhoa = MaKhoa;
    }
}

class Khoa {
    constructor(MaKhoa, TenKhoa) {
        this.MaKhoa = MaKhoa;
        this.TenKhoa = TenKhoa;
    }
}

var danhSachSV = [new SinhVien("A12345", "Trần Văn A", "2002-05-11", "male", "cntt"),
                  new SinhVien('A23456', 'Nguyễn Thị B', '2002-07-06', 'female', 'nna'),
                  new SinhVien('A34567', 'Nguyễn Văn C', '2002-01-01', 'male', 'ttdpt'),
                  new SinhVien('A45678', 'Đặng Ngọc D', '2002-06-02', 'female', 'kt'),
                  new SinhVien('A56789', 'Nguyễn Tuấn E', '2002-11-15', 'male', 'nnhq'),
                  new SinhVien('A67890', 'Đinh Thị F', '2002-12-11', 'female', 'nnn')];
var listCheckBox = [];
var txtMaSV = document.getElementById('txtMaSV');
var txtTenSV = document.getElementById('txtTenSV');
var txtNgaySinh = document.getElementById('txtNgaySinh');
var male = document.getElementById('male');
var female = document.getElementById('female');
var drpKhoa = document.getElementById('drpKhoa');
var tenKhoa = 'Kinh tế';
var txtSearch = document.getElementById('txtTuKhoa');
var btnSearch = document.getElementById('btn-search');
var btnAdd = document.getElementById('btn-add');
var btnEdit = document.getElementById('btn-edit');
var btnDelete = document.getElementById('btn-delete');

const table = document.getElementsByClassName('list')[0];
const buttons = document.querySelectorAll('button');
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

for (var i = buttons.length; i--;) {
    buttons[i].addEventListener('click', function(e) { e.preventDefault() }, false);
}

display();


function themSinhVien(sinhVien) {
    danhSachSV.push(sinhVien);
}

function suaSinhVien(sinhVien) {
    danhSachSV = danhSachSV.map(item => {
        if (item.MaSV === sinhVien.MaSV) {
            return sinhVien;
        }
        return item;
    })
}

function xoaSinhVien(MaSV) {
    danhSachSV = danhSachSV.filter(item => item.MaSV !== MaSV);
}

function addNewItem() {
    if (checkValidateFrom()) {
        let sinhVien = new SinhVien();
        sinhVien.MaSV = txtMaSV.value;
        sinhVien.TenSV = txtTenSV.value;
        sinhVien.GioiTinh = male.checked ? 'male' : female.checked ? 'female' : '';
        sinhVien.NgaySinh = txtNgaySinh.value;
        sinhVien.MaKhoa = drpKhoa.value;

        let checkUnique = danhSachSV.find(i => i.MaSV.toLowerCase() === sinhVien.MaSV.toLowerCase());
        if (!checkUnique) {
            themSinhVien(sinhVien);
            display();
            resetFrom();
            alert('Thêm mới thành công!');
        } else {
            alert('Mã sinh viên đã tồn tại!')
        }
    }
}

function editItem() {
    if (checkValidateFrom()) {
        let sinhVien = new SinhVien();
        sinhVien.MaSV = txtMaSV.value;
        sinhVien.TenSV = txtTenSV.value;
        sinhVien.GioiTinh = male.checked ? 'male' : female.checked ? 'female' : '';
        sinhVien.NgaySinh = txtNgaySinh.value;
        sinhVien.MaKhoa = drpKhoa.value;

        suaSinhVien(sinhVien);
        display();
        resetFrom();
        alert('Cập nhật thành công!');
    }
}

function checkValidateFrom() {
    let isCheck = true;

    if (txtMaSV.value) {
        setSuccess('errorMaSV');
    } else {
        isCheck = false;
        setError('errorMaSV', 'Vui lòng điển mã sinh viên!');
    }
    
    if (txtTenSV.value) {
        setSuccess('errorTenSV');
    } else {
        isCheck = false;
        setError('errorTenSV', 'Vui lòng điền tên sinh viên!');
    }

    return isCheck;
}

function resetFrom() {
    txtMaSV.disabled = false;
    txtMaSV.value = '';
    txtTenSV.value = '';
    txtNgaySinh.value = '';
    male.checked = false;
    female.checked = false;
    drpKhoa.value = 'kt';
    btnAdd.disabled = false;
    btnAdd.className = 'button-danger';
    btnEdit.disabled = true;
    btnEdit.className = 'button-danger not-allowed';
    btnDelete.disabled = true;
    btnEdit.className = 'button-danger not-allowed';
}

function setError(item, msg) {
    let element = document.getElementById(item);
    element.style.display = 'block';
    element.textContent = msg;
}

function setSuccess(item) {
    document.getElementById(item).style.display = 'none';
}

function handleEdit(maSV) {
    const data = danhSachSV.find(i => i.MaSV === maSV);

    if (data) {
        txtMaSV.value = data.MaSV;
        txtTenSV.value = data.TenSV;
        txtNgaySinh.value = data.NgaySinh;
        male.checked = false;
        female.checked = false;
        drpKhoa.value = data.MaKhoa;
        tenKhoa = mappingDepartment[data.MaKhoa];
        if (data.GioiTinh === 'male') {
            male.checked = true;
        } else if (data.GioiTinh === 'female') {
            female.checked = true;
        }

        txtMaSV.disabled = true;
        btnAdd.disabled = true;
        btnAdd.className += ' not-allowed';
        btnEdit.disabled = false;
        btnEdit.className = 'button-danger';
        setSuccess('errorMaSV');
        setSuccess('errorTenSV');
    }
}

function handleRemove(maSV) {
    if (confirm('Xác nhận xóa!') == true) {
        danhSachSV = danhSachSV.filter(i => i.MaSV !== maSV);
        display();
    }
}

function handleChangeKhoa(self) {
    tenKhoa = self.options[self.selectedIndex].text;
}

function handleChangeCheckBox(self, maSV) {
    const data = danhSachSV.find(i => i.MaSV === maSV);
    
    if (self.checked && data) {
        listCheckBox.push(data);
    } else {
        listCheckBox = listCheckBox.filter(i => i.MaSV !== maSV);
    }
}

function handleSearch() {
    let filter, tr, td, i, txtValue;
    filter = txtSearch.value.toUpperCase();
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
}

function display() {
    let temp = `<tr>
                    <th></th>
                    <th>Mã SV</th>
                    <th>Tên sinh viên</th>
                    <th>Ngày sinh</th>
                    <th>Giới tính</th>
                    <th>Khoa</th>
                    <th>Hành động</th>
                </tr>`;
    for (i in danhSachSV) {
        temp += `<tr>
            <td>
                <input type="checkbox" onchange="handleChangeCheckBox(this, '${danhSachSV[i].MaSV}')">
            </td>
            <td>${danhSachSV[i].MaSV}</td>
            <td>${danhSachSV[i].TenSV}</td>
            <td>${danhSachSV[i].NgaySinh ? formatDate(danhSachSV[i].NgaySinh) : ''}</td>
            <td>${danhSachSV[i].GioiTinh ? mappingGender[danhSachSV[i].GioiTinh] : ''}</td>
            <td>${danhSachSV[i].MaKhoa ? mappingDepartment[danhSachSV[i].MaKhoa] : ''}</td>
            <td>
                <i class="fa fa-edit icon-action" onclick="handleEdit('${danhSachSV[i].MaSV}')"></i>
                <i class="fa fa-trash icon-action" onclick="handleRemove('${danhSachSV[i].MaSV}')"></i>
            </td>
        </tr>`;
    }
    table.innerHTML = temp;
}

function formatDate(value) {
    if (value && value.includes('-')) {
        let temp = value.split("-");
        let newDate = new Date(temp[0], temp[1] - 1, temp[2]);
        return moment(+newDate.getTime()).format('DD/MM/YYYY');
    }   
    return '';
}