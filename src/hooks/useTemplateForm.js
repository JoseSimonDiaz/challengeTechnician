import { useRef, useState } from 'react'
import domtoimage from 'dom-to-image-more'
export const useTemplateForm = (initialFormData, fileNamePrefix) => {
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [loading] = useState(false)
  const [previewLoading, setPreviewLoading] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [formData, setFormData] = useState(initialFormData)
  const previewRef = useRef(null)
  const handleFileChange = (newFile) => {
    if (!newFile) return
    setFile(newFile)
    const reader = new FileReader()
    reader.onload = (event) => {
      setPreviewUrl(event.target.result) 
    }
    reader.readAsDataURL(newFile)
  }
  const handleFileRemove = () => {
    setFile(null)
    setPreviewUrl('')
  }
  const handlePreview = async (form, setIsModalOpen) => {
    try {
      setPreviewLoading(true)
      const values = await form.validateFields()
      setFormData(values)
      setIsModalOpen(true)
    } catch (err) {
      console.error('Error al validar formulario:', err)
    } finally {
      setPreviewLoading(false)
    }
  }
  const handleDownload = async () => {
    if (!previewRef.current) return
    try {
      setDownloading(true)
      const dataUrl = await domtoimage.toPng(previewRef.current, {
        quality: 1,
        cacheBust: true,
        width: previewRef.current.offsetWidth * 2,
        height: previewRef.current.offsetHeight * 2,
        style: {
          transform: 'scale(2)',
          transformOrigin: 'top left',
        },
      })
      const link = document.createElement('a')
      link.download = `${fileNamePrefix}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Error al generar la imagen:', err)
    } finally {
      setDownloading(false)
    }
  }
  return {
    file,
    previewUrl,
    loading,
    downloading,
    previewLoading,
    formData,
    previewRef,
    handleFileChange,
    handleFileRemove,
    handlePreview,
    handleDownload,
  }
}
