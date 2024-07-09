import { Button, Checkbox, Col, Form, Radio, Row, Select, Upload } from 'antd';
import './FormCustom.scss';

const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

function FormCusTom({ form }) {
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
    // const handleSubmit = (e) => {
    //   console.log(e);
    // };
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
                // onFinish={handleSubmit}
                // onFinishFailed={onFinishFailed}
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
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            rules={rules}
                            style={{ position: 'relative' }}
                        >
                            <Upload
                                name="logo"
                                action="/upload.do"
                                listType="picture"
                            >
                                <Button className="btn-primary btn-md reg">
                                    Select
                                </Button>
                            </Upload>
                            <span className="custom-required-mark"> *</span>
                        </Form.Item>

                        <Form.Item
                            className="form-group"
                            label="Delivery Type"
                            labelCol={{ span: 12 }}
                            name="deliveryType"
                            // rules={rules}
                        >
                            <Select
                                // className="custom-select-one"
                                defaultValue={'Auto detect'}
                            >
                                <Select.Option value="auto-detected">
                                    Auto detect
                                </Select.Option>
                                <Select.Option value="UTF-8">
                                    UTF-8
                                </Select.Option>
                                <Select.Option value="ANSI">ANSI</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            layout="inline"
                            className="form-group"
                            name="columnSeperator"
                            label="Column Seperator"
                            labelCol={{ span: 12 }}
                        >
                            <Select
                                // className="custom-select-one"
                                defaultValue={'Comma'}
                            >
                                <Select.Option value="conlon">
                                    Comma
                                </Select.Option>
                                <Select.Option value="semi-colon">
                                    Semi Colon
                                </Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            layout="inline"
                            className="form-group"
                            name="import-template"
                            label="Import template"
                            labelCol={{ span: 12 }}
                        >
                            <Button type="link">Download</Button>
                        </Form.Item>
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
                            name="checkbox-group"
                            label="Duplicate handle"
                            labelCol={{ span: 24 }}
                        >
                            <Checkbox.Group
                                name="checkbox-group"
                                className="checkbox-primary"
                            >
                                <Checkbox value="syllabus-code">
                                    Syllabus Code
                                </Checkbox>
                                <Checkbox value="syllabus-name">
                                    Syllabus Name
                                </Checkbox>
                            </Checkbox.Group>
                        </Form.Item>
                        <Form.Item
                            label="Duplicate Handle"
                            labelCol={{ span: 24 }}
                        >
                            <Radio.Group className="radio-primary">
                                <Radio value="allow">Allow </Radio>
                                <Radio value="replace"> Replace </Radio>
                                <Radio value="skip"> Skip </Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

export default FormCusTom;
