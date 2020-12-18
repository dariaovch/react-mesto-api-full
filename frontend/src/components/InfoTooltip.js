import React from 'react';

function InfoTooltip(props) {

    return (
        <div className={props.isOpen ? `popup popup_type_${props.name} popup_opened` : `popup popup_type_${props.name}`}>
            <div className="popup__container">
              <button className="popup__close-button" type="button" aria-label="close" onClick={props.onClose}></button>
              <div className="popup__container_status">
              <img className="popup__status-img" alt="status-icon" src={props.src} />
              <h2 className="popup__heading popup__heading_status">{props.title}</h2>
              </div>
            </div>
        </div>
    )
}

export default InfoTooltip;