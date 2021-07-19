import React from 'react';
import icon__success from "../images/success.svg";
import icon__decline from "../images/decline.svg";

function InfoTooltip(props) {

    return (
        <div className={`popup popup_type_${props.name} ${props.isOpened ? ('popup_opened') : ''} `}>
            <div className="popup__container">
                <button onClick={props.onClose} type="button" className="popup__close-btn btn-opacity-change">+</button>
                <img src={props.status ? icon__success : icon__decline} alt="иконка" className="info-tooltip__status-icon"></img>
                <h2 className="info-tooltip__title">{props.status ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так!Попробуйте ещё раз.'}</h2>
                
            </div>
        </div>
    )
}
export default InfoTooltip;