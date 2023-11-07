import Node from "../../functionHandle/Node.js";

export default function deleteZone() {
    return Node("div").props({
        id: "delete-zone",
        dataset: { status: "" },
        className:
            "group w-8 z-1 aspect-square rounded-full bg-red-300 text-white absolute top-10 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all grid place-content-center data-[status='active']:w-16",
        children: [
            Node("i").props({
                className:
                    "fa-regular fa-trash-can group-data-[status='']:[animation-play-state:paused] fa-bounce",
            }),
        ],
    });
}
