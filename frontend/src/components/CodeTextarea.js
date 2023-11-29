const CodeTextarea = ({ code, onChange }) => {
    const lines = code.split('\n');

    return (
        <div className="code-input">
            <div className="line-numbers">
                {lines.map((_, index) => (
                    <div key={index} className="line-number">
                        {index + 1}
                    </div>
                ))}
            </div>
            <textarea
                value={code}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Ingrese su código aquí"
            />
        </div>
    );
};


export default CodeTextarea;