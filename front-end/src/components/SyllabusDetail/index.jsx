import "./SyllabusDetail.css";
import { DeliveryTypeIcon1, DeliveryTypeIcon2, DeliveryTypeIcon3, DeliveryTypeIcon4, DeliveryTypeIcon5, DeliveryTypeIcon6, MaterialFolderIcon } from '../../assets';

const deliveryTypeIcons = {
  1: DeliveryTypeIcon1,
  2: DeliveryTypeIcon2,
  3: DeliveryTypeIcon3,
  4: DeliveryTypeIcon4,
  5: DeliveryTypeIcon5,
  6: DeliveryTypeIcon6,
};

const detailInfo2 = { name: '.NET Introduction', standard: 'H4SD', duration: 30, status: 'Online', delivery_type_id: 2 };

const SyllabusTab = ({ width = "w-[831px]", detailInfo }) => {
  // detailInfo = detailInfo2;
  const DeliveryTypeIcon = deliveryTypeIcons[detailInfo.delivery_type_id];
    return (
        <div className={`container ${width}`}>
          <div className="left-column font-bold">
          {detailInfo.name}
          </div>
          <div className="right-column">
            <div className="standard-info"><span>{detailInfo.standard}</span></div>
            <div className="duration-info font-normal">{detailInfo.duration}mins</div>
            <div className="status-info"><span>{detailInfo.status}</span></div>
            <div className="icon">{DeliveryTypeIcon && <DeliveryTypeIcon width="24" height="24" />}</div>
            <div className="icon"><MaterialFolderIcon width="24" height="24" /></div>
          </div>
        </div>
      );
};
export default SyllabusTab;