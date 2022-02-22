function InfoTooltip() {
    return (
        <div className="popup popup_opened">
            <div className="popup__content">
                <button className="popup__close" type="button"></button>
                <div className="popup__icon popup__icon_type_error"></div>
                <p className="popup__text">Что-то пошло не так! Попробуйте ещё раз.</p>
            </div>
        </div>
    )
}

export default InfoTooltip;