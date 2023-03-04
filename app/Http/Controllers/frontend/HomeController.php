<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use App\Models\backend\Robot as BackendRobot;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index() {
        $robots = BackendRobot::all();
        return view('frontend.pages.home.home', compact('robots'));
    }
}
