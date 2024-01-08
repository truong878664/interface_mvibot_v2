import { MissionClass } from "../index.js";

export default function syncTypeMission(typeMission) {
    return new Promise((resolve, reject) => {
        const { id, type } = typeMission;
        const newType =
            type === "logicOr"
                ? "logic_or"
                : type === "logicAnd"
                ? "logic_and"
                : type;
        const typeMissionBLockUpdateList = document.querySelectorAll(
            `[data-block-wrapper='${newType}'][data-id='${id}']`,
        );

        const asyncSaveTypeMission = Promise.resolve();
        asyncSaveTypeMission
            .then(() => {
                Array.from(typeMissionBLockUpdateList).forEach((item) => {
                    const [address, indexStep] = MissionClass.getAddressByStep(
                        item.firstElementChild,
                    );
                    Promise.resolve([address, indexStep]).then(
                        ([address, indexStep]) => {
                            MissionClass.update({
                                address,
                                indexStep,
                                data: JSON.parse(JSON.stringify(typeMission)),
                            });
                        },
                    );
                });
            })
            .then(() => {
                return MissionClass._save();
            })
            .then((message) => {
                resolve(message);
            })
            .catch((error) => {
                reject(error);
            });
    });
}
