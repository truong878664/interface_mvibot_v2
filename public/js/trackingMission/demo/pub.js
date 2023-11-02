import publishTopic from "../../rosModule/pubicTopic.js";

function pub() {
    let i = 0;

    setInterval(() => {
        i++;
        if (i < 5)
            publishTopic(
                "/MB23_916b/mission_action_infor",
                `/Status>Cancel//mission_action_infor>Normal//Normal_mission_infor:(name_mission:HS_0020)(id_mission:10)(total_step:12)(now_step:4)(infor_action_step:name:D_1.6_30s|time_out:30|mode:marker|data:~marker_type=none_marker_dis~~off_set_dis=1.6~~sx1=0.05~~sx2=0.15~~sy1=0.05~~sy2=0.25~)/`,
            );

        if (i < 7 && i >= 5) {
            publishTopic(
                "/MB23_916b/mission_action_infor",
                `/Status>Active//mission_action_infor>Normal//Normal_mission_infor:(name_mission:HS_0020)(id_mission:10)(total_step:12)(now_step:${i})(infor_action_step:name:D_1.6_30s|time_out:30|mode:marker|data:~marker_type=none_marker_dis~~off_set_dis=1.6~~sx1=0.05~~sx2=0.15~~sy1=0.05~~sy2=0.25~)/`,
            );
            console.log("active");
        }

        if (i < 9 && i >= 7) {
            publishTopic(
                "/MB23_916b/mission_action_infor",
                `/Status>Cancel//mission_action_infor>Normal//Normal_mission_infor:(name_mission:HS_0020)(id_mission:10)(total_step:12)(now_step:${i})(infor_action_step:name:D_1.6_30s|time_out:30|mode:marker|data:~marker_type=none_marker_dis~~off_set_dis=1.6~~sx1=0.05~~sx2=0.15~~sy1=0.05~~sy2=0.25~)/`,
            );
            console.log("cancel");
        }

        if (i < 13 && i >= 9) {
            publishTopic(
                "/MB23_916b/mission_action_infor",
                `/Status>Error//mission_action_infor>Normal//Normal_mission_infor:(name_mission:HS_0020)(id_mission:10)(total_step:12)(now_step:${i})(infor_action_step:name:D_1.6_30s|time_out:30|mode:marker|data:~marker_type=none_marker_dis~~off_set_dis=1.6~~sx1=0.05~~sx2=0.15~~sy1=0.05~~sy2=0.25~)/`,
            );
            console.log("error");
        }

        if (i >= 13) {
            publishTopic(
                "/MB23_916b/mission_action_infor",
                `/Status>Finish//mission_action_infor>Normal//Normal_mission_infor:/`,
            );
            console.log("finish");
            // return;
        }
        publishTopic(
            "/MB22_916b/local_variable",
            `(battery:9${i}.000000)(HS:${i + 1}.000000)(ER:${i + 6}.000000)`,
        );
        publishTopic(
            "/MB23_916b/local_variable",
            `(battery--:9${i}.000000)(HS--:${i + 1}.000000)(ER--:${
                i + 6
            }.000000)`,
        );
        publishTopic(
            "/MB22_916b/mission_memory",
            `/Normal_mission:HS_0010,HS_0011,HS_001${
                i + 4
            }//Battery_mission://Error_mission:Error/`,
        );
        publishTopic(
            "/MB23_916b/mission_memory",
            `/Normal_mission:HS_0010,HS_001${i},HS_0014//Battery_mission://Error_mission:Error/`,
        );

        if (i < 10) {
            publishTopic("/MB22_916b/footprint", `-0.67|0.67|-0.525|0.525`);
            publishTopic("/MB23_916b/footprint", `-0.67|0.67|-0.525|0.525`);
        } else {
            publishTopic("/MB22_916b/footprint", `-0.9|0.9|-1|1`);
            publishTopic("/MB23_916b/footprint", `-0.9|0.9|-1|1`);
            console.log("pub change");
        }
    }, 800);
}

export default pub;
