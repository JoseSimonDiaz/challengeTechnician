// src/pages/TemplateBirthday.jsx
import React, { useState } from "react";
import { InboxOutlined, LoadingOutlined, EyeFilled } from "@ant-design/icons";
import { Upload, message, Form, Input, Button } from "antd";

const { Dragger } = Upload;

const TemplateBirthday = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const props = {
    name: "file",
    multiple: false,
    accept: ".jpg,.jpeg,.png",
    beforeUpload: (f) => {
      const isJpgOrPng = f.type === "image/jpeg" || f.type === "image/png";
      if (!isJpgOrPng) {
        message.error("Solo puedes subir imágenes JPG/PNG!");
        return Upload.LIST_IGNORE;
      }
      setLoading(true);
      setTimeout(() => {
        const url = URL.createObjectURL(f);
        setPreviewUrl(url);
        setFile(f);
        setLoading(false);
        message.success(`${f.name} cargada correctamente.`);
      }, 800);
      return false;
    },
    onRemove: () => {
      setFile(null);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
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
        <>
          <Form form={form} layout="inline">
            <Form.Item name="name">
              <Input placeholder="Nombre" />
            </Form.Item>

            <Form.Item name="day">
              <Input placeholder="Día" />
            </Form.Item>

            <Form.Item name="month">
              <Input placeholder="Mes" />
            </Form.Item>
          </Form>

          <Button
            type="primary"
            style={{
              marginTop: 14,
              borderRadius: 20,
              width: "160px",
              padding: 21,
            }}
          >
            <EyeFilled />
            Previsualizar
          </Button>
        </>
      )}
    </div>
  );
};

export default TemplateBirthday;
