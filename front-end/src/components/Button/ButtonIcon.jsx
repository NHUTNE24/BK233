import { Button } from "antd";
import { IoFilterSharp } from "react-icons/io5";

const ButtonIcon = ({ text, icon = <IoFilterSharp />, background = "#2D3748" }) => {
  const customButtonStyle = {
    width: "95px",
    height: "38px",
    // padding: "2px 25px",
    gap: "5px",
    borderRadius: "8px",
    background: background,
    boxShadow: "0px 1px 3px 1px #00000026, 0px 1px 2px 0px #0000004D",
  };

  return (
    <div>
      <Button type="primary" style={customButtonStyle} icon={icon}
      href="#"
      >
        {text}
      </Button>
    </div>
  );
};

export default ButtonIcon;
