import PropTypes from 'prop-types';

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { SyllabusCard2 } from 'src/components';

const DragDropList = ({ selected, setSelected }) => {
    const handleRemove = (syllabusId) => {
        setSelected(selected.filter((Syllabus) => Syllabus.id !== syllabusId));
    };

    const onDragEnd = (result) => {
        // drag outside of list
        if (!result.destination) return;

        const temp = [...selected];
        const source = result.source.index;
        const destination = result.destination.index;
        const [target] = temp.splice(source, 1);
        temp.splice(destination, 0, target);

        setSelected(temp);
    };

    const getItemStyle = (isDragging, draggableStyle) => ({
        padding: 10,
        ...draggableStyle,
    });

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="selected-syllabi">
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="mt-[10px]"
                    >
                        {selected?.map((Syllabus, index) => (
                            <Draggable
                                key={Syllabus.id}
                                draggableId={Syllabus.id}
                                index={index}
                            >
                                {(provided, snapshot) => (
                                    <div
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                        style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                        )}
                                    >
                                        <SyllabusCard2
                                            syllabusId={Syllabus.id}
                                            syllabusName={Syllabus.topicName}
                                            syllabusCode={
                                                Syllabus.topicCode +
                                                ' v' +
                                                Syllabus.version
                                            }
                                            duration={
                                                <span>
                                                    {Syllabus.days + ' '} days (
                                                    {Syllabus.hours + ' '}{' '}
                                                    hours){' '}
                                                </span>
                                            }
                                            modified={
                                                <span>
                                                    Modified on{' '}
                                                    <em>
                                                        {Syllabus.modifiedDate}
                                                    </em>{' '}
                                                    by{' '}
                                                    <strong>
                                                        {Syllabus.modifiedBy}
                                                    </strong>
                                                </span>
                                            }
                                            isActive={true}
                                            isWithIcon={true}
                                            isMovable={
                                                snapshot.isDragging
                                                    ? true
                                                    : false
                                            }
                                            handleRemove={handleRemove}
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

DragDropList.propTypes = {
    selected: PropTypes.arrayOf(PropTypes.object).isRequired,
    setSelected: PropTypes.func.isRequired,
};

export default DragDropList;