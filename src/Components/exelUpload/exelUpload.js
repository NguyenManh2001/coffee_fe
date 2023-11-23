import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';

const ExcelDropzone = () => {
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);

    const onDrop = (acceptedFiles) => {
        setFile(acceptedFiles[0]);

        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            workbook.SheetNames.forEach((sheetName) => {
                const worksheet = workbook.Sheets[sheetName];
                const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                rows.forEach((row) => {
                    // Xử lý dữ liệu chữ
                    const textData = row.filter((cell) => typeof cell === 'string');
                    console.log('Dữ liệu chữ:', textData);

                    // Xử lý đường dẫn ảnh
                    const imagePaths = row.filter((cell) => typeof cell === 'string' && cell.startsWith('<img'));
                    console.log('Đường dẫn ảnh:', imagePaths);

                    // Ở đây bạn có thể lưu trữ dữ liệu và đường dẫn ảnh vào cơ sở dữ liệu
                    // Gửi dữ liệu này đến server hoặc thực hiện các tác vụ lưu trữ khác
                    // fetch('/api/save-data-to-db', {
                    //   method: 'POST',
                    //   body: JSON.stringify({ textData, imagePaths }),
                    //   headers: { 'Content-Type': 'application/json' },
                    // });
                });
            });
        };
        reader.readAsArrayBuffer(acceptedFiles[0]);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
            'application/vnd.ms-excel', // .xls
        ],
        onDrop,
    });

    return (
        <div {...getRootProps()} style={{ border: '2px dashed #eee', padding: '20px', textAlign: 'center' }}>
            <input {...getInputProps()} />
            {isDragActive ? <p>Thả tệp vào đây...</p> : <p>Kéo và thả file Excel vào đây, hoặc nhấn để chọn tệp</p>}
            {file && <p>File đã chọn: {file.name}</p>}
        </div>
    );
};

export default ExcelDropzone;
