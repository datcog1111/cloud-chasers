import PropTypes from 'prop-types';

export default function FileUpload({
  setFile, uploadBtn, handleUpload, isUploaded,
}) {
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <>
      <div style={{ marginBottom: '15px' }}>
        <input type="file" onChange={handleChange} />
        {uploadBtn
    && <button type="button" color="blue" onClick={handleUpload}> Upload Image</button>}
        {isUploaded && <span> File Uploaded! </span>}
      </div>
    </>
  );
}

FileUpload.propTypes = {
  setFile: PropTypes.func.isRequired,
  handleUpload: PropTypes.func,
  uploadBtn: PropTypes.bool,
  isUploaded: PropTypes.bool,
};

FileUpload.defaultProps = {
  uploadBtn: false,
  isUploaded: false,
  handleUpload: () => {},
};
