<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use App\Models\Robot;
use Illuminate\Http\Request;

class BatteryController extends Controller
{
    public function index() {
        $allRobot = Robot::all()->toArray();
        return view('frontend.pages.battery.battery' , compact('allRobot'));
    }
}
