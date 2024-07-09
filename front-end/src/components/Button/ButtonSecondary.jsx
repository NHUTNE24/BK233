import { Button } from 'antd'

const ButtonSecondary = () => {
  const customButtonStyle = {
    width: '86px',
    height: '32px',
    padding: '2px 25px',
    gap: '5px',
    borderRadius: '8px',
    background: '#474747',
    boxShadow: '0px 1px 3px 1px #00000026, 0px 1px 2px 0px #0000004D'
  };

  return (
    <div style={{ padding: '50px' }}>
      <Button type='primary' style={customButtonStyle}
      href="#"
      >
      Filter
      </Button>
    </div>
  )
}

export default ButtonSecondary
