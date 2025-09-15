import html2canvas from "html2canvas";
import { message } from "antd";

export const downloadImage = async (elementRef, fileName) => {
  if (!elementRef.current) return;

  try {
    const canvas = await html2canvas(elementRef.current, {
      useCORS: true,
      backgroundColor: null,
    });
    const link = document.createElement("a");
    link.download = fileName;
    link.href = canvas.toDataURL("image/png");
    link.click();
    return true;
  } catch (error) {
    message.error("Error al descargar la imagen");
    console.error("Download error:", error);
    return false;
  }
};
