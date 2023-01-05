cd /home/mvibot/Truong/project/interface_mvibot_v2
php artisan serve

roslaunch rosbridge_server rosbridge_websocket.launch

rosrun tf2_web_republisher tf2_web_republisher

cd maps
rosrun map_server map_server map30.yaml
