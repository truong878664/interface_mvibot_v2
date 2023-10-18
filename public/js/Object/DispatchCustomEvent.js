export default class DispatchCustomEvent {
    check = {
        press: { isPress: false, isMove: false },
        dbltouch: {},
    };
    constructor(event, element) {
        this.event = event;
        this.element = element;
        this[event]?.();
    }
    press() {
        const dataOffset = {
            start: {},
            stop: {},
        };

        /*Mouse*/
        this.element.addEventListener("mousedown", (e) => {
            this.check.press.isPress = true;
            dataOffset.start.offsetX = e.offsetX;
            dataOffset.start.offsetY = e.offsetY;
        });

        this.element.addEventListener("mouseup", (e) => {
            this.check.press.isPress = false;
            const isMouseLeft = e.which === 1;
            if (!isMouseLeft || !this.check.press.isMove) return;
            this.element.dispatchEvent(
                new CustomEvent("pressComplete", {
                    detail: { ...dataOffset },
                })
            );
            this.check.press.isMove = false;
        });

        this.element.addEventListener("mousemove", (e) => {
            const isMouseLeft = e.which === 1;
            if (!this.check.press.isPress || !isMouseLeft) return;
            this.check.press.isMove = true;
            dataOffset.stop.offsetX = e.offsetX;
            dataOffset.stop.offsetY = e.offsetY;
            this.element.dispatchEvent(
                new CustomEvent(this.event, {
                    detail: {
                        e,
                        clientX: e.clientX,
                        clientY: e.clientY,
                        ...dataOffset,
                    },
                })
            );
        });
        /*Touch*/
        const rect = this.element.getBoundingClientRect();
        this.element.addEventListener("touchstart", (e) => {
            dataOffset.start.offsetX = e.touches[0].pageX - rect.left;
            dataOffset.start.offsetY = e.touches[0].pageY - rect.top;
        });
        this.element.addEventListener("touchend", (e) => {
            this.element.dispatchEvent(
                new CustomEvent("pressComplete", {
                    detail: { ...dataOffset },
                })
            );
        });
        this.element.addEventListener("touchmove", (e) => {
            const touches = e.touches[0];
            const touchData = {
                clientX: touches.clientX,
                clientY: touches.clientY,
                force: touches.force,
                identifier: touches.identifier,
                pageX: touches.pageX,
                pageY: touches.pageY,
                radiusX: touches.radiusX,
                radiusY: touches.radiusY,
                rotationAngle: touches.rotationAngle,
                screenX: touches.screenX,
                screenY: touches.screenY,
                target: touches.target,
            };

            dataOffset.stop.offsetX = touches.pageX - rect.left;
            dataOffset.stop.offsetY = touches.pageY - rect.top;
            if (e.touches.length > 1) return;
            this.element.dispatchEvent(
                new CustomEvent("press", {
                    detail: {
                        ...touchData,
                        e,
                        ...dataOffset,
                    },
                })
            );
        });
    }
    dbltouch() {
        this.element.addEventListener("touchstart", this.handle.dbltouch);
    }

    handle = {
        press: (e) => {
            const isMouseLeft = e.which === 1;
            if (!this.check.press.isPress || !isMouseLeft) return;
            this.element.dispatchEvent(
                new CustomEvent(this.event, { detail: { ...e } })
            );
        },
        dbltouch: (e) => {
            const isDbltouch = (event) => {
                const MAX_TIME_BETWEEN_TWO_TOUCH = 300;
                const MAX_DISTANCE_BETWEEN_TWO_TOUCH = 20;

                const currentTime = new Date().getTime();
                const timeSinceLastTouch =
                    currentTime - this.check.dbltouch.lastTouchTime;

                if (event.touches.length >= 2) return;
                if (timeSinceLastTouch < MAX_TIME_BETWEEN_TWO_TOUCH) {
                    const touch = event.touches[0];
                    const touchX = touch.clientX;
                    const touchY = touch.clientY;
                    const distance = Math.sqrt(
                        Math.pow(touchX - this.check.dbltouch.lastTouchX, 2) +
                            Math.pow(touchY - this.check.dbltouch.lastTouchY, 2)
                    );

                    if (distance < MAX_DISTANCE_BETWEEN_TWO_TOUCH) {
                        this.check.dbltouch.lastTouchTime = 0;
                        return true;
                    } else {
                        this.check.dbltouch.lastTouchTime = currentTime;
                        this.check.dbltouch.lastTouchX = touchX;
                        this.check.dbltouch.lastTouchY = touchY;
                        return false;
                    }
                } else {
                    const touch = event.touches[0];
                    this.check.dbltouch.lastTouchTime = currentTime;
                    this.check.dbltouch.lastTouchX = touch.clientX;
                    this.check.dbltouch.lastTouchY = touch.clientY;
                    return false;
                }
            };

            if (!isDbltouch(e)) return;
            const rect = this.element.getBoundingClientRect();
            const offsetX = e.touches[0].pageX - rect.left;
            const offsetY = e.touches[0].pageY - rect.top;

            this.element.dispatchEvent(
                new CustomEvent(this.event, { detail: { e, offsetX, offsetY } })
            );
        },
    };
}
