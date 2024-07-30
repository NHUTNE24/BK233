import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { InfoIcon } from '../../assets/Icons';
function GeneralItem({ Icon, data, label, url }) {
    return (
        <div className="flex items-start gap-[24px]">
            <div className="flex items-center gap-[10px] min-w-[110px]">
                {Icon && <Icon></Icon>}
                <p className="font-bold text-[14px]">{label}</p>
            </div>
            <div className="flex flex-col gap-[10px]">
                {!url
                    ? data?.map((item, index) => (
                          <p key={index} className={`font-normal text-[14px]`}>
                              {item}
                          </p>
                      ))
                    : data?.map((item, index) => (
                          <Link
                              key={index}
                              className={`font-normal text-[14px] underline text-menuIconColor flex gap-[3px]`}
                              to={url[index]}
                          >
                              {item}
                              <InfoIcon></InfoIcon>
                          </Link>
                      ))}
            </div>
        </div>
    );
}

GeneralItem.propTypes = {
    Icon: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    data: PropTypes.arrayOf(PropTypes.string).isRequired,
    label: PropTypes.string.isRequired,
    url: PropTypes.arrayOf(PropTypes.string),
};

export default GeneralItem;
