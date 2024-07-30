import imageLogo from "src/assets/images/logo.png";
import imageUserLogo from "src/assets/images/cat.png";
import imagefpt from "src/assets/images/logo1.png";
import LogoutButton from '../../components/LogOut';
import { useSelector } from 'react-redux';

const Header = () => {
	const username = useSelector((state) => state.auth?.username || '');
	const avatar = useSelector((state) => state.auth?.avatar || imageUserLogo);
	return (
		<header className="sticky text-primary border-b-2 top-0 z-[9999] flex flex-row justify-between items-center bg-main px-5 py-3">
			<div>
				<img className="h-10" src={imageLogo}></img>
			</div>
			<div className="flex flex-row gap-10 items-center">
				<div className="flex flex-row gap-3 bg-[#0B2136] items-center rounded-full px-4 py-1">
					<img className="h-5" src={imagefpt}></img>
					<div className="caption1 text-inputHiddenColor">uniGate</div>
				</div>
				<div className="flex flex-row gap-2 items-center">
					<img className="h-10 aspect-square rounded-full" src={avatar} alt="User"></img>
					<div className="flex flex-col gap-1">
						<div className="subtitle1 font-semibold">{username}</div>
						<LogoutButton/>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
