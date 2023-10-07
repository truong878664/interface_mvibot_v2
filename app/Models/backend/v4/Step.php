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
                    $x_position = $dataFunction->x;
                    $y_position = $dataFunction->y;
                    $z_position = $dataFunction->z;
                    $w_position = $dataFunction->w;
                    $mode_position = $dataFunction->mode_position;
                    $dataTranslated = "(name:$name_position|time_out:$time_out|mode:$mode|data:~x=$x_position~~y=$y_position~~z=$z_position~~w=$w_position~~mode=$mode_position~)";

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
                    $out_set = $dataFunction->out_set;
                    $out_reset = $dataFunction->out_reset;
                    $in_on = $dataFunction->in_on;
                    $in_off = $dataFunction->in_off;
                    $in_pullup = $dataFunction->in_pullup;
                    $in_pulldown = $dataFunction->in_pulldown;
                    $not_set_out = $dataFunction->not_set_out ? $dataFunction->not_set_out : 0;

                    strlen($out_set) ? $data_out_set = "~out_set=$out_set~" : $data_out_set = "";
                    strlen($out_reset) ? $data_out_reset = "~out_reset=$out_reset~" : $data_out_reset = "";
                    strlen($in_on) ? $data_in_on = "~in_on=$in_on~" : $data_in_on = "";
                    strlen($in_off) ? $data_in_off = "~in_off=$in_off~" : $data_in_off = "";
                    strlen($in_pullup) ? $data_in_pullup = "~in_pullup=$in_pullup~" : $data_in_pullup = "";
                    strlen($in_pulldown) ? $data_in_pulldown = "~in_pulldown=$in_pulldown~" : $data_in_pulldown = "";
                    $data_not_set_out = "~not_set_out=$not_set_out~";
                    $dataTranslated =  "(name:$name_gpio|time_out:$time_out|mode:$mode|data:$data_not_set_out$data_out_set$data_out_reset$data_in_on$data_in_off$data_in_pullup$data_in_pulldown)";
                    break;
                case 'gpio_module':
                    $name_function_gpio_module = $dataFunction->name;

                    $time_out = $dataFunction->time_out;
                    $mode = $dataFunction->mode;
                    $out_set = $dataFunction->out_set;
                    $out_reset = $dataFunction->out_reset;
                    $in_on = $dataFunction->in_on;
                    $in_off = $dataFunction->in_off;
                    $in_pullup = $dataFunction->in_pullup;
                    $in_pulldown = $dataFunction->in_pulldown;
                    $not_set_out = $dataFunction->not_set_out ? $dataFunction->not_set_out : 0;

                    $name_seri = "~name_seri=$dataFunction->name_gpio_module~";

                    strlen($out_set) ? $data_out_set = "~out_set=$out_set~" : $data_out_set = "";
                    strlen($out_reset) ? $data_out_reset = "~out_reset=$out_reset~" : $data_out_reset = "";
                    strlen($in_on) ? $data_in_on = "~in_on=$in_on~" : $data_in_on = "";
                    strlen($in_off) ? $data_in_off = "~in_off=$in_off~" : $data_in_off = "";
                    strlen($in_pullup) ? $data_in_pullup = "~in_pullup=$in_pullup~" : $data_in_pullup = "";
                    strlen($in_pulldown) ? $data_in_pulldown = "~in_pulldown=$in_pulldown~" : $data_in_pulldown = "";
                    $data_not_set_out = "~not_set_out=$not_set_out~";

                    $dataTranslated =  "(name:$name_function_gpio_module|time_out:$time_out|mode:$mode|data:$name_seri$data_not_set_out$data_out_set$data_out_reset$data_in_on$data_in_off$data_in_pullup$data_in_pulldown)";
                    break;
                case 'marker':
                    $name_marker = $dataFunction->name;
                    $time_out = $dataFunction->time_out;
                    $mode = $dataFunction->mode;
                    $marker_type = $dataFunction->marker_type;
                    $marker_dir = $dataFunction->marker_dir;
                    $off_set_x1 = $dataFunction->off_set_x1;
                    $off_set_x2 = $dataFunction->off_set_x2;
                    $off_set_y1 = $dataFunction->off_set_y1;
                    $off_set_y2 = $dataFunction->off_set_y2;
                    $off_set_dis = $dataFunction->off_set_dis;
                    $off_set_angle = $dataFunction->off_set_angle;
                    $sx1 = $dataFunction->sx1;
                    $sx2 = $dataFunction->sx2;
                    $sy1 = $dataFunction->sy1;
                    $sy2 = $dataFunction->sy2;

                    strlen($marker_dir) ? $data_marker_dir = "~marker_dir=$marker_dir~" : $data_marker_dir = "";
                    strlen($off_set_x1) ? $data_off_set_x1 = "~off_set_x1=$off_set_x1~" : $data_off_set_x1 = "";
                    strlen($off_set_x2) ? $data_off_set_x2 = "~off_set_x2=$off_set_x2~" : $data_off_set_x2 = "";
                    strlen($off_set_y1) ? $data_off_set_y1 = "~off_set_y1=$off_set_y1~" : $data_off_set_y1 = "";
                    strlen($off_set_y2) ? $data_off_set_y2 = "~off_set_y2=$off_set_y2~" : $data_off_set_y2 = "";
                    strlen($off_set_dis) ? $data_off_set_dis = "~off_set_dis=$off_set_dis~" : $data_off_set_dis = "";
                    strlen($off_set_angle) ? $data_off_set_angle = "~off_set_angle=$off_set_angle~" : $data_off_set_angle = "";
                    strlen($sx1) ? $data_sx1 = "~sx1=$sx1~" : $data_sx1 = "";
                    strlen($sx2) ? $data_sx2 = "~sx2=$sx2~" : $data_sx2 = "";
                    strlen($sy1) ? $data_sy1 = "~sy1=$sy1~" : $data_sy1 = "";
                    strlen($sy2) ? $data_sy2 = "~sy2=$sy2~" : $data_sy2 = "";

                    $dataTranslated =  "(name:$name_marker|time_out:$time_out|mode:$mode|data:~marker_type=$marker_type~$data_marker_dir$data_off_set_x1$data_off_set_x2$data_off_set_y1$data_off_set_y2$data_off_set_dis$data_off_set_angle$data_sx1$data_sx2$data_sy1$data_sy2)";
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
            }
        } catch (\Throwable $th) {
            $dataTranslated = "";
        }

        return $dataTranslated;
    }
}
