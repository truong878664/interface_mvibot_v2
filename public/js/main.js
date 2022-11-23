import connectRos from "./rosModule/connectRos.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const ros = connectRos();

export { $, $$ };

export default ros;
