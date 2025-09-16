import PropTypes from 'prop-types';
import TemplateBirthday from '/images/template_birthday.png';
import './birthdayTemplate.css';

const BirthdayTemplate = ({ previewUrl, formData, previewRef }) => {
  return (
    <div ref={previewRef} className="birthday-template">
      <img
        src={TemplateBirthday}
        alt="Plantilla de cumpleaños"
        className="template-background"
      />
      {previewUrl && (
        <img src={previewUrl} alt="Foto subida" className="user-photo" />
      )}
      <pre className="code-snippet">
        {`var i = 0, age = getAge();
while(true) {
  if (i === age) {
    alert('¡Feliz Cumple ${formData.name || "___"}!');
  } else {
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
BirthdayTemplate.propTypes = {
  previewUrl: PropTypes.string,
  formData: PropTypes.object.isRequired,
  previewRef: PropTypes.object,
};

export default BirthdayTemplate;
