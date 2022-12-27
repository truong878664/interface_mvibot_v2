import ros from "../../main.js";
import { mvibot_position, mvibot_color, mvibot_scale } from "../classMvibot.js";

export function markerClientPath(tfClient, viewer) {
    new ROS3D.MarkerClient({
        ros: ros,
        tfClient: tfClient,
        topic: "/visualization_marker_path",
        rootObject: viewer.scene,
    });
}

// export function displayPath() {
//     const markerClient_path_topic = new ROSLIB.Topic({
//         ros: ros,
//         name: "/visualization_marker_path",
//         messageType: "visualization_msgs/Marker",
//     });
//     const markerClient_path_msg = new ROSLIB.Message({
//         header: {
//             frame_id: "/map",
//         },
//         ns: "path",
//         id: 0,
//         type: 6,
//         action: 0,
//         frame_locked: false,
//         mesh_resource: "",
//         mesh_use_embedded_materials: false,
//         color: {
//             r: 0,
//             g: 0,
//             b: 0,
//             a: 0.8,
//         },
//         scale: {
//             x: 0.0,
//             y: 0.0,
//             z: 0.0,
//         },
//         pose: {
//             position: {
//                 x: 0.0,
//                 y: 0.0,
//                 z: 0.01,
//             },
//             orientation: {
//                 x: 0.0,
//                 y: 0.0,
//                 z: 0.0,
//                 w: 1.0,
//             },
//         },
//         points: [],
//     });
//     var points_path = [];
//     let j = 0;
//     for (let i = 0; i < 10; i = i + 0.3) {
//         points_path[j] = new mvibot_position(-0.1 * i * i - i + 1, i, 0.02);
//         j++;
//     }
//     markerClient_path_msg.action = 0;
//     markerClient_path_msg.id = 0;
//     markerClient_path_msg.type = 7;
//     markerClient_path_msg.color = new mvibot_color(1, 1, 0, 0.8);
//     markerClient_path_msg.scale = new mvibot_scale(0.25, 0.25, 0.01);
//     markerClient_path_msg.points = points_path;
//     markerClient_path_topic.publish(markerClient_path_msg);
// }

// function deletePath() {
//     markerClient_path_msg.action = 3;
//     markerClient_path_msg.id = 0;
//     markerClient_path_msg.type = 7;
//     markerClient_path_msg.color = new mvibot_color(0.0, 1.0, 0, 0.8);
//     markerClient_path_msg.scale = new mvibot_scale(0.0001, 0.0001, 0.0001);
//     markerClient_path_msg.points = [];
//     markerClient_path_topic.publish(markerClient_path_msg);
// }

let robot_path_enable = false;
let robot_path_msg;

const markerClient_path_topic = new ROSLIB.Topic({
    ros: ros,
    name: "/visualization_marker_path",
    messageType: "visualization_msgs/Marker",
});

const markerClient_path_msg = new ROSLIB.Message({
    header: {
        frame_id: `map`,
    },
    ns: "path",
    id: 0,
    type: 6,
    action: 0,
    frame_locked: false,
    mesh_resource: "",
    mesh_use_embedded_materials: false,
    color: {
        r: 0,
        g: 0,
        b: 0,
        a: 0,
    },
    scale: {
        x: 0.0,
        y: 0.0,
        z: 0.0,
    },
    pose: {
        position: {
            x: 0.0,
            y: 0.0,
            z: 0.01,
        },
        orientation: {
            x: 0.0,
            y: 0.0,
            z: 0.0,
            w: 1.0,
        },
    },
    points: [],
});

export function displayPath(nameRobot) {
    markerClient_path_msg.header.frame_id = `map`;
    console.log(markerClient_path_msg);
    if (robot_path_enable) {
        var points_path = [];
        for (let i = 0; i < robot_path_msg.poses.length; i = i + 1) {
            robot_path_msg.poses[i].pose.position.z = 0.05;
            if (i == 0) points_path[0] = robot_path_msg.poses[0].pose.position;
            else {
                var dis_x, dis_y, dis;
                dis_x =
                    robot_path_msg.poses[i].pose.position.x -
                    points_path[points_path.length - 1].x;
                dis_y =
                    robot_path_msg.poses[i].pose.position.y -
                    points_path[points_path.length - 1].y;
                dis = Math.sqrt(dis_x * dis_x + dis_y * dis_y);
                if (dis >= 0.25) {
                    points_path[points_path.length] =
                        robot_path_msg.poses[i].pose.position;
                }
            }
        }
        //
        markerClient_path_msg.action = 0;
        markerClient_path_msg.id = 0;
        markerClient_path_msg.type = 7;
        markerClient_path_msg.color = new mvibot_color(0.0, 0, 1.0, 0.4);
        markerClient_path_msg.scale = new mvibot_scale(0.2, 0.2, 0.01);
        markerClient_path_msg.points = points_path;
        markerClient_path_topic.publish(markerClient_path_msg);
        robot_path_enable = false;
    }
}

export function deletePath(nameRobot) {
    markerClient_path_msg.header.frame_id = `map`;
    markerClient_path_msg.action = 3;
    markerClient_path_msg.id = 0;
    markerClient_path_msg.type = 7;
    markerClient_path_msg.color = new mvibot_color(0.0, 1.0, 0, 0.8);
    markerClient_path_msg.scale = new mvibot_scale(0.0001, 0.0001, 0.0001);
    markerClient_path_msg.points = [];
    markerClient_path_topic.publish(markerClient_path_msg);
}

export function robotPathTopic(nameRobot) {
    const robot_path_topic = new ROSLIB.Topic({
        ros: ros,
        name: `/${nameRobot}/move_base_flex/NavfnROS/plan`,
        messageType: "nav_msgs/Path",
        queue_size: 1,
    });
    robot_path_topic.subscribe(function (message) {
        robot_path_msg = message;
        robot_path_enable = true;
    });
}
