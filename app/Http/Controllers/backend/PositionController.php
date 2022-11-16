<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use App\Models\backend\MissionPosition;
use \Carbon\Carbon;

class PositionController extends Controller
{
    public function index()
    {
    }

    public function createPoint(Request $request)
    {
        $name_position = $request->name_position;
        $x = $request->x;
        $y = $request->y;
        $z = $request->z;
        $w = $request->w;
        $time_position = $request->time_position;
        $color_position = $request->color_position;
        $mode_position = $request->mode_position;
        $mode_child = $request->mode_child;
        $created_at = Carbon::now();

        $dataPosition = [
            "name_position" => $name_position,
            "x" => $x,
            "y" => $y,
            "z" => $z,
            "w" => $w,
            "time_position" => $time_position,
            "color_position" => $color_position,
            "mode_position" => $mode_position,
            "mode_child" => $mode_child,
            "created_at" => $created_at,
        ];

        MissionPosition::insert($dataPosition);

        return Redirect::back();
    }
}