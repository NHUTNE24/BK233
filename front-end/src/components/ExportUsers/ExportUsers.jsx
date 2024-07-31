import React, { useState } from "react";
import axios from "axios";
import { Button, notification } from "antd";
import { FileExcelOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";

const ExportUsers = () => {
    const [loading, setLoading] = useState(false);

    const handleExport = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/users');
            const users = response.data;

            const formattedData = users.map(user => ({
                email: user.email,
                username: user.username,
                fullname: user.fullname,
                phone: user.phone,
                dob: new Date(user.dob).toLocaleDateString(),
                gender: user.gender ? "Male" : "Female",
                status: user.status ? "Active" : "Inactive",
                roleName: user.role.name,
            }));

            const worksheet = XLSX.utils.json_to_sheet(formattedData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

            const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
            const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "users.xlsx";
            a.click();
            window.URL.revokeObjectURL(url);

            notification.success({
                message: "Export Successful",
                description: "The users have been exported successfully.",
            });
        } catch (error) {
            console.error('Error exporting users:', error.response?.data || error.message);
            notification.error({
                message: "Error",
                description: "There was an error exporting the users.",
            });
        } finally {
            setLoading(false);
        }
    };

    const s2ab = (s) => {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
        return buf;
    };

    return (
        <Button
            type="primary"
            onClick={handleExport}
            loading={loading}
            style={{ background: '#2D3748', color: 'white' }}
            icon={<FileExcelOutlined />}
        >
            Export Users
        </Button>
    );
};

export default ExportUsers;
