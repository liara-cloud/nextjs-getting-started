import { useState } from 'react';
import { S3 } from 'aws-sdk';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [uploadLink, setUploadLink] = useState(null); 

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError(null);
    setUploadLink(null); 
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        setError('Please select a file');
        return;
      }

      const s3 = new S3({
        accessKeyId: process.env.BUCKET_ACCESS_KEY,
        secretAccessKey: process.env.BUCKET_SECRET_KEY,
        endpoint: `https://${process.env.BUCKET_ENDPOINT}`,
      });

      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: file.name,
        Body: file,
      };

      const response = await s3.upload(params).promise();      
      // temporary link for 1 hour
      const signedUrl = s3.getSignedUrl('getObject', {
          Bucket: process.env.BUCKET_NAME,
          Key: file.name,
          Expires: 3600, 
        });
            setUploadLink(signedUrl);

      console.log('File uploaded successfully');
    } catch (error) {
      setError('Error uploading file: ' + error.message);
    }
  };

  return (
    <div className="upload-container">
      <h1>Upload File to S3</h1>
      <p>{process.env.BUCKET_ENDPOINT}</p>
      <input type="file" onChange={handleFileChange} />
      <button className="upload-button" onClick={handleUpload} disabled={!file}>
        Upload
      </button>
      {uploadLink && (
        <h3 className="success-message">
          File uploaded successfully. Link: <a href={uploadLink}>Temporary Link</a>
          <br></br>
          If you're using public bucket, you can also have: <a href={`https://${process.env.BUCKET_NAME}.${process.env.BUCKET_ENDPOINT}/${imageFileName}`}>Permanent Link</a>
        </h3>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Upload;
