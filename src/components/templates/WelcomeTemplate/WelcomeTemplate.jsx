import { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './welcomeTemplate.css';
import welcomeTemplate from '/images/welcomeTemplate.png';
import {
  FORM_FIELDS,
  FILTER_STYLES,
  OPTION_IMAGES,
} from '../../../constants/formConstants';
const WelcomeTemplate = ({ previewUrl, formData, previewRef }) => {
  const [filterStyle, setFilterStyle] = useState("");
  const templateRef = useRef(null);
  const option = formData[FORM_FIELDS.OPTION];
  useEffect(() => {
    setFilterStyle(FILTER_STYLES[option] || FILTER_STYLES.DEFAULT);
  }, [option]);
  const getOptionImage = (opt) => OPTION_IMAGES[opt] || null;
  return (
    <div className="welcome-template" ref={previewRef}>
      <div
        className={` welcome-base-container ${option}`}
        style={{ filter: filterStyle }}
        ref={templateRef}
      >
        <img
          src={welcomeTemplate}
          alt="Plantilla de bienvenida"
          className="welcome-base"
        />
      </div>
      {previewUrl && (
        <img src={previewUrl} alt="Foto subida" className="welcome-photo" />
      )}
      <h2 className="welcome-text">{formData[FORM_FIELDS.NAME]}</h2>
      {option && (
        <img
          src={getOptionImage(option)}
          alt={`Opción: ${option}`}
          className="option-image"
        />
      )}
    </div>
  );
};
WelcomeTemplate.propTypes = {
  previewUrl: PropTypes.string,
  formData: PropTypes.object.isRequired,
  previewRef: PropTypes.object,
};
export default WelcomeTemplate;
