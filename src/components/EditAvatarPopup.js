import React from 'react';
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    React.useEffect((e) => {
        avatarRef.current.value = ' '
    }, [props.isOpened]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }
    return (
        <PopupWithForm name="avatar" title="Обновить аватар" buttonName="Сохранить" isOpened={props.isOpened} 
        onSubmit={handleSubmit} onClose={props.onClose}>
            <fieldset className="form__input">
                <input ref={avatarRef} id="avatar-input" name="avatar" placeholder="Ссылка на картинку" type="url"
                    className="form__item form__item_el_avatar" required />
                <span className="form__item-error avatar-input-error"></span>
            </fieldset>
        </PopupWithForm>
    )
}
export default EditAvatarPopup;