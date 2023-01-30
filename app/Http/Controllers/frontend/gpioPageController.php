<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class gpioPageController extends Controller
{
    public function index()
    {
        return view('frontend.pages.gpio.gpio');
    }
}