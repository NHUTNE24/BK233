import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

function CreateClassStep1() {
    return (
        <>
            <Header></Header>
            <div className="mt-[79px]">
                <Sidebar></Sidebar>
            </div>
            <div className="mt-[79px] ml-[256px]">
                <div className="bg-[#2D3748] px-[30px] py-[20px]">
                    <p className="text-white font-medium text-[24px] tracking-[0.2em]">
                        Class
                    </p>
                </div>
                <div className="flex items-center gap-[15px] px-[20px] mt-[20px]">
                    <p className="font-semibold text-[16px]">Class name</p>
                    <input
                        type="text"
                        id="first_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[296px] p-[10px]"
                        required
                    />
                    <button className='bg-[#2D3748] px-[25px] py-[8px] text-white font-bold text-[14px] rounded-[8px]'>Create</button>
                </div>
            </div>
        </>
    );
}

export default CreateClassStep1;
