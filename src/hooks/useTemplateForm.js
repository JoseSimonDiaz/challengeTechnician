import { useState, useCallback, useRef } from 'react';
import { message } from 'antd';
import { downloadImage } from '../utils/downloadUtils';

export const useTemplateForm = (initialFormData, filePrefix) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const previewRef = useRef(null);
  const handleFileChange = useCallback((file) => {
    setLoading(true);
    setTimeout(() => {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setFile(file);
      setLoading(false);
      message.success(`${file.name} cargada correctamente.`);
    }, 800);
  }, []);
  const handleFileRemove = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
  }, [previewUrl]);
  const handlePreview = useCallback((form, setIsModalOpen) => {
    setPreviewLoading(true);
    form
      .validateFields()
      .then((values) => {
        setFormData(values);
        setIsModalOpen(true);
        setPreviewLoading(false);
      })
      .catch(() => setPreviewLoading(false));
  }, []);
  const handleDownload = useCallback(async () => {
    setDownloading(true);
    await downloadImage(
      previewRef,
      `${filePrefix}_${formData.name || "usuario"}.png`
    );
    setDownloading(false);
  }, [formData.name, filePrefix]);
  return {
    file,
    previewUrl,
    loading,
    downloading,
    previewLoading,
    formData,
    previewRef,
    setFormData,
    handleFileChange,
    handleFileRemove,
    handlePreview,
    handleDownload,
  };
};
