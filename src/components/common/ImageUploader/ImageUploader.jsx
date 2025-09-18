import PropTypes from 'prop-types'
import { Upload, message } from 'antd'
import ImgCrop from 'antd-img-crop'
import { InboxOutlined, LoadingOutlined } from '@ant-design/icons'
import './imageUploader.css'
const { Dragger } = Upload
const ERROR_MESSAGES = {
  invalidFile: 'Solo puedes subir imágenes JPG/PNG!',
  invalidCrop: 'Solo puedes recortar imágenes JPG/PNG!',
}
const validateImageFile = (file) => {
  const isValid = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isValid) {
    message.error(ERROR_MESSAGES.invalidFile)
  }
  return isValid
}
const handleBeforeCrop = (file) => {
  const isValid = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isValid) {
    message.error(ERROR_MESSAGES.invalidCrop)
  }
  return isValid
}
const ImageUploader = ({ file, previewUrl, loading, onFileChange, onFileRemove }) => {
  const props = {
    name: 'file',
    multiple: false,
    accept: '.jpg,.jpeg,.png',
    beforeUpload: (file) => {
      if (!validateImageFile(file)) return Upload.LIST_IGNORE
      onFileChange(file)
      return false
    },
    onRemove: onFileRemove,
    fileList: file
      ? [
          {
            uid: file.uid || '-1',
            name: file.name,
            status: 'done',
            url: previewUrl,
          },
        ]
      : [],
  }
  return (
    <ImgCrop
      rotationSlider
      modalTitle="Recortar imagen"
      modalOk="Confirmar"
      modalCancel="Cancelar"
      beforeCrop={handleBeforeCrop}
    >
      <Dragger {...props} disabled={loading} className="image-uploader">
        <p className="ant-upload-drag-icon">
          {loading ? (
            <LoadingOutlined style={{ fontSize: 24 }} />
          ) : (
            <InboxOutlined style={{ fontSize: 24 }} />
          )}
        </p>
        <p className="ant-upload-text">Arrastra la foto aquí</p>
        <p className="ant-upload-hint">Se utilizará una única imagen a la vez</p>
      </Dragger>
    </ImgCrop>
  )
}
ImageUploader.propTypes = {
  file: PropTypes.object,
  previewUrl: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  onFileChange: PropTypes.func.isRequired,
  onFileRemove: PropTypes.func.isRequired,
}
export default ImageUploader
