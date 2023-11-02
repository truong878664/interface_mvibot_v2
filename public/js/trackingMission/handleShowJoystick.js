function handleShowJoystick() {
    document.querySelector("#show-joystick").onchange = (e) => {
        localStorage.setItem("show-joystick", e.target.checked);
    };
}

export default handleShowJoystick;
