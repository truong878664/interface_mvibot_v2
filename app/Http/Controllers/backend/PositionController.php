<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PositionController extends Controller
{
    public function index()
    {
        return view('backend.homebackend');
    }
}
