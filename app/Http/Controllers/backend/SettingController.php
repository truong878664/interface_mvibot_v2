<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Models\Robot;
use App\Models\User;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function index()
    {
        $allRobot = Robot::all();
        $normalUser = User::where('type', 'user')->get();
        return view('frontend.pages.setting.setting', compact('allRobot', 'normalUser'));
    }
}