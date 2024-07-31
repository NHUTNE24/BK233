import { Tag } from 'antd';
import { MdClose } from 'react-icons/md';

function TagRender(props) {
    const { label, tagId, onClose } = props;
    return (
        <>
            <Tag
                bordered={false}
                closable
                style={{
                    color: 'white',
                    background: '#474747',
                    fontStyle: 'italic',
                    height: '30px',
                    border: '1px solid #FFF',
                    padding: '7px 15px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                }}
                className="caption reg"
                closeIcon={
                    <MdClose style={{ color: 'white', fontSize: '14px' }} />
                }
                onClose={() => {
                    // console.log(tagId);
                    onClose(tagId);
                }}
            >
                {label}
            </Tag>
        </>
    );
}

export default TagRender;
