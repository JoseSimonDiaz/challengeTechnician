import React, { useState } from 'react';
import { Form, Input, Button, Spin, Row, Col } from 'antd';
import { EyeFilled, LoadingOutlined } from '@ant-design/icons';
import '../styles/templateBirthday.css';
import ImageUploader from '../components/common/ImageUploader/ImageUploader';
import PreviewModal from '../components/common/PreviewModal/PreviewModal';
import BirthdayTemplate from '../components/templates/BirthdayTemplate/BirthdayTemplate';
import { useTemplateForm } from '../hooks/useTemplateForm';
import { FORM_FIELDS, VALIDATION_RULES } from '../constants/formConstants';
const TemplateBirthday = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
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
  } = useTemplateForm(
    { [FORM_FIELDS.NAME]: "", [FORM_FIELDS.DAY]: "", [FORM_FIELDS.MONTH]: "" },
    "placa_cumple"
  );
  const isFormValid = () => {
    const values = form.getFieldsValue();
    const hasErrors = form
      .getFieldsError()
      .some(({ errors }) => errors.length > 0);
    return (
      values[FORM_FIELDS.NAME] &&
      values[FORM_FIELDS.DAY] &&
      values[FORM_FIELDS.MONTH] &&
      !hasErrors
    );
  };
  return (
    <div className="template-birthday-container">
      <ImageUploader
        file={file}
        previewUrl={previewUrl}
        loading={loading}
        onFileChange={handleFileChange}
        onFileRemove={() => {
          handleFileRemove();
          form.resetFields();
        }}
      />
      {file && (
        <div className="form-container">
          <Form form={form} className="birthday-form">
            <Row gutter={16} className="input-row">
              <Col xs={24} sm={8}>
                <Form.Item
                  name={FORM_FIELDS.NAME}
                  rules={VALIDATION_RULES[FORM_FIELDS.NAME]}
                  className="form-item"
                >
                  <Input placeholder="Nombre" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={4}>
                <Form.Item
                  name={FORM_FIELDS.DAY}
                  rules={VALIDATION_RULES[FORM_FIELDS.DAY]}
                  className="form-item"
                >
                  <Input placeholder="Día" type="number" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item
                  name={FORM_FIELDS.MONTH}
                  rules={VALIDATION_RULES[FORM_FIELDS.MONTH]}
                  className="form-item"
                >
                  <Input placeholder="Mes (solo texto)" maxLength={15} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item shouldUpdate className="button-container">
              {() => (
                <Button
                  type="primary"
                  onClick={() => handlePreview(form, setIsModalOpen)}
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
        <BirthdayTemplate
          previewUrl={previewUrl}
          formData={formData}
          previewRef={previewRef}
        />
      </PreviewModal>
    </div>
  );
};
export default TemplateBirthday;
