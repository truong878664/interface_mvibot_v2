export default function setColorSticker(type) {
    let color;
    switch (type) {
        case "basic":
            color = "--color: rgb(56 189 248);";
            break;
        case "buzzer1":
            color = "--color: rgb(248 113 113);";
            break;
        case "buzzer2":
            color = "--color: rgb(248 113 113);";
            break;
        case "custom":
            color = "--color: rgb(250 204 21);";
            break;
    }
    $(".sound-start-btn").setAttribute("style", color);
}