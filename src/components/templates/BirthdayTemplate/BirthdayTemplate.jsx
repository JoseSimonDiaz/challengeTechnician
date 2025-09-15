import React from 'react';
import Template_Birthday from '../../../../public/images/template_birthday.png';
import './birthdayTemplate.css';

const BirthdayTemplate = ({ previewUrl, formData, previewRef }) => {
  return (
    <div ref={previewRef} className="birthday-template">
      <img
        src={Template_Birthday}
        alt="plantilla cumpleaños"
        className="template-background"
      />

      {previewUrl && (
        <img src={previewUrl} alt="foto subida" className="user-photo" />
      )}

      <pre className="code-snippet">
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

      <div className="date-container">
        <div className="day">{formData.day || "__"}</div>
        <div className="de-text">de</div>
        <div className="month">{formData.month || "___"}</div>
      </div>
    </div>
  );
};

export default BirthdayTemplate;
