<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use App\Models\Robot;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index() {
        $robots = Robot::all();
        return view('frontend.pages.home.home', compact('robots'));
    }
}
