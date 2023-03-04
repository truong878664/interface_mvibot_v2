<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use App\Models\backend\Robot as BackendRobot;
use Illuminate\Http\Request;

class BatteryController extends Controller
{
    public function index() {
        $allRobot = BackendRobot::all()->toArray();
        return view('frontend.pages.battery.battery' , compact('allRobot'));
    }
}
