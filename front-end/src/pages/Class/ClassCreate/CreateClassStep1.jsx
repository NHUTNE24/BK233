import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ButtonComponent from '../../../components/Button/Button';

function CreateClassStep1() {
    const navigate = useNavigate();
    const [className, setClassName] = useState('');

    const handleNavigate = () => {
        if (!className) return;
        navigate(`/class/create/${className}/step2`);
    };

    return (
        <div>
            <div className="bg-[#2D3748] px-[20px] py-[20px]">
                <p className="text-primary font-medium text-[24px] tracking-[0.2em]">
                    Class
                </p>
            </div>
            <div className="flex items-center gap-[15px] px-[20px] mt-[20px]">
                <p className="font-semibold text-[16px]">Class name</p>
                <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[296px] p-[10px]"
                    required
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                />
                <ButtonComponent onClick={handleNavigate} text="Create" />
            </div>
        </div>
    );
}

export default CreateClassStep1;
