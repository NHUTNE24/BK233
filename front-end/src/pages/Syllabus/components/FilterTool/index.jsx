import { Checkbox, Col, DatePicker, Form, Select, Row, Button, Space } from 'antd';
import styles from './style.module.css';
const { Option } = Select;
const onFinish = (values) => {
    
};

const FilterTool = () => (
    <Form
        name="filter"
        onFinish={onFinish}
        requiredMark={false}
        className={styles['filter-form']}
    >
        <Row gutter={43}>
            <Col span={12}>
                <label className={styles['location-title']}>Class location</label>
                <Form.Item
                    name="select-location"
                    colon={false}
                    rules={[
                        {
                            required: true,
                            message: 'Please select class location!',
                            type: 'array',
                        },
                    ]}
                >
                    <Select
                        mode="multiple"
                        placeholder="Please select class location"
                    >
                        <Option value="HoChiMinh">Ho Chi Minh</Option>
                        <Option value="DaNang">Da Nang</Option>
                        <Option value="HaNoi">Ha Noi</Option>
                    </Select>
                </Form.Item>
            </Col>
            <Col span={12}>
                <p className={styles['location-title']}>Class time frame</p>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="date-from"
                            label={<label className={styles['from-time']}>from</label>}
                            colon={false}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select start day!',
                                },
                            ]}
                        >
                            <DatePicker placeholder="--/--/----" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="date-to"
                            label={<label className={styles['to-time']}>to</label>}
                            colon={false}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select end day!',
                                },
                            ]}
                        >
                            <DatePicker placeholder="--/--/----" />
                        </Form.Item>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row>
            <Col span={8}>
                <Form.Item rules={[{required: true}]} name="classTime">
                    <Row>
                        <Col span={10}>
                            <p className={styles['class-time']}>Class time</p>
                        </Col>
                        <Col span={4}>
                            <Checkbox.Group>
                                <Col span={24}>
                                    <Checkbox
                                        value="morning"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Morning
                                    </Checkbox>
                                </Col>
                                <Col span={24}>
                                    <Checkbox
                                        value="noon"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Noon
                                    </Checkbox>
                                </Col>
                                <Col span={24}>
                                    <Checkbox
                                        value="night"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Night
                                    </Checkbox>
                                </Col>
                                <Col span={24}>
                                    <Checkbox
                                        value="online"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Online
                                    </Checkbox>
                                </Col>
                            </Checkbox.Group>
                        </Col>
                    </Row>
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item name="classStatus">
                    <Row>
                        <Col span={6}>
                            <p className={styles['class-status']}>Status</p>
                        </Col>
                        <Col span={4}>
                            <Checkbox.Group>
                                <Col span={24}>
                                    <Checkbox
                                        value="planning"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Planning
                                    </Checkbox>
                                </Col>
                                <Col span={24}>
                                    <Checkbox
                                        value="openning"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Openning
                                    </Checkbox>
                                </Col>
                                <Col span={24}>
                                    <Checkbox
                                        value="closed"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Closed
                                    </Checkbox>
                                </Col>
                            </Checkbox.Group>
                        </Col>
                    </Row>
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item name="classAttendee">
                    <Row>
                        <Col span={8}>
                            <p className={styles['class-attendee']}>Attendee</p>
                        </Col>
                        <Col span={16}>
                            <Checkbox.Group>
                                <Col span={24}>
                                    <Checkbox
                                        value="intern"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Intern
                                    </Checkbox>
                                </Col>
                                <Col span={24}>
                                    <Checkbox
                                        value="fresher"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Fresher
                                    </Checkbox>
                                </Col>
                                <Col span={24}>
                                    <Checkbox
                                        value="onlineFeeFresher"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Online fee-fresher
                                    </Checkbox>
                                </Col>
                                <Col span={24}>
                                    <Checkbox
                                        value="offlineFeeFresher"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                    >
                                        Offline fee-fresher
                                    </Checkbox>
                                </Col>
                            </Checkbox.Group>
                        </Col>
                    </Row>
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={16}>
            <Col span={10}>
                <Form.Item
                    name="select-FSU"
                    colon={false}
                    label={<p className={styles['location-title']}>FSU</p>}
                    rules={[
                        {
                            required: true,
                            message: 'Please select FSU!',
                        },
                    ]}
                >
                    <Select placeholder="Select">
                        <Option value="FSOFTHoChiMinh">FSOFT Ho Chi Minh</Option>
                        <Option value="FSOFTDaNang">FSOFT Da Nang</Option>
                        <Option value="FSOFTHaNoi">FSOFT Ha Noi</Option>
                    </Select>
                </Form.Item>
            </Col>
            <Col span={10}>
                <Form.Item
                    name="select-trainer"
                    colon={false}
                    label={<p className={styles['location-title']}>Trainer</p>}
                    rules={[
                        {
                            required: true,
                            message: 'Please select your trainer!',
                        },
                    ]}
                >
                    <Select placeholder="Select">
                        <Option value="VinhVuiVe">Dr. Vinh Vui Ve</Option>
                    </Select>
                </Form.Item>
            </Col>
        </Row>
        <Row>
            <Form.Item
                wrapperCol={{
                    span: 12,
                    offset: 6,
                }}
            >
                <Space>
                    <Button
                        className={styles['clear-btn']}
                        htmlType="reset"
                    >
                        Clear
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className={styles['search-btn']}
                    >
                        Search
                    </Button>
                </Space>
            </Form.Item>
        </Row>
    </Form>
);
export default FilterTool;
