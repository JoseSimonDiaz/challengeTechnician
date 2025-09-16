import React, { useState } from 'react';
import { Form, Input, Button, Spin, Row, Col, Select } from 'antd';
import { EyeFilled, LoadingOutlined } from '@ant-design/icons';
import ImageUploader from '../components/common/ImageUploader/ImageUploader';
import PreviewModal from '../components/common/PreviewModal/PreviewModal';
import WelcomeTemplate from '../components/templates/WelcomeTemplate/WelcomeTemplate';
import { useTemplateForm } from '../hooks/useTemplateForm';
import {
  FORM_FIELDS,
  VALIDATION_RULES,
  OPTIONS_AREAS,
} from '../constants/formConstants';

const WelcomeSing = () => {
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
    { [FORM_FIELDS.NAME]: "", [FORM_FIELDS.OPTION]: "" },
    "placa_bienvenida"
  );
  const isFormValid = () => {
    const values = form.getFieldsValue();
    const hasErrors = form
      .getFieldsError()
      .some(({ errors }) => errors.length > 0);
    return values[FORM_FIELDS.NAME] && values[FORM_FIELDS.OPTION] && !hasErrors;
  };
  return (
    <div className="template-welcome-container">
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
          <Form form={form} className="welcome-form">
            <Row gutter={16} className="input-row">
              <Col xs={24} sm={12}>
                <Form.Item
                  name={FORM_FIELDS.NAME}
                  rules={VALIDATION_RULES[FORM_FIELDS.NAME]}
                  className="form-item"
                >
                  <Input placeholder="Nombre" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name={FORM_FIELDS.OPTION}
                  rules={[{ required: true, message: "Selecciona una opción" }]}
                  className="form-item"
                >
                  <Select placeholder="Selecciona una opción">
                    <Select.Option value={OPTIONS_AREAS.SCHOOL}>
                      School
                    </Select.Option>
                    <Select.Option value={OPTIONS_AREAS.LABS}>
                      Labs
                    </Select.Option>
                    <Select.Option value={OPTIONS_AREAS.STUDIO}>
                      Studio
                    </Select.Option>
                  </Select>
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
        <WelcomeTemplate
          previewUrl={previewUrl}
          formData={formData}
          previewRef={previewRef}
        />
      </PreviewModal>
    </div>
  );
};
export default WelcomeSing;
