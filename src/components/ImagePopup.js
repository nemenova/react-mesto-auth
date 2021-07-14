import React from 'react';


function ImagePopup(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.card ? ('popup_opened') : ''} `}>
            <div className="popup__container-photo">
                <button onClick={props.onClose} type="button" className="popup__close-btn btn-opacity-change">+</button>
                <img src={props.card.link} alt="картинка" className="popup__image" />
                <p className="popup__caption">{props.card.name}</p>
            </div>
        </div>
    )
}
export default ImagePopup;