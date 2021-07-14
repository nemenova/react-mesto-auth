import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [place, setPlace] = React.useState(" ");
  const [link, setLink] = React.useState(" ");

  React.useEffect(() => {
    setPlace("");
    setLink("");
  }, [props.isOpened]);

  function handleAddPlaceName(e) {
    setPlace(e.target.value);
  }
  function handleAddPlaceLink(e) {
    setLink(e.target.value);
  }

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: place,
      link,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleAddPlaceSubmit}
      name="add-card"
      title="Новое место"
      buttonName="Создать"
      isOpened={props.isOpened}
      onClose={props.onClose}
    >
      <fieldset className="form__input">
        <input
          id="place-name-input"
          name="place-name"
          placeholder="Название"
          type="text"
          minLength="2"
          maxLength="30"
          onChange={handleAddPlaceName}
          value={place}
          className="form__item form__item_el_place-name"
          required
        ></input>
        <span className="form__item-error place-name-input-error"></span>
        <input
          id="place-img-input"
          name="place-img"
          placeholder="Ссылка на картинку"
          type="url"
          onChange={handleAddPlaceLink}
          value={link}
          className="form__item form__item_el_place-img"
          required
        ></input>
        <span className="form__item-error place-img-input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
