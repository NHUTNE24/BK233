import { FC } from "react";
import { CloseOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";

interface ChipProp {
  title: string;
  hexColor?: string;
  isChip?: boolean;
  handleDeleteClick?: () => void;
}

const SingleChip: FC<ChipProp> = ({
  title,
  isChip,
  hexColor,
  handleDeleteClick,
}) => {
  return (
    <div
      className={`w-full flex flex-row items-center justify-center space-x-2 border border-white rounded-lg px-[15px] py-[7px]`}
      style={{ background: hexColor ? hexColor : "#2D3748" }}
    >
      <p className="text-xs italic leading-[18px] text-primary">{title}</p>
      {isChip && (
        <Button
          className="flex items-center justify-center"
          onClick={handleDeleteClick}
        >
          <CloseOutlined style={{ color: "#FFFFFF", width: 8, height: 8 }} />
        </Button>
      )}
    </div>
  );
};

const RoundedChip: FC<ChipProp> = ({
  title,
  isChip,
  hexColor,
  handleDeleteClick,
}) => {
  return (
    <div
      className="flex flex-row items-center justify-center w-[80px] rounded-full px-[5px] py-[5px]"
      style={{ background: hexColor ? hexColor : "#2D3748" }}
    >
      <p className="text-xs leading-[18px] text-default">{title}</p>
      {isChip && (
        <button
          className="flex items-center justify-center"
          onClick={handleDeleteClick}
        >
          <CloseCircleOutlined
            style={{ color: "#FFFFFF", width: 14, height: 14 }}
          />
        </button>
      )}
    </div>
  );
};

export default SingleChip;
export { RoundedChip };
