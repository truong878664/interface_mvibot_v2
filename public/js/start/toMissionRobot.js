function toMissionRobot(mission) {
    const dataMission = `[${mission.wake_up ? mission.wake_up : ""}${
        mission.stop ? mission.stop : ""
    }*${mission.steps_mission ? mission.steps_mission : ""}]`;
    return dataMission;
}

export default toMissionRobot;
