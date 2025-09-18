import PropTypes from 'prop-types'
import { Modal, Button, Spin } from 'antd'
import {
  CloseOutlined,
  DownloadOutlined,
  LoadingOutlined,
} from '@ant-design/icons'
import './previewModal.css'
const PreviewModal = ({ isOpen, onClose, onDownload, downloading, children }) => {
  return (
    <Modal
      open={isOpen}
      footer={null}
      closeIcon={<CloseOutlined />}
      onCancel={onClose}
      centered
      width="fit-content"
      className="preview-modal"
    >
      <h2 className="previewClass">Vista previa</h2>
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
          {downloading ? 'Generando...' : 'Descargar'}
        </Button>
      </div>
    </Modal>
  )
}
PreviewModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
  downloading: PropTypes.bool,
  children: PropTypes.node,
}
export default PreviewModal
