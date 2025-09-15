import React from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined, LoadingOutlined } from '@ant-design/icons';
import './imageUploader.css';

const { Dragger } = Upload;

const ImageUploader = ({
  file,
  previewUrl,
  loading,
  onFileChange,
  onFileRemove,
}) => {
  const props = {
    name: "file",
    multiple: false,
    accept: ".jpg,.jpeg,.png",
    beforeUpload: (file) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("Solo puedes subir imágenes JPG/PNG!");
        return Upload.LIST_IGNORE;
      }

      onFileChange(file);
      return false;
    },
    onRemove: onFileRemove,
    fileList: file
      ? [
          {
            uid: file.uid || "-1",
            name: file.name,
            status: "done",
            url: previewUrl,
          },
        ]
      : [],
  };

  return (
    <Dragger {...props} disabled={loading} className="image-uploader">
      <p className="ant-upload-drag-icon">
        {loading ? (
          <LoadingOutlined style={{ fontSize: 24 }} />
        ) : (
          <InboxOutlined style={{ fontSize: 24 }} />
        )}
      </p>
      <p className="ant-upload-text">Arrastra la foto de la persona aquí</p>
      <p className="ant-upload-hint">Se utilizará una única imagen a la vez</p>
    </Dragger>
  );
};

export default ImageUploader;
