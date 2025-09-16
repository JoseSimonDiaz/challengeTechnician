import { useRef, useEffect, useState } from 'react';
import './welcomeTemplate.css';
import welcomeTemplate from '/images/welcomeTemplate.png';
import { 
  OPTIONS_AREAS, 
  FORM_FIELDS, 
  FILTER_STYLES, 
  OPTION_IMAGES 
} from '../../../constants/formConstants';

const WelcomeTemplate = ({ previewUrl, formData, previewRef }) => {
  const [filterStyle, setFilterStyle] = useState("");
  const templateRef = useRef(null);
  const option = formData[FORM_FIELDS.OPTION];

  useEffect(() => {
    const style = FILTER_STYLES[option] || FILTER_STYLES.DEFAULT;
    setFilterStyle(style);
  }, [option]);

  const getOptionImage = (option) => {
    return OPTION_IMAGES[option] || null;
  };

  return (
    <div className="welcome-template" ref={previewRef}>
      <div
        className="welcome-base-container"
        style={{ filter: filterStyle }}
        ref={templateRef}
      >
        <img
          src={welcomeTemplate}
          alt="Plantilla base"
          className="welcome-base"
        />
      </div>
      
      {previewUrl && (
        <img src={previewUrl} alt="uploaded" className="welcome-photo" />
      )}
      
      <h2 className="welcome-text">{formData[FORM_FIELDS.NAME]}!</h2>

      {formData[FORM_FIELDS.OPTION] && (
        <img
          src={getOptionImage(formData[FORM_FIELDS.OPTION])}
          alt={formData[FORM_FIELDS.OPTION]}
          className="option-image"
        />
      )}
    </div>
  );
};

export default WelcomeTemplate;