import { Button } from 'antd'

const ButtonPrimary = ({ width, height, content, icon }) => {
  const customButtonStyle = {
    width: width,
    height: height,
    padding: '2px 25px',
    gap: '5px',
    borderRadius: '8px',
    background: '#2D3748',
    boxShadow: '0px 1px 3px 1px #00000026, 0px 1px 2px 0px #0000004D'
  };

  return (
    <div style={{ padding: '0' }}>
      <Button type='primary' style={customButtonStyle}
      href="#" icon={icon}
      >
        {content}
      </Button>
    </div>
  )
}

export default ButtonPrimary
