import { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import './WordEditor.scss';

function WordEditor({ content, setContent, minHeight = '200px', errorStyle }) {
    const [isEditing, setIsEditing] = useState(false);

    const quillRef = useRef(null);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target)
            ) {
                setIsEditing(false);
            }
        };

        if (isEditing) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isEditing]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleChangeText = (value) => {
        setContent(value);
    };

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            ['link', 'image'],
            ['clean'],
        ],
    };

    return (
        <div
            ref={wrapperRef}
            className={`editable-div ${errorStyle ? 'error-style' : ''}`}
        >
            {isEditing ? (
                <div className="editor-mode" style={{ minHeight }}>
                    <ReactQuill
                        ref={quillRef}
                        value={content}
                        onChange={handleChangeText}
                        modules={modules}
                        formats={[
                            'header',
                            'font',
                            'size',
                            'bold',
                            'italic',
                            'underline',
                            'strike',
                            'blockquote',
                            'list',
                            'bullet',
                            'indent',
                            'link',
                            'image',
                        ]}
                    />
                </div>
            ) : (
                <div
                    className="view-mode"
                    onClick={handleEditClick}
                    style={{ minHeight }}
                >
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
            )}
        </div>
    );
}

export default WordEditor;
