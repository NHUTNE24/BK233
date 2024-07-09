import { Button } from 'antd'
import { IoFilterSharp } from "react-icons/io5";

const Button2Icon = () => {
  const customButtonStyle = {
    width: '114px',
    height: '32px',
    padding: '7px 10px',
    gap: '5px',
    borderRadius: '8px',
    background: '#2D3748',
    boxShadow: '0px 1px 3px 1px #00000026, 0px 1px 2px 0px #0000004D'
  };

  return (

    <div style={{ padding: '50px' }}>
      <Button type='primary' style={customButtonStyle}
      href="#"
      >
      <IoFilterSharp />
      Filter
      <IoFilterSharp />
      </Button>
      </div>
  )
}

export default Button2Icon
