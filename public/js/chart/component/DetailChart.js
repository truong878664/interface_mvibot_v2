import { Html, secondToTime } from "../../../lib/ultils.js";
import { parseDate } from "../../lib/ultils.js";
/**
 *
 * @param {{data: object[], type: "short-error" | "trip"}} dataDetail
 * @returns {void}
 */
const DetailChart = (dataDetail) => {
    const container = Html("div").props({
        className:
            "z-100 fixed top-o left-0 h-full w-full bg-black/20 grid place-content-center",
        children: [
            Html("div").props({
                className:
                    "bg-white relative py-2 pl-2 rounded-md max-w-[90%] mx-auto",
                children: [
                    Html("button").props({
                        className:
                            "bg-white absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 rounded-full w-8 h-8 grid place-content-center ",
                        children: [
                            Html("i").props({ className: "fa-solid fa-xmark" }),
                        ],
                        onClick: () => {
                            container.remove();
                        },
                    }),
                    Html("ul").props({
                        className: "max-h-[500px] overflow-auto",
                        children: [
                            ...dataDetail?.data.map((item, index) => {
                                const keyDataDetail = {
                                    "short-error": ["continue", "error"],
                                    trip: ["finish", "start"],
                                };
                                const [firstKey, secondKey] =
                                    keyDataDetail[dataDetail.type];
                                const { hour, minute, second } = secondToTime(
                                    (parseDate(item[firstKey].time).getTime() -
                                        parseDate(
                                            item[secondKey].time,
                                        ).getTime()) /
                                        1000,
                                );
                                return Html("li").props({
                                    className: "py-2 border-b flex gap-2",
                                    children: [
                                        Html("span").props({
                                            children: index + 1,
                                            className: "w-4",
                                        }),
                                        Html("span").props({
                                            children: `
                                                <div><span class="font-bold">Detail ${
                                                    dataDetail.type
                                                }: </span><span class="break-all">${
                                                    item[
                                                        dataDetail.type ===
                                                        "trip"
                                                            ? firstKey
                                                            : secondKey
                                                    ].data
                                                }</span></div>
                                                <div><span class="font-bold">from</span> ${
                                                    item[firstKey].time
                                                } <span class="font-bold">to</span> ${
                                                    item[secondKey].time
                                                }</div>
                                                <div><span class="font-bold">Processing Time: </span>${hour}h ${minute}m ${second}s</div>`,
                                        }),
                                    ],
                                });
                            }),
                        ],
                    }),
                ],
            }),
        ],
    });
    return container;
};
export default DetailChart;
