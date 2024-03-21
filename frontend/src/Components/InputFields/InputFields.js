export const InputFields = (props) => {
  const {
    errorMsg,
    id,
    name,
    value,
    placeholder,
    inputType,
    type,
    data,
    setData,
    label,
    classStyle,
  } = props;
  return (
    <>
      <label> {label} </label>
      {inputType === "textarea" ? (
        <textarea
          type="text"
          value={value}
          className={classStyle}
          placeholder={placeholder}
          onChange={(e) => setData(e.target.value)}
        />
      ) : inputType === "file" ? (
        <input
          value={value}
          id={id}
          name={name}
          type={type}
          className={classStyle}
          placeholder={placeholder}
          onChange={(e) => setData(e.target.value)}
        />
      ) : (
        <>
          <input
            required
            value={value}
            type={type}
            className={classStyle}
            placeholder={placeholder}
            onChange={(e) => setData(e.target.value)}
          />
        </>
      )}
    </>
  );
};
