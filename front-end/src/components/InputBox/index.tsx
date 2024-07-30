import React from "react";
import { Input } from "antd";
import "./index.css"
interface CustomProps {
  placeholder?: string;
  width?: string | number;
  height?: string | number;
  fontSize?: string | number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  text?: string;
  textColor?: string;
  textFontSize?: string;
  backgroundColor?: string;
  icon?: React.ComponentType;
  secondIcon?: React.ComponentType;
}

const NoIcon = ({
  placeholder = "Search by...",
  width = "350px",
  height = "50px",
  fontSize = "18px",
  value,
  onChange,
  backgroundColor,
}: CustomProps) => {
  const inputStyle = {
    width,
    height,
    fontSize,
    padding: "10px 20px",
    backgroundColor,
  };
  return (
    <Input
      style={inputStyle}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};
const OneIconLeft = ({
  placeholder = "Search by...",
  width = "350px",
  height = "50px",
  fontSize = "18px",
  value,
  onChange,
  backgroundColor,
  icon,
}: CustomProps) => {
  const inputStyle = {
    width,
    height,
    fontSize,
    padding: "2px 20px",
    backgroundColor,

  };
  return (
    <Input
      style={inputStyle}
      placeholder={placeholder}
      prefix={icon ? React.createElement(icon) : undefined}
      value={value}
      onChange={onChange}
    />
  );
};
const OneIconRight = ({
  placeholder = "Search by...",
  width = "350px",
  height = "50px",
  fontSize = "18px",
  value,
  onChange,
  backgroundColor,
  icon,
}: CustomProps) => {
  const inputStyle = {
    width,
    height,
    fontSize,
    padding: "10px 20px",
    backgroundColor,
    icon,
  };
  return (
    <Input
      style={inputStyle}
      placeholder={placeholder}
      suffix={icon ? React.createElement(icon) : undefined}
      value={value}
      onChange={onChange}
    />
  );
};
const TwoIcon = ({
  placeholder = "Search by...",
  width = "350px",
  height = "50px",
  fontSize = "18px",
  value,
  onChange,
  backgroundColor,
  icon,
  secondIcon,
}: CustomProps) => {
  const inputStyle = {
    width,
    height,
    fontSize,
    padding: "10px 20px",
    backgroundColor,
    icon,
    secondIcon,
  };
  return (
    <Input
      style={inputStyle}
      placeholder={placeholder}
      prefix={icon ? React.createElement(icon) : undefined}
      suffix={secondIcon ? React.createElement(secondIcon) : undefined}
      value={value}
      onChange={onChange}
    />
  );
};
const InlineMess = ({
  placeholder = "Search by...",
  width = "350px",
  height = "50px",
  fontSize = "18px",
  value,
  onChange,
  text = "custom inline message",
  textColor = "red",
  textFontSize = "18px",
  backgroundColor,
}: CustomProps) => {
  const inputStyle = {
    width,
    height,
    fontSize,
    padding: "10px 20px",
    backgroundColor,
  };
  const textStyle = {
    color: textColor,
    fontSize: textFontSize,
    fontStyle: "italic",
    textAlign: "left" as const,
  };
  return (
    <div className="flex flex-col gap-2">
      <Input
        style={inputStyle}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <p style={textStyle}>{text}</p>
    </div>
  );
};

export { OneIconLeft, OneIconRight, TwoIcon, NoIcon, InlineMess };
