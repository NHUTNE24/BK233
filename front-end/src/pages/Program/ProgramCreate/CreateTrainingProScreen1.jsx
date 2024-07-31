import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Inputs } from 'src/components';

export default function Screen1() {
    const navigate = useNavigate();
    const [programName, setProgramName] = useState('');

    const handleCreate = () => {
        if (!programName) return;
        navigate(`${programName}`);
    };

    return (
        <div className='text-black'>
            <header>
                <h4 className="bg-main px-[30px] py-[20px] flex items-center text-white text-left font-semibold tracking-[0.15625rem]">
                    New Training program
                </h4>
            </header>
            <main className="px-[30px]">
                <div className="w-[744px] h-[76px] flex items-center gap-[15px]">
                    <label>
                        <div className="text-[1rem] font-semibold">
                            Program name
                        </div>
                    </label>
                    <div className="text-[0.875rem] font-[500]">
                        <Inputs.InputNormal
                            width={424}
                            placeholder="Type program name"
                            hasPrefix={false}
                            hasSuffix={false}
                            handleChange={(e) => setProgramName(e.target.value)}
                            handleEnter={handleCreate}
                        />
                    </div>
                    <Button.ButtonPrimary
                        height={32}
                        content="Create"
                        handleClick={handleCreate}
                    />
                </div>
            </main>
        </div>
    );
}
