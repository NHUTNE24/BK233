import { Button, Card, Checkbox, Col, Form, Input, message, notification, Radio, Row, Select, Upload } from 'antd';
import { CSVLink, CSVDownload } from 'react-csv';
import { UploadOutlined } from '@ant-design/icons';
import Papa from 'papaparse';
import './FormCustom.scss';
import { useEffect, useRef, useState } from 'react';
import Item from 'antd/es/list/Item';

// const normFile = (e) => {
//     console.log('Upload event:', e);
//     if (Array.isArray(e)) {
//         return e;
//     }
//     return e?.fileList;
// };

const csvData = [
    ['topicName', 'topicCode', 'level'],
    ['C# Programing Language', 'C#123', 'Beginner'],
];
const rules = [
    {
        required: true,
        message: (
            <span
                className="footnote"
                style={{ color: 'red', fontStyle: 'italic' }}
            >
                This field is required
            </span>
        ),
    },
];

function FormCusTom({ form, onCsvDataChange }) {
    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState('');

    // useEffect(() => {
    //     return () => {
    //         setFileName(''); // Reset fileName when component unmounts
    //     };
    // }, []);

    const handleImportCSV = (e) => {
        // console.log(e.target);

        if (e.target && e.target.files && e.target.files[0]) {
            let file = e.target.files[0];
            if (file.name.length >= 26) {
                message.error('File name must be less than 26 character!');
                setFileName('');
                return;
            }

            if (file.type !== 'text/csv') {
                console.log(file.type);
                message.error('Only accept csv files...');
                setFileName('');
                return;
            }
            // console.log('FILE SUCCESS', file);
            setFileName(file.name);

            // Parse local CSV file
            Papa.parse(file, {
                complete: function (results) {
                    let rawCSV = results.data;
                    if (rawCSV.length > 0) {
                        let format = ['topicName', 'topicCode', 'level'];

                        if (rawCSV[0] && rawCSV[0].length === 3) {
                            for (let i = 0; i < 3; i++) {
                                if (rawCSV[0][i] != format[i]) {
                                    message.error('Data on CSV file is wrong format! 1');
                                    return;
                                }
                            }
                            // console.log('Finished:', results.data);
                            let resultCSV = [];
                            rawCSV.map((item, index) => {
                                if (index > 0 && item.length === 3) {
                                    let obj = {
                                        topicName: item[0],
                                        topicCode: item[1],
                                        level: item[2],
                                        status: 'Draft',
                                    };

                                    resultCSV.push(obj);
                                }
                            });

                            // console.log(resultCSV);
                            message.success('File has been uploaded successfully!');
                            onCsvDataChange(resultCSV); // Invoke the callback with the parsed data
                        } else {
                            message.error('Data on CSV file is wrong format! 2');
                        }
                    } else {
                        message.error('Not found data on CSV file!');
                    }
                },
            });
            // Reset giá trị của input file
            e.target.value = null;
        } else {
            setFileName('');
        }
    };

    const onFinish = (values) => {
        console.log('Form Values:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleCustomButtonClick = () => {
        fileInputRef.current.click();
    };

    return (
        <>
            <Form
                form={form}
                className="form-custom body1"
                name="basic"
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                // onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Row
                    style={{
                        borderBottom: '2px solid #ACACAC',
                        marginBottom: '16px',
                    }}
                >
                    <Col span={8}>
                        <p className="form-group-title">Import Setting</p>
                    </Col>
                    <Col span={16}>
                        <Form.Item
                            layout="inline"
                            className="form-group"
                            name="upload"
                            label="File (csv)"
                            labelCol={{ span: 12 }}
                            style={{ position: 'relative' }}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                // onChange={handleFileChange}
                                onChange={(e) => handleImportCSV(e)}
                                accept=".csv"
                            />
                            <Button
                                type="primary"
                                className="btn-primary"
                                onClick={handleCustomButtonClick}
                            >
                                Select
                            </Button>
                            {fileName && (
                                <span
                                    style={{
                                        display: 'flex',
                                        marginLeft: '-10px',
                                        marginTop: '5px',
                                        width: 'max-content',
                                    }}
                                >
                                    {fileName}
                                </span>
                            )}
                        </Form.Item>
                        {/* <Form.Item
                            className="form-group"
                            label="Encoding Type"
                            labelCol={{ span: 12 }}
                            name="encodingType"
                            rules={rules}
                        >
                            <Select
                            // className="custom-select-one"
                            // defaultValue="UTF-8"
                            >
                                <Select.Option value="UTF-8">UTF-8</Select.Option>
                                <Select.Option value="ANSI">ANSI</Select.Option>
                            </Select>
                        </Form.Item> */}

                        {/* <Form.Item
                            layout="inline"
                            className="form-group"
                            name="columnSeperator"
                            label="Column Seperator"
                            labelCol={{ span: 12 }}
                            rules={rules}
                        >
                            <Select
                            // className="custom-select-one"
                            // defaultValue="comma"
                            >
                                <Select.Option value="comma">Comma</Select.Option>
                                <Select.Option value="semi-colon">Semi Colon</Select.Option>
                            </Select>
                        </Form.Item> */}

                        <Row style={{ alignItems: 'center' }}>
                            <Col span={12}>
                                <div className="form-group">Import template</div>
                            </Col>
                            {/* <Button type="link">Download</Button> */}
                            <CSVLink
                                filename={'SyllabusTemplate.csv'}
                                // className="btn btn-primary"
                                data={csvData}
                            >
                                Download
                            </CSVLink>
                        </Row>
                    </Col>
                </Row>
                <Row
                    style={{
                        borderBottom: '2px solid #ACACAC',
                        marginBottom: '16px',
                    }}
                >
                    <Col span={8}>
                        <p className="form-group-title">Duplicate Control</p>
                    </Col>
                    <Col span={16}>
                        <Form.Item
                            className="form-group"
                            name="scanning"
                            label="Scanning"
                            labelCol={{ span: 24 }}
                            rules={rules}
                        >
                            <Checkbox.Group
                                name="scanning"
                                className="checkbox-primary"
                            >
                                <Checkbox value="syllabus-code">Syllabus Code</Checkbox>
                                <Checkbox value="syllabus-name">Syllabus Name</Checkbox>
                            </Checkbox.Group>
                        </Form.Item>
                        <Form.Item
                            className="form-group"
                            name="duplicateHandle"
                            label="Duplicate Handle"
                            labelCol={{ span: 24 }}
                            rules={rules}
                        >
                            <Radio.Group className="radio-primary">
                                <Radio value="Allow">Allow </Radio>
                                <Radio value="Replace"> Replace </Radio>
                                <Radio value="Skip"> Skip </Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

export default FormCusTom;
