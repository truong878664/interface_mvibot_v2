<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use App\Models\backend\Robot as BackendRobot;
use Illuminate\Http\Request;

class gpioPageController extends Controller
{
    public function index()
    {

        $allRobot = BackendRobot::all();
        return view('frontend.pages.gpio.gpio', compact('allRobot'));
    }
}