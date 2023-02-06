import { $, $$ } from "./main.js";
// export default function route() {
//     // link("/dashboard", ".dashboard");
//     // link("/", ".home");
// }

function link(link, element) {
    $(element).onclick = (e) => {
        console.log(1)
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function () {
            $("body").innerHTML = this.responseText;
        };
        xhttp.open("GET", link, true);
        xhttp.send();
    };
}
