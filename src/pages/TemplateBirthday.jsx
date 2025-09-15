// src/pages/TemplateBirthday.jsx
import React, { useState } from "react";
import {
  InboxOutlined,
  LoadingOutlined,
  EyeFilled,
  CloseOutlined,
} from "@ant-design/icons";
import { Upload, message, Form, Input, Button, Modal } from "antd";
import Template_Birthday from "../../public/images/template_birthday.png";

const { Dragger } = Upload;

const TemplateBirthday = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", day: "", month: "" });

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

  const handlePreview = () => {
    const values = form.getFieldsValue();
    setFormData(values);
    setIsModalOpen(true);
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
      {/* Subida de imagen */}
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

      {/* Inputs */}
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
            onClick={handlePreview}
          >
            <EyeFilled />
            Previsualizar
          </Button>
        </>
      )}

      <Modal
        open={isModalOpen}
        footer={null}
        closeIcon={<CloseOutlined />}
        onCancel={() => setIsModalOpen(false)}
        centered
        width={"fit-content"}
        bodyStyle={{ padding: 0 }}
      >
        <div
          style={{
            width: 1090,
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Plantilla de fondo */}
          <img
            src={Template_Birthday}
            alt="plantilla"
            style={{ width: "500px" }}
          />

          {/* Foto subida */}
          {previewUrl && (
            <img
              src={previewUrl}
              alt="foto subida"
              style={{
                position: "absolute",
                top: "54.1%", // ajusta según tu plantilla
                left: "58.4%",
                transform: "translateX(-50%)",
                width: "201px",
                height: "170px",
                objectFit: "cover",
              }}
            />
          )}

          {/* Bloque de código */}
          <pre
            style={{
              position: "absolute",
              top: "34%", // ajusta según tu plantilla
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

          {/* Fecha con estilos separados */}
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
            {/* Día */}
            <div
              style={{ fontSize: "42px", fontWeight: "bold",  }}
            >
              {formData.day || "__"}
            </div>

            {/* "de" */}
            <div
              style={{ fontSize: "16px", fontWeight: "400", }}
            >
              de
            </div>

            {/* Mes */}
            <div
              style={{ fontSize: "16px", fontWeight: "500", }}
            >
              {formData.month || "___"}
            </div>
          </div>
        </div>

        {/* Botón Descargar */}
        <div style={{ display: "flex", justifyContent: "end" }}>
            <Button
          type="primary"
          style={{
            borderRadius: 20,
            width: "160px",
            padding: 21,
            
          }}
        >
          <EyeFilled />
          Descargar
        </Button>
        </div>
      </Modal>
    </div>
  );
};

export default TemplateBirthday;
