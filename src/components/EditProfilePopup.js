import React from 'react';
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const [name, setName] = React.useState(' ');
    const [description, setDescription] = React.useState(' ');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpened]);

    function handleChangeName(e) {
        setName(e.target.value);
    }
    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    }
    return (
        <PopupWithForm onSubmit={handleSubmit} name="edit" title="Редактировать профиль" 
        buttonName="Сохранить" isOpened={props.isOpened} onClose={props.onClose}>
            <fieldset className="form__input">
                <input id="name-input" name="name" placeholder="Имя" type="text" minLength="2" maxLength="40" 
                value={name || ' '} onChange={handleChangeName}
                    className="form__item form__item_el_name" required></input>
                <span className="form__item-error name-input-error"></span>
                <input id="about-input" name="occupation" placeholder="Род занятий" type="text" minLength="2" maxLength="200" 
                value={description || ' '} onChange={handleChangeDescription}
                    className="form__item form__item_el_about" required></input>
                <span className="form__item-error about-input-error"></span>
            </fieldset>
        </PopupWithForm>
    )
}
export default EditProfilePopup;