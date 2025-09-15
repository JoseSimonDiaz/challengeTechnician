import React from 'react';
import { Modal, Button, Spin } from 'antd';
import { CloseOutlined, DownloadOutlined, LoadingOutlined } from '@ant-design/icons';
import './previewModal.css';

const PreviewModal = ({
  isOpen,
  onClose,
  onDownload,
  downloading,
  children,
}) => {
  return (
    <Modal
      open={isOpen}
      footer={null}
      closeIcon={<CloseOutlined />}
      onCancel={onClose}
      centered
      width={"fit-content"}
      className="preview-modal"
    >
      <h2 className="previewClass">Preview</h2>
      {children}

      <div className="modal-footer">
        <Button
          type="primary"
          onClick={onDownload}
          disabled={downloading}
          className="download-button"
        >
          {downloading ? (
            <Spin indicator={<LoadingOutlined spin />} size="small" />
          ) : (
            <DownloadOutlined />
          )}
          {downloading ? "Generando..." : "Descargar"}
        </Button>
      </div>
    </Modal>
  );
};

export default PreviewModal;
