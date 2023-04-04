export default function translateWS({ data, type }) {
    const out_set = data.out_set.length != 0 ? `~out_set=${data.out_set}~` : "";
    const out_reset =
        data.out_reset.length != 0 ? `~out_reset=${data.out_reset}~` : "";
    const in_on = data.in_on.length != 0 ? `~in_on=${data.in_on}~` : "";
    const in_off = data.in_off.length != 0 ? `~in_off=${data.in_off}~` : "";
    const in_pullup =
        data.in_pullup.length != 0 ? `~in_pullup=${data.in_pullup}~` : "";
    const in_pulldown =
        data.in_pulldown.length != 0 ? `~in_pulldown=${data.in_pulldown}~` : "";

    const name_seri = data.name_seri ? `~name_seri=${data.name_seri}~` : "";

    const isValid = !!(
        out_set ||
        out_reset ||
        in_on ||
        in_off ||
        in_pullup ||
        in_pulldown
    );

    const dataRobot = !isValid
        ? ""
        : `(name:${type}|time_out:-1|mode:${data.type}|data:${name_seri}${out_set}${out_reset}${in_on}${in_off}${in_pullup}${in_pulldown})`;

    return dataRobot;
}
