import { Form, Input, Select, Switch } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './CreateForm.scss';

function CreateForm({ form }) {
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
                className="create-form
                 body1"
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
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
                <Form.Item
                    className="form-group"
                    label="Name"
                    name="name"
                    rules={rules}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Output Standard"
                    name="outputStandard"
                    rules={rules}
                >
                    <Select
                        className="custom-search-icon"
                        mode="multiple"
                        allowClear
                        suffixIcon={<SearchOutlined />}
                    >
                        <Select.Option value="HS4D">HS4D</Select.Option>
                        <Select.Option value="HS6D">HS6D</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Training Time"
                    name="trainingTime"
                    rules={rules}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Delivery Type"
                    name="deliveryType"
                    rules={rules}
                >
                    <Select className="custom-select-one">
                        <Select.Option value="demo">Demo</Select.Option>
                        <Select.Option value="realLife">
                            Real life
                        </Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label={<b>Method</b>}
                    name="method"
                    valuePropName="checked"
                    initialValue={false}
                >
                    <Switch
                        className="switch-custom"
                        defaultChecked={false}
                        checkedChildren="Offline"
                        unCheckedChildren="Online"
                    />
                </Form.Item>
            </Form>
        </>
    );
}

export default CreateForm;
