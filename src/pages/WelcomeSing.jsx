import React, { useState, useRef, useCallback } from 'react';
import { Form, Input, Button, message, Spin, Row, Col, Select } from 'antd';
import { EyeFilled, LoadingOutlined } from '@ant-design/icons';

import '../styles/welcomeSing.css';

import ImageUploader from '../components/common/ImageUploader/ImageUploader';
import PreviewModal from '../components/common/PreviewModal/PreviewModal';
import WelcomeTemplate from '../components/templates/WelcomeTemplate/WelcomeTemplate';
import { downloadImage } from '../utils/downloadUtils';
import { VALIDATION_RULES } from '../constants/formConstants';


const TemplateWelcome = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", option: "" });
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
    form.resetFields();
  }, [previewUrl, form]);

  const handlePreview = useCallback(() => {
    setPreviewLoading(true);
    form
      .validateFields()
      .then((values) => {
        setFormData(values);
        setIsModalOpen(true);
        setPreviewLoading(false);
      })
      .catch(() => {
        setPreviewLoading(false);
      });
  }, [form]);

  const handleDownload = useCallback(async () => {
    setDownloading(true);
    await downloadImage(
      previewRef,
      `placa_bienvenida_${formData.name || "usuario"}.png`
    );
    setDownloading(false);
  }, [formData.name]);

  const isFormValid = () => {
    const values = form.getFieldsValue();
    const hasErrors = form
      .getFieldsError()
      .some(({ errors }) => errors.length > 0);
    return values.name && values.option && !hasErrors;
  };

  return (
    <div className="template-welcome-container">
      <ImageUploader
        file={file}
        previewUrl={previewUrl}
        loading={loading}
        onFileChange={handleFileChange}
        onFileRemove={handleFileRemove}
      />

      {file && (
        <div className="form-container">
          <Form form={form} className="welcome-form">
            <Row gutter={16} className="input-row">
              <Col xs={24} sm={12}>
                <Form.Item
                  name="name"
                  rules={VALIDATION_RULES.NAME}
                  className="form-item"
                >
                  <Input placeholder="Nombre" />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  name="option"
                  rules={[{ required: true, message: "Selecciona una opción" }]}
                  className="form-item"
                >
                  <Select placeholder="Selecciona una opción">
                    <Select.Option value="school">School</Select.Option>
                    <Select.Option value="labs">Labs</Select.Option>
                    <Select.Option value="studio">Studio</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item shouldUpdate className="button-container">
              {() => (
                <Button
                  type="primary"
                  onClick={handlePreview}
                  disabled={!isFormValid() || previewLoading}
                  className="preview-button"
                  size="large"
                >
                  {previewLoading ? (
                    <Spin indicator={<LoadingOutlined spin />} size="small" />
                  ) : (
                    <EyeFilled />
                  )}
                  {previewLoading ? "Cargando..." : "Previsualizar"}
                </Button>
              )}
            </Form.Item>
          </Form>
        </div>
      )}

      <PreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDownload={handleDownload}
        downloading={downloading}
      >
        <WelcomeTemplate
          previewUrl={previewUrl}
          formData={formData}
          previewRef={previewRef}
        />
      </PreviewModal>
    </div>
  );
};

export default TemplateWelcome;
