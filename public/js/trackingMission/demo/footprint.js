import ros from "../../main.js";
import uniqueCode from "../uniqueCode.js";
export function footprint_makerclient(tfClient, viewer) {
    new ROS3D.MarkerClient({
        ros: ros,
        tfClient: tfClient,
        topic: `/visualization_marker_footprint_${uniqueCode}`,
        rootObject: viewer.scene,
    });
}
const footprint_makerclient_topic = new ROSLIB.Topic({
    ros: ros,
    name: `/visualization_marker_footprint_${uniqueCode}`,
    messageType: "visualization_msgs/Marker",
});
//
const footprint_status_topic = new ROSLIB.Topic({
    ros: ros,
    name: `/ABC/footprint`,
    messageType: "std_msgs/String",
});
footprint_status_topic.subscribe(function (message) {
    console.log(
        "Received message on " +
            footprint_status_topic.name.split("/") +
            ": " +
            message.data
    );
    const myArray = message.data.split("|");
    console.log(myArray);
    footprint_display(
        "ABC",
        Number(myArray[0]),
        Number(myArray[1]),
        Number(myArray[2]),
        Number(myArray[3])
    );
    //footprint_display("ABC",-0.67,0.67,-0.525,0.525);
});
//
const footprint_makerclient_msg = new ROSLIB.Message({
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
        r: 1,
        g: 0,
        b: 0,
        a: 0.9,
    },
    scale: {
        x: 1.0,
        y: 0.05,
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
export function footprint_display(name_robot, x1, x2, y1, y2) {
    console.log("AAA");
    var dis_x, dis_y;
    //
    dis_x = Math.sqrt((x2 - x1) * (x2 - x1));
    dis_y = Math.sqrt((y2 - y1) * (y2 - y1));
    //
    footprint_makerclient_msg.ns = name_robot + "_footprint";
    footprint_makerclient_msg.header.frame_id =
        "/" + name_robot + "/base_footprint";
    //
    footprint_makerclient_msg.type = 1;
    footprint_makerclient_msg.color = { r: 1, g: 0, b: 0, a: 0.9 };
    //
    footprint_makerclient_msg.id = 0;
    footprint_makerclient_msg.scale.x = dis_x;
    footprint_makerclient_msg.scale.y = 0.05;
    footprint_makerclient_msg.pose.position = { x: 0.0, y: y2, z: 0.05 };
    footprint_makerclient_msg.pose.orientation = { x: 0, y: 0, z: 0, w: 1 };
    // footprint_makerclient_topic.publish(footprint_makerclient_msg);
    // footprint_makerclient_topic.publish(footprint_makerclient_msg);
    footprint_makerclient_topic.publish(footprint_makerclient_msg);

    //
    footprint_makerclient_msg.id = 1;
    footprint_makerclient_msg.scale.x = dis_x;
    footprint_makerclient_msg.scale.y = 0.05;
    footprint_makerclient_msg.pose.position = { x: 0.0, y: y1, z: 0.05 };
    footprint_makerclient_msg.pose.orientation = { x: 0, y: 0, z: 0, w: 1 };
    footprint_makerclient_topic.publish(footprint_makerclient_msg);
    //
    footprint_makerclient_msg.id = 2;
    footprint_makerclient_msg.scale.x = dis_y;
    footprint_makerclient_msg.scale.y = 0.05;
    footprint_makerclient_msg.pose.position = { x: x2, y: 0.0, z: 0.05 };
    footprint_makerclient_msg.pose.orientation = {
        x: 0,
        y: 0,
        z: 0.7071068,
        w: 0.7071068,
    };
    footprint_makerclient_topic.publish(footprint_makerclient_msg);
    //
    footprint_makerclient_msg.id = 3;
    footprint_makerclient_msg.scale.x = dis_y;
    footprint_makerclient_msg.scale.y = 0.05;
    footprint_makerclient_msg.pose.position = { x: x1, y: 0.0, z: 0.05 };
    footprint_makerclient_msg.pose.orientation = {
        x: 0,
        y: 0,
        z: 0.7071068,
        w: 0.7071068,
    };
    footprint_makerclient_topic.publish(footprint_makerclient_msg);
    //
    footprint_makerclient_msg.color = { r: 0.5, g: 1.0, b: 0, a: 0.5 };
    footprint_makerclient_msg.id = 4;
    footprint_makerclient_msg.scale.x = dis_x;
    footprint_makerclient_msg.scale.y = dis_y;
    footprint_makerclient_msg.pose.position = { x: 0.0, y: 0.0, z: 0.05 };
    footprint_makerclient_msg.pose.orientation = { x: 0, y: 0, z: 0.0, w: 1.0 };
    footprint_makerclient_topic.publish(footprint_makerclient_msg);
}

export function footprint_delete() {}
