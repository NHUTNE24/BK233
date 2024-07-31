function ErrorText({ errorText, className = '' }) {
    return (
        <>
            <p
                className={'footnote validation-rules ' + className}
                style={{ color: 'red', fontStyle: 'italic', height: '30px', lineHeight: '30px' }}
            >
                {errorText || 'This field is required'}
            </p>
        </>
    );
}
export default ErrorText;
