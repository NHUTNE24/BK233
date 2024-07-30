import SortIcon from "@mui/icons-material/Sort";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";

interface SizeProps {
  size: "small" | "medium" | "large";
}
interface SizeAndColorProps{
  size: "small" | "medium" | "large";
  color: string;
}



const iconStyle = { color: "black" };

const Sort = ({ size, color }: SizeAndColorProps) => {
  const iconStylee = { color: color }; 
  return <SortIcon fontSize={size} style={iconStylee} />;
};
const AddCircleOutline = ({ size }: SizeProps) => (
  <AddCircleOutlineIcon fontSize={size} style={iconStyle} />
);
const RemoveCircleOutline = ({ size }: SizeProps) => (
  <RemoveCircleOutlineIcon fontSize={size} style={iconStyle} />
);
const PersonAdd = ({ size }: SizeProps) => (
  <PersonAddIcon fontSize={size} style={iconStyle} />
);
const FilterList = ({ size }: SizeProps) => (
  <FilterListIcon fontSize={size} style={iconStyle} />
);
const ArrowDropDownCircle = ({ size }: SizeProps) => (
  <ArrowDropDownCircleIcon fontSize={size} style={iconStyle} />
);
const CancelOutlined = ({ size }: SizeProps) => (
  <CancelOutlinedIcon fontSize={size} style={iconStyle} />
);
const MoreHorizOutlined = ({ size }: SizeProps) => (
  <MoreHorizOutlinedIcon fontSize={size} style={iconStyle} />
);
const DragIndicator = ({ size }: SizeProps) => (
  <DragIndicatorIcon fontSize={size} style={iconStyle} />
);
const Visibility = ({ size }: SizeProps) => (
  <VisibilityIcon fontSize={size} style={iconStyle} />
);
const VisibilityOff = ({ size }: SizeProps) => (
  <VisibilityOffIcon fontSize={size} style={iconStyle} />
);
const ToggleOff = ({ size }: SizeProps) => (
  <ToggleOffIcon fontSize={size} style={iconStyle} />
);

export {
  Sort,
  AddCircleOutline,
  RemoveCircleOutline,
  PersonAdd,
  FilterList,
  ArrowDropDownCircle,
  CancelOutlined,
  MoreHorizOutlined,
  DragIndicator,
  Visibility,
  VisibilityOff,
  ToggleOff,
};
