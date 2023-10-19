import ros from "../../main.js";
import uniqueCode from "../uniqueCode.js";
export function path_makerclient(tfClient, viewer) {
    new ROS3D.MarkerClient({
        ros: ros,
        tfClient: tfClient,
        topic: `/visualization_marker_path_${uniqueCode}`,
        rootObject: viewer.scene,
    });
}
const path_makerclient_topic = new ROSLIB.Topic({
    ros: ros,
    name: `/visualization_marker_path_${uniqueCode}`,
    messageType: "visualization_msgs/Marker",
});
//
const path_status_topic = new ROSLIB.Topic({
    ros: ros,
    name: `/ABC/path`,
    messageType: "std_msgs/String",
});
path_status_topic.subscribe(function (message) {
    //
    console.log(
        "Received message on " +
            path_status_topic.name.split("/") +
            ": " +
            message.data
    );
    var myArray = [];
    var my_points = [];
    //
    if (message.data == "") myArray = [];
    else myArray = message.data.split("|");

    for (let i = 0; i < myArray.length; i = i + 2) {
        my_points.push({
            x: Number(myArray[i]),
            y: Number(myArray[i + 1]),
            z: 0.03,
        });
    }
    path_display("ABC", my_points);
    //
    // var test=[
    //     {x:0,y:-1,z:0.03},
    //     {x:0,y:-2,z:0.03},
    //     {x:0,y:-3,z:0.03},
    //     {x:0,y:-4,z:0.03},
    //     {x:0,y:-5,z:0.03},
    //     {x:0,y:-6,z:0.03},
    // ]
    // path_display("DDDDD",test);
});
//
var path_makerclient_msg = new ROSLIB.Message({
    header: {
        frame_id: "",
    },
    ns: "",
    id: 0,
    type: 0,
    action: 0,
    frame_locked: false,
    mesh_resource: "",
    mesh_use_embedded_materials: false,
    color: {
        r: 0,
        g: 0,
        b: 1,
        a: 0.9,
    },
    scale: {
        x: 0.3,
        y: 0.3,
        z: 0.05,
    },
    pose: {
        position: {
            x: 0.0,
            y: 0.0,
            z: 0.0,
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
export function path_display(name_robot, my_points) {
    path_makerclient_msg.ns = name_robot + "_path";
    path_makerclient_msg.header.frame_id = "/map";
    //
    if (my_points.length > 0) {
        path_makerclient_msg.type = 7;
        path_makerclient_msg.action = 0;
        path_makerclient_msg.color = { r: 0, g: 0, b: 1, a: 0.9 };
        //
        path_makerclient_msg.id = 0;
        path_makerclient_msg.scale.x = 0.3;
        path_makerclient_msg.scale.y = 0.3;
        path_makerclient_msg.scale.z = 0.02;
        //
        path_makerclient_msg.points = my_points;
    } else {
        path_makerclient_msg.type = 7;
        path_makerclient_msg.action = 3;
        path_makerclient_msg.points = [];
    }

    //
    path_makerclient_topic.publish(path_makerclient_msg);
}

export function path_delete() {}
