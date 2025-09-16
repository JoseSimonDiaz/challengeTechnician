import { useRef, useEffect, useState } from 'react';
import './welcomeTemplate.css';
import welcomeTemplate from '/images/welcomeTemplate.png';
import schoolImg from '/images/RCS.png';
import labsImg from '/images/RCLabs.png';
import studioImg from '/images/studio.png';
import { OPTIONS_AREAS, FORM_FIELDS } from '../../../constants/formConstants';  

const WelcomeTemplate = ({ previewUrl, formData, previewRef }) => {
  const [filterStyle, setFilterStyle] = useState("");
  const templateRef = useRef(null);
  const option = formData[FORM_FIELDS.OPTION];
  useEffect(() => {
    switch (option) {
      case OPTIONS_AREAS.ROLING:
        setFilterStyle("hue-rotate(0deg) brightness(100%)");
        break;
      case OPTIONS_AREAS.LABS:
        setFilterStyle("hue-rotate(220deg) brightness(100%)");
        break;
      case OPTIONS_AREAS.STUDIO:
        setFilterStyle("hue-rotate(40deg) brightness(100%)");
        break;
      default:
        setFilterStyle("");
    }
  }, [option]);
  const getOptionImage = (option) => {
    switch (option) {
      case OPTIONS_AREAS.SCHOOL:
        return schoolImg;
      case OPTIONS_AREAS.LABS:
        return labsImg;
      case OPTIONS_AREAS.STUDIO:
        return studioImg;
      default:
        return null;
    }
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
      <h2 className="welcome-text"> {formData[FORM_FIELDS.NAME]}!</h2>

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
