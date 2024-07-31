import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import SyllabusDetailInformation from '../components/SyllabusDetailInformation';

function SyllabusDetail() {
    const navigate = useNavigate();
    return (
        <>
            <div
                className="view-syllabus__detail"
                style={{ padding: '16px 0' }}
            >
                <Button
                    className="btn-primary "
                    onClick={() => {
                        navigate('/syllabus');
                    }}
                >
                    Back
                </Button>
                <SyllabusDetailInformation />
            </div>
        </>
    );
}

export default SyllabusDetail;
