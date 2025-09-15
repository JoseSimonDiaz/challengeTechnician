// src/pages/TemplateBirthday.jsx
import React, { useState, useRef } from 'react';
import {
  InboxOutlined,
  LoadingOutlined,
  EyeFilled,
  CloseOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import { Upload, message, Form, Input, Button, Modal, Tabs, Spin } from 'antd';
import html2canvas from 'html2canvas';
import Template_Birthday from '../../public/images/template_birthday.png';

const { Dragger } = Upload;

const TemplateBirthday = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", day: "", month: "" });
  const previewRef = useRef(null);

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
      setLoading(true);
      setTimeout(() => {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        setFile(file);
        setLoading(false);
        message.success(`${file.name} cargada correctamente.`);
      }, 800);
      return false;
    },
    onRemove: () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setFile(null);
      setPreviewUrl(null);
      form.resetFields();
    },
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

  const handlePreview = () => {
    form
      .validateFields()
      .then((values) => {
        setFormData(values);
        setIsModalOpen(true);
      })
      .catch(() => {});
  };

  const handleDownload = async () => {
    if (previewRef.current) {
      setDownloading(true);
      try {
        const canvas = await html2canvas(previewRef.current, {
          useCORS: true,
          backgroundColor: null,
        });
        const link = document.createElement("a");
        link.download = `placa_cumple_${formData.name || "usuario"}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      } catch (error) {
        message.error("Error al descargar la imagen", error);
      } finally {
        setDownloading(false);
      }
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: "Placa de Cumpleaños",
            children: null,
          },
          {
            key: "2",
            label: "Placa de Bienvenida",
            children: null,
            disabled: true,
          },
        ]}
      />

      <Dragger {...props} disabled={loading}>
        <p className="ant-upload-drag-icon">
          {loading ? (
            <LoadingOutlined style={{ fontSize: 24 }} />
          ) : (
            <InboxOutlined style={{ fontSize: 24 }} />
          )}
        </p>
        <p className="ant-upload-text">Arrastra la foto de la persona aquí</p>
        <p className="ant-upload-hint">
          Se utilizará una única imagen a la vez
        </p>
      </Dragger>

      {file && (
        <Form form={form} layout="inline" style={{ gap: 8, flexWrap: "wrap" }}>
          <Form.Item
            name="name"
            rules={[
              { required: true, message: "El nombre es obligatorio" },
              { max: 80, message: "Máximo 80 caracteres" },
            ]}
          >
            <Input placeholder="Nombre" />
          </Form.Item>

          <Form.Item
            name="day"
            rules={[
              { required: true, message: "El día es obligatorio" },
              {
                validator: (_, value) =>
                  !value || (value >= 0 && value <= 31)
                    ? Promise.resolve()
                    : Promise.reject("El día debe estar entre 0 y 31"),
              },
            ]}
          >
            <Input placeholder="Día" type="number" />
          </Form.Item>

          <Form.Item
            name="month"
            rules={[
              { required: true, message: "El mes es obligatorio" },
              { max: 15, message: "Máximo 15 caracteres" },
            ]}
          >
            <Input placeholder="Mes" />
          </Form.Item>

          <Form.Item shouldUpdate>
            {() => {
              const hasErrors = form
                .getFieldsError()
                .some(({ errors }) => errors.length > 0);
              const values = form.getFieldsValue();
              const disabled =
                !values.name || !values.day || !values.month || hasErrors;
              return (
                <Button
                  type="primary"
                  onClick={handlePreview}
                  disabled={disabled}
                  style={{
                    marginTop: 14,
                    borderRadius: 20,
                    width: 160,
                    padding: 12,
                  }}
                >
                  <EyeFilled /> Previsualizar
                </Button>
              );
            }}
          </Form.Item>
        </Form>
      )}

      <Modal
        open={isModalOpen}
        footer={null}
        closeIcon={<CloseOutlined />}
        onCancel={() => setIsModalOpen(false)}
        centered
        width={"fit-content"}
        styles={{ body: { padding: 0 } }}
      >
        <div
          ref={previewRef}
          style={{
            width: 1090,
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={Template_Birthday}
            alt="plantilla"
            style={{ width: "500px" }}
          />

          {previewUrl && (
            <img
              src={previewUrl}
              alt="foto subida"
              style={{
                position: "absolute",
                top: "54.1%",
                left: "58.4%",
                transform: "translateX(-50%)",
                width: "201px",
                height: "170px",
                objectFit: "cover",
              }}
            />
          )}

          <pre
            style={{
              position: "absolute",
              top: "34%",
              left: "49%",
              transform: "translate(-50%, -50%)",
              color: "white",
              fontSize: "12px",
              fontFamily: "monospace",
              padding: "8px",
              borderRadius: "4px",
              textAlign: "left",
              whiteSpace: "pre-wrap",
            }}
          >
            {`var i = 0, age = getAge();
while(true) {
  if (i === age) {
    alert('¡Feliz Cumple ${formData.name}!');
  }
  else {
    i++;
  }
}`}
          </pre>

          <div
            style={{
              position: "absolute",
              bottom: "11.1%",
              left: "40%",
              transform: "translate(-50%, -50%)",
              alignItems: "baseline",
              color: "#000",
              fontFamily: "Arial, sans-serif",
            }}
          >
            <div style={{ fontSize: "42px", fontWeight: "bold" }}>
              {formData.day || "__"}
            </div>
            <div style={{ fontSize: "16px", fontWeight: "400" }}>de</div>
            <div style={{ fontSize: "16px", fontWeight: "500" }}>
              {formData.month || "___"}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button
            type="primary"
            onClick={handleDownload}
            disabled={downloading}
            style={{
              borderRadius: 20,
              width: "160px",
              padding: 12,
              marginTop: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
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
    </div>
  );
};

export default TemplateBirthday;
