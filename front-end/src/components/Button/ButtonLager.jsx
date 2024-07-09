import { Button } from 'antd'

const ButtonLager = () => {
  const customButtonStyle = {
    width: '389px',
    height: '59px',
    padding: '2px 25px',
    gap: '5px',
    borderRadius: '10px',
    background: '#2D3748',
    boxShadow: '0px 1px 3px 1px #00000026, 0px 1px 2px 0px #0000004D'
  }

  return (
    <div style={{ padding: '50px' }}>
      <Button type='primary' style={customButtonStyle}
      href="#"
      >
      Filer
      </Button>
    </div>
  )
}

export default ButtonLager
