import { Collapse, Popconfirm } from 'antd';
import React from 'react';
import { IoMdRemoveCircleOutline } from 'react-icons/io';
import { MdOutlineWarningAmber } from 'react-icons/md';


const MyComponent = () => {
  return (
    <Collapse defaultActiveKey={['1']} ghost expandIconPosition="right">
      <Collapse.Panel
        key="1"
        header={
          <div className='unit-header'  style={{backgroundColor: "blue"}}>
            <p className={'unit-no'}>Unit 1</p>
            <div className={'delete-uni-btn'}>
              <Popconfirm
                title={
                  <div style={{ display: 'flex', borderBottom: '1px solid #E2E8F0' }}>
                    <MdOutlineWarningAmber size={20} style={{ color: 'red', marginRight: '12px' }} />
                    <p style={{ color: '#2A4365', fontSize: '16px', fontWeight: 600 }}>Delete unit</p>
                  </div>
                }
                description={
                  <p
                    style={{
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#000',
                      marginBottom: '24px',
                      marginTop: '12px',
                    }}
                  >
                    Delete all content of the Unit?
                  </p>
                }
                
                okText="Delete"
                icon={null}
                cancelButtonProps={{ style: { border: 'none', backgroundColor: 'transparent' } }}
                okButtonProps={{
                  style: {
                    backgroundColor: '#2D3748',
                    fontSize: '14px',
                    fontWeight: 700,
                    padding: '15px 25px',
                  },
                }}
                cancelText={<p style={{ color: 'red', textDecoration: 'underline' }}>Cancel</p>}
              >
                <IoMdRemoveCircleOutline style={{ cursor: 'pointer' }} />
              </Popconfirm>
            </div>
          </div>
        }
      >
        <div className={'unit-body'}>
          hihi
        </div>
      </Collapse.Panel>
    </Collapse>
  );
};

export default MyComponent;
