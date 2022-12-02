import connectRos from "./rosModule/connectRos.js";
import { ip } from "../ip.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const ros = connectRos(ip);

export { $, $$ };

export default ros;
