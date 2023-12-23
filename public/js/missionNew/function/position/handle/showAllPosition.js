import ros from "../../../main.js";
import mathYaw from "../../../rosModule/mathYaw.js";
import qToYaw from "../../../rosModule/qToYawn.js";
import { handleShowFormFunction } from "../../handleCreateFunction.js";
import createMapPosition from "./createPosition.js";
import { showListPosition } from "./point.js";

export default function showAllPosition() {
    $(".show-all-map-btn").onclick = (e) => {
        handleShowFormFunction(true, "position");
        showListPosition(true);

        const mapShowAll = new Promise((resolve, reject) => {
            const { viewer, tfClient } = createMapPosition();
            resolve({ viewer, tfClient });
        });
        mapShowAll.then(({ viewer, tfClient }) => {
            fetch("/api/position")
                .then((res) => res.json())
                .then((data) => {
                    const htmlListPoint = [];
                    data.map((position) => {
                        htmlListPoint.push(`
                        <li class="w-full flex items-center justify-between my-1 text-2xl">
                            <div class="">
                            <span class="mr-1">Name:</span>
                            <span class="font-bold text-blue-800">${position.name}</span>
                            </div>
                            <div class="ml-2 w-[20px] h-[20px] rounded-full" style="background-color: ${position.color_position};"></div>
                        </li>
                        `);
                        return htmlListPoint;
                    });
                    $("[data-list-position]").innerHTML =
                        htmlListPoint.join("");
                    console.log(1111);
                    return data;
                })
                .then((data) => {
                    const NUMBER_PUB = 5;
                    data.forEach((position) => {
                        for (let i = 0; i < NUMBER_PUB; i++) {
                            const yaw = qToYaw(position.z, position.w);
                            const { z, w } = mathYaw(
                                (Number(yaw) / 180) * Math.PI,
                            );

                            console.log(123);
                            // showPoint(
                            //     position.x,
                            //     position.y,
                            //     viewer,
                            //     tfClient,
                            //     `point_pub_${position.id}`
                            // );

                            // showPose(
                            //     position.x,
                            //     position.y,
                            //     z,
                            //     w,
                            //     viewer,
                            //     tfClient,
                            //     position.color_position,
                            //     `/pose_pub_${position.id}`
                            // );
                        }
                    });
                });
        });
    };

    function showPoint(x, y, viewer, tfClient, nameTopic = "/point_pub") {
        new ROS3D.Point({
            ros: ros,
            rootObject: viewer.scene,
            tfClient: tfClient,
            topic: nameTopic,
            color: "#FD841F",
            queue_size: 1,
            throttle_rate: 1000,
            radius: 0.1,
        });

        const point_pub = new ROSLIB.Topic({
            ros: ros,
            name: nameTopic,
            messageType: "geometry_msgs/PointStamped",
            queue_size: 0.1,
        });
        const point_msg = new ROSLIB.Message({
            header: {
                frame_id: "/map",
            },
            point: {
                x: x,
                y: y,
                z: 0,
            },
        });
        point_pub.publish(point_msg);
    }

    function showPose(
        x,
        y,
        z,
        w,
        viewer,
        tfClient,
        color,
        nameTopic = "/pose_pub",
    ) {
        new ROS3D.Pose({
            ros: ros,
            rootObject: viewer.scene,
            tfClient: tfClient,
            color: color,
            topic: nameTopic,
            headDiameter: 0.3,
            shaftDiameter: 0.1,
            length: 2,
        });

        const pose_pub = new ROSLIB.Topic({
            ros: ros,
            name: nameTopic,
            messageType: "geometry_msgs/PoseStamped",
            queue_size: 1,
        });
        const pose_msg = new ROSLIB.Message({
            header: {
                frame_id: "/map",
            },
            pose: {
                position: {
                    x: x,
                    y: y,
                    z: 0,
                },

                orientation: {
                    x: 0,
                    y: 0,
                    z: z,
                    w: w,
                },
            },
        });
        pose_pub.publish(pose_msg);
    }
}
