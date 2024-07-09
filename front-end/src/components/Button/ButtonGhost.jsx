import { Button } from 'antd';

const ButtonGhost = () => {
  const customButtonStyle = {
    width: "36px",
    height: "32px",
    padding: "2px 0px",
    gap: "5px",
    borderRadius: "8px",
    fontWeight: 'bold', 
    textDecoration: 'underline', 
  };
  return (
    <div style={{ padding: "50px" }}>
      <Button type="link" style={customButtonStyle} danger
      href="#"
      >
        Filter
      </Button>
    </div>
  )
}

export default ButtonGhost