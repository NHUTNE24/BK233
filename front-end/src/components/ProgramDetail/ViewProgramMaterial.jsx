import PropTypes from 'prop-types';

import ModalCustom from '../ModalCustom';
import Button from '../Button';
import { CreateIcon, DeleteForeverIcon } from '../../assets';

const ViewProgramMaterial = ({
    day_no,
    unit_no,
    unit_name,
    UnitChapter,
    isOpen,
    setIsOpen,
}) => {
    return (
        <ModalCustom
            width={704}
            isModalOpen={isOpen}
            handleCancel={() => {
                setIsOpen((array) => {
                    array[UnitChapter.id - 1] = false;
                    return [...array];
                });
                console.log(UnitChapter.id);
            }}
            modalTitle={'Day ' + day_no}
            bodyContent={
                <div>
                    <label
                        id="view-material-header"
                        className="flex font-bold mb-[15px]"
                    >
                        <h6 className="w-[150px] h-full">Unit {unit_no}</h6>
                        <div className="w-full relative">{unit_name}</div>
                    </label>
                    <div
                        id="view-material-content"
                        className="bg-grey rounded-[10px] px-[20px] py-[10px] font-[1.4rem]"
                    >
                        <h6 className="font-bold">{UnitChapter.name}</h6>
                        {UnitChapter.training_materials.map(
                            (training_material) => (
                                <MaterialTab
                                    key={training_material.id}
                                    training_material={training_material}
                                />
                            )
                        )}
                    </div>
                    <div
                        id="view-material-footer"
                        className="flex justify-center items-center mt-[10px] mb-[5px] font-[1.4rem]"
                    >
                        <Button.ButtonPrimary width={101} height={37} content="Upload new" />
                    </div>
                </div>
            }
            footer={null}
        />
    );
};

const MaterialTab = ({ training_material, handleEdit, handleDelete }) => {
    return (
        <div className="flex">
            <p>{training_material.file_name}</p>
            <div className="flex ml-auto">
                <p className="text-[#323232] italic mr-[10px]">
                    by {training_material.modified_by} on{' '}
                    {training_material.modified_on}{' '}
                </p>
                <i className="mr-[10px] cursor-pointer" onClick={handleEdit}>
                    {CreateIcon}
                </i>
                <i className="cursor-pointer" onClick={handleDelete}>
                    {DeleteForeverIcon}
                </i>
            </div>
        </div>
    );
};

ViewProgramMaterial.propTypes = {
    day_no: PropTypes.number,
    unit_no: PropTypes.number,
    unit_name: PropTypes.string,
    UnitChapter: PropTypes.object.isRequired,
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
};

MaterialTab.propTypes = {
    training_material: PropTypes.object.isRequired,
    handleEdit: PropTypes.func,
    handleDelete: PropTypes.func,
};

export default ViewProgramMaterial;
