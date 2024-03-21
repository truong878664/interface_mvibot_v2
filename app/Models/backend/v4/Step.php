<?php

namespace App\Models\backend\v4;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Step extends Model
{
    use HasFactory;
    public function translate($step)
    {
        try {
            $infoStep = explode("#", $step);
            $type = $infoStep[0];
            $name = $infoStep[1];
            $id = $infoStep[2];

            if ($type === 'break') {
                return "(name:break|time_out:-1|mode:break|data:~~)";
            }

            $table = "mission_" . $type . "s";
            if ($table) {
                $dataFunction = DB::table($table)->where("id", $id)->first();
            }

            switch ($type) {
                case 'position':
                    $name_position = $dataFunction->name;
                    $time_out = $dataFunction->time_out;
                    $mode = $dataFunction->mode;
                    $non_avoid = $dataFunction->non_avoid;
                    $x_position = $dataFunction->x;
                    $y_position = $dataFunction->y;
                    $z_position = $dataFunction->z;
                    $w_position = $dataFunction->w;
                    $mode_position = $dataFunction->mode_position;

                    $dataNoneAvoid = $mode_position === "line_follow" ? ($non_avoid ?  "~non_avoid=1~" : "~non_avoid=0~") : "";
                    $dataTranslated = "(name:$name_position|time_out:$time_out|mode:$mode|data:~x=$x_position~~y=$y_position~~z=$z_position~~w=$w_position~~mode=$mode_position~$dataNoneAvoid)";

                    break;
                case 'sleep':
                    $name_sleep = $dataFunction->name;
                    $time_out = $dataFunction->time_out;
                    $mode = $dataFunction->mode;
                    $time_sleep = $dataFunction->time_sleep;
                    $dataTranslated =  "(name:$name_sleep|time_out:$time_out|mode:$mode|data:~time_sleep=$time_sleep~)";
                    break;
                case 'footprint':
                    $name_footprint = $dataFunction->name;
                    $time_out = $dataFunction->time_out;
                    $mode = $dataFunction->mode;
                    $x1 = $dataFunction->x1;
                    $x2 = $dataFunction->x2;
                    $y1 = $dataFunction->y1;
                    $y2 = $dataFunction->y2;
                    $dataTranslated =  "(name:$name_footprint|time_out:$time_out|mode:$mode|data:~x1=$x1~~y1=$y1~~x2=$x2~~y2=$y2~)";
                    break;
                case 'gpio':
                    $name_gpio = $dataFunction->name;
                    $time_out = $dataFunction->time_out;
                    $mode = $dataFunction->mode;
                    $not_set_out = $dataFunction->not_set_out ? $dataFunction->not_set_out : 0;
                    $data = "~not_set_out=$not_set_out~";
                    $attribute_list = ["out_set", "out_reset", "in_on", "in_off", "in_pullup", "in_pulldown"];
                    foreach ($attribute_list as $attribute) {
                        $value = $dataFunction->$attribute;
                        if (strlen($value)) {
                            $data .= "~$attribute=$value~";
                        }
                    }
                    $dataTranslated =  "(name:$name_gpio|time_out:$time_out|mode:$mode|data:$data)";
                    break;
                case 'gpio_module':
                    $name_function_gpio_module = $dataFunction->name;

                    $time_out = $dataFunction->time_out;
                    $mode = $dataFunction->mode;
                    $not_set_out = $dataFunction->not_set_out ? $dataFunction->not_set_out : 0;
                    $data = "~not_set_out=$not_set_out~~name_seri=$dataFunction->name_gpio_module~";
                    $attribute_list = ["out_set", "out_reset", "in_on", "in_off", "in_pullup", "in_pulldown"];
                    foreach ($attribute_list as $attribute) {
                        $value = $dataFunction->$attribute;
                        if (strlen($value)) {
                            $data .= "~$attribute=$value~";
                        }
                    }
                    $dataTranslated =  "(name:$name_function_gpio_module|time_out:$time_out|mode:$mode|data:$data)";
                    break;
                case 'marker':
                    $name_marker = $dataFunction->name;
                    $time_out = $dataFunction->time_out;
                    $mode = $dataFunction->mode;
                    $data = "";

                    $attribute_list = [
                        "marker_type", "marker_dir", "bar_distance", "off_set_x1", "off_set_x2", "off_set_y1", "off_set_y2", "off_set_dis", "off_set_angle", "sx1", "sx2", "sy1", "sy2",
                    ];

                    foreach ($attribute_list as $attribute) {
                        $value = $dataFunction->$attribute;
                        if (strlen($value)) {
                            $data .= "~$attribute=$value~";
                        }
                    }
                    $dataTranslated =  "(name:$name_marker|time_out:$time_out|mode:$mode|data:$data)";
                    break;
                case 'variable':
                    $name_function_variable = $dataFunction->name;
                    $time_out = $dataFunction->time_out;
                    $mode = $dataFunction->mode;
                    $command_action = $dataFunction->command_action;
                    $name_variable = $dataFunction->name_variable;
                    $focus_value = $dataFunction->focus_value;

                    if ($command_action === "new") {
                        $focus_value = 0;
                    }

                    $dataTranslated = "(name:$name_function_variable|time_out:$time_out|mode:$mode|data:~command_action=$command_action~~name_variable=$name_variable~~focus_value=$focus_value~)";
                    return $dataTranslated;
                    break;

                case 'sound':
                    $name_sound = $dataFunction->name;
                    $time_out = $dataFunction->time_out;
                    $mode = $dataFunction->mode;
                    $music_start = $dataFunction->music_start;
                    $music_mode = $dataFunction->music_mode;

                    $dataTranslated =  "(name:$name_sound|time_out:$time_out|mode:$mode|data:~music_start=$music_start~~music_mode=$music_mode~)";
                    break;
                case 'config':
                    $name_config = $dataFunction->name;
                    $time_out = $dataFunction->time_out;
                    $mode = $dataFunction->mode;
                    $data = "";
                    $attribute_list = ["footprint_padding", "max_vel_x", "min_vel_x", "acc_lim_x", "max_vel_theta", "acc_lim_theta", "inflation_radius"];

                    foreach ($attribute_list as $attribute) {
                        $value = $dataFunction->$attribute;
                        if (strlen($value)) {
                            $data .= "~$attribute=$value~";
                        }
                    }
                    $dataTranslated =  "(name:$name_config|time_out:$time_out|mode:$mode|data:$data)";
                    break;
                case 'telegram':
                    $name_telegram = $dataFunction->name;
                    $time_out = $dataFunction->time_out;
                    $mode = $dataFunction->mode;
                    $chat_id = $dataFunction->chat_id;
                    $token = $dataFunction->token;
                    $msg = $dataFunction->msg;

                    $dataTranslated = "(name:$name_telegram|time_out:$time_out|mode:$mode|data:~token=$token~~chat_id=$chat_id~~msg=$msg~)";
                    break;
            }
        } catch (\Throwable $th) {
            $dataTranslated = "";
        }

        return $dataTranslated;
    }
}
