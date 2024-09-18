// Định dạng tiền khi nhập vào ô tiền phòng
document.getElementById('rent').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, ''); // Loại bỏ các ký tự không phải số
    value = Number(value).toLocaleString('vi-VN'); // Định dạng số theo chuẩn Việt Nam
    e.target.value = value; // Cập nhật giá trị trong ô nhập liệu
});

// Tính toán khi có sự thay đổi trong ô nhập chỉ số điện
document.getElementById('old_electricity').addEventListener('input', updateElectricityCost);
document.getElementById('new_electricity').addEventListener('input', updateElectricityCost);

function updateElectricityCost() {
    let oldElectricity = document.getElementById('old_electricity').value;
    let newElectricity = document.getElementById('new_electricity').value;

    if (oldElectricity.length === 6 && newElectricity.length === 6) {
        let electricityCost = tinhTienDien(oldElectricity, newElectricity);
        document.getElementById('electricity_cost').value = formatMoney(electricityCost) + " VND";
    }
}

function tinhTienDien(oldReading, newReading) {
    // Lấy 4 ký tự giữa của chỉ số điện
    let oldNumber = parseInt(oldReading.substring(1, 5));
    let newNumber = parseInt(newReading.substring(1, 5));

    let consumption = newNumber - oldNumber;
    if (consumption < 0) {
        consumption = 0; // Đề phòng lỗi nếu số mới nhỏ hơn số cũ
    }

    return consumption * 3000; // Mỗi kWh là 3000 VND
}

// Hàm định dạng tiền
function formatMoney(amount) {
    return amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


// Hàm tính tổng tiền (gồm tiền phòng, tiền điện và tiền nước)
function tinhTien() {
    // Lấy giá trị tiền phòng đã định dạng
    let rent = document.getElementById('rent').value.replace(/\./g, '') || 0; // Loại bỏ dấu chấm để tính toán
    rent = parseFloat(rent);
    
    // Lấy chỉ số điện cũ và mới
    let oldElectricity = document.getElementById('old_electricity').value;
    let newElectricity = document.getElementById('new_electricity').value;

    // Số người dùng nước
    let people = parseInt(document.getElementById('people').value) || 0;

    // Kiểm tra nếu có trường nào chưa nhập
    if (!rent || !oldElectricity || !newElectricity || people === 0) {
        alert("Vui lòng nhập đầy đủ tất cả thông tin trước khi bấm tính tiền");
        return; // Ngừng hàm nếu phát hiện thiếu thông tin
    }

    // Tính tiền điện
    let electricityCost = tinhTienDien(oldElectricity, newElectricity);

    // Tính tiền nước (30k/1 người)
    let waterCost = people * 30000;

    // Tổng tiền (tiền phòng + tiền điện + tiền nước)
    let total = rent + electricityCost + waterCost;

    // Hiển thị kết quả tổng tiền
    document.getElementById('result').textContent = `Tổng tiền: ${formatMoney(total)} VND`;
}

// Hàm Clear để xoá tất cả dữ liệu
function clearForm() {
    // Lấy giá trị các ô input
    let rent = document.getElementById('rent').value;
    let oldElectricity = document.getElementById('old_electricity').value;
    let newElectricity = document.getElementById('new_electricity').value;
    let people = document.getElementById('people').value;

    // Kiểm tra nếu có thông tin thì xoá
    if (rent || oldElectricity || newElectricity) {
        document.getElementById('rent').value = '';
        document.getElementById('old_electricity').value = '';
        document.getElementById('new_electricity').value = '';
        document.getElementById('electricity_cost').value = '';
        document.getElementById('people').value = '';// Đặt số người dùng nước về mức 0
        document.getElementById('result').textContent = "Đã xoá xong!";
    } else {
        // Hiển thị thông báo nếu không có thông tin nào để xoá
        document.getElementById('result').textContent = "Not information to delete";
    }

    // Xóa thông báo sau 3 giây (3000 ms)
    setTimeout(function () {
        document.getElementById('result').textContent = '';
    }, 3000);
}

