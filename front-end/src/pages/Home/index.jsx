import { Button } from 'antd';
import { FaPlayCircle } from 'react-icons/fa';
import { useRef } from 'react';
const content = {
    headerChip: 'Updated August 2024',
    header: 'Fresher Academy Management System',
    subheader:
        'Blah bluisfhkoewhpwe mniweppe ifpewo ersif hui ah hsdhj ouirio 3ruu iu8er 99wew 89e uur u  u reoi juew iueh iewyrewiurieru    uir o hfiriuf e ipsjkdjkdh jwj ',
    videoTitle: 'Lesson 1',
    videoName: 'Welcome to FPT',
};

const HomePage = () => {
    return (
        <div
            style={{ height: 'calc(100vh - 70px - 32px)' }}
            className="py-5 px-10 flex flex-col justify-start"
        >
            <div className="w-full h-[90%] py-[10px] flex flex-col gap-[10px] rounded-[20px] justify-start items-center bg-primary">
                <HeaderChip text={content.headerChip} />
                <header className="w-[90%] flex flex-col gap-[10px] justify-center items-center">
                    <h3 className="text-main font-bold text-center">
                        {content.header}
                    </h3>
                    {/* <p className='w-[70%] text-center'>{content.subheader}</p> */}
                </header>
                <VideoPlayer />
            </div>
        </div>
    );
};

const HeaderChip = ({ text }) => {
    return (
        <div className="px-[15px] py-[10px] bg-[#DFDEDE] text-main font-semibold rounded-full text-[0.875rem]">
            {text}
        </div>
    );
};

const VideoPlayer = () => {
    const iframeRef = useRef(null);

    const handlePlayVideo = () => {
        if (iframeRef.current) {
            const src = iframeRef.current.src;
            iframeRef.current.src = src.replace('autoplay=0', 'autoplay=1');
        }
    };
    const videoSrc = "https://www.youtube.com/embed/MlLRo-GpHO4?autoplay=0";
    return (
        <div className="w-[55%] translate-y-12 relative ">
              <div className="w-full aspect-[16/9] bg-black rounded-[20px] shadow-[0_20px_40px_0_rgba(0,0,0,0.2)]">
                <iframe
                    ref={iframeRef}
                    className="w-full h-full rounded-[20px]"
                    src={`${videoSrc}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
            <div className='flex items-center gap-[10px] absolute left-[20px] bottom-[20px] bg-white/20 px-2 py-2 rounded-2xl backdrop-blur-lg'>
                <Button id='play-button' shape="circle" icon={<FaPlayCircle />} onClick={handlePlayVideo}></Button>
                <div className='flex flex-col gap-[0.5rem] text-white font-[400]'>
                    <p>{content.videoTitle}</p>
                    <p>{content.videoName}</p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
