const InputField = ({ fieldName, hide = false, onChange }) => {
  return (
    <div className="input-container">
      <h3 className="label">{fieldName}</h3>
      <input onChange={onChange} type={hide ? "password" : "text"} className="input-field" />
    </div>
  );
};

export default InputField;
