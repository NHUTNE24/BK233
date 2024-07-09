
import Logo from '../../assets/images/logo.png';
import SubLogo from '../../assets/images/logo1.png';
import Cat from '../../assets/images/cat.png';

const Header = () => {
    return (
        <div className="w-full fixed top-0 left-0 right-0 h-[79px] bg-[#2D3748] rounded-t-[40px] flex justify-between items-center pl-[40px] pr-[20px] py-[10px]">
            <div>
                <img src={Logo} alt="" />
            </div>
            <div className="flex items-center justify-between gap-[40px]">
                <div className="bg-[#0B2136] px-[15px] py-[5px] flex items-center justify-between gap-[7px] rounded-[30px]">
                    <div className="">
                        <img src={SubLogo} alt="" className="block h-[20px]" />
                    </div>
                    <p className="text-[12px] text-white">uniGate</p>
                </div>
                <div className="flex items-center justify-between gap-[7px]">
                    <div>
                        <img
                            src={Cat}
                            alt=""
                            className="h-[43px] rounded-[50%] block"
                        />
                    </div>
                    <div className="flex flex-col items-center justify-between gap-[5px] text-white">
                        <p className="text-[16px] font-semibold">
                            Warrior Tran
                        </p>
                        <p className="text-[16px]">Log out</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
