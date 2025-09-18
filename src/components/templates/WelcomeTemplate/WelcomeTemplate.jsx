import PropTypes from 'prop-types'
import './welcomeTemplate.css'
import welcomeTemplate from '/images/welcomeTemplate.png'
import {
  FORM_FIELDS,
  OPTION_IMAGES,
} from '../../../constants/formConstants'
const WelcomeTemplate = ({ previewUrl, formData, previewRef }) => {
  const option = formData[FORM_FIELDS.OPTION]
  const getOptionImage = (opt) => OPTION_IMAGES[opt] || null
  return (
    <div className="welcome-template" ref={previewRef}>
      <div className={`welcome-base-container ${option || ''}`}>
        <img
          src={welcomeTemplate}
          alt="Plantilla de bienvenida"
          className="welcome-base"
        />
      </div>
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Foto subida"
          className="welcome-photo"
        />
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
  )
}
WelcomeTemplate.propTypes = {
  previewUrl: PropTypes.string,
  formData: PropTypes.object.isRequired,
  previewRef: PropTypes.object,
}
export default WelcomeTemplate
