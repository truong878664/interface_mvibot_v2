export default function disabledSendMission({ disabled }) {
    document.querySelector(".send-mission-btn-front").dataset.statusSend = disabled
        ? "disabled"
        : "";
}
