import { Layout } from 'antd';

import { Header, Footer, NavigateMenu, Inputs, Button, Table } from '../../components';
import { IoAddCircleOutline, IoCloudUploadSharp } from 'react-icons/io5';

const TrainingProgramList = () => {
    return (
        <div className="mt-[79px]">
            <Layout>
                <Header />
                <Layout.Content className="home-background"></Layout.Content>
                <Layout className="main-layout">
                    <NavigateMenu />
                    <Layout className="">
                        <header>
                            <h4 className="px-[30px] py-[15px] bg-primary font-[500] text-[2.4rem] text-[#FFF]">
                                Training program
                            </h4>
                        </header>
                        <main className="mt-[30px]">
                            <section
                                id="search-filter"
                                className="flex ml-[30px] mb-[10px]"
                            >
                                <Inputs.InputNormal
                                    width={300}
                                    height={35}
                                    hasSuffix={false}
                                />
                                <div className="ml-[5px]">
                                    <Button.ButtonIcon text="Filter" />
                                </div>
                                <div className='ml-auto'>
                                    <Button.ButtonIcon icon={<IoCloudUploadSharp />} text="Import" background='#D45B13' />
                                </div>
                                    <div className='ml-[5px] mr-[30px]'>
                                        <Button.ButtonIcon icon={<IoAddCircleOutline />} text="Add new" />
                                    </div>
                            </section>
                            <section>
                                <Table dataSource={null} columns={null} />
                            </section>
                        </main>
                    </Layout>
                </Layout>
                <Footer />
            </Layout>
        </div>
    );
}

export default TrainingProgramList;
