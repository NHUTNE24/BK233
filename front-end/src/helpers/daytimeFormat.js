import { parseISO, format, parse } from 'date-fns';

export const formatDate = (dateString) => {
    if (!dateString) {
        // Nếu dateString không có giá trị, trả về chuỗi rỗng hoặc giá trị mặc định
        return '';
    }

    let date;

    // Kiểm tra định dạng ISO 8601
    if (dateString.includes('T')) {
        date = parseISO(dateString);
    } else {
        // Kiểm tra định dạng dd/MM/yyyy
        const [day, month, year] = dateString.split('/');
        date = parse(`${day}/${month}/${year}`, 'dd/MM/yyyy', new Date());
    }

    // Định dạng ngày về dạng dd/MM/yyyy
    return format(date, 'dd/MM/yyyy');
};

// Hàm định dạng hiển thị số ngày
export const formatNumberOfDays = (days) => {
    if (days === 0) {
        return ''; // Trả về rỗng nếu days = 0
    } else if (days === 1) {
        return `${days} day`;
    } else {
        return `${days} days`;
    }
};

// Hàm để chuyển đổi chuỗi ngày dd/MM/yyyy thành đối tượng Date
export const parseDate = (dateString) => {
    if (!dateString) return new Date(0); // Xử lý chuỗi rỗng: trả về giá trị thấp nhất (0)

    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
};
