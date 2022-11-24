<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class AuthController extends Controller
{
    public function check(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'password' => 'required'
        ]);
        $userInfo = User::where('name', $request->username)->first();
        if (!$userInfo) {
            return back()->with('fail', 'We do not recognize your username');
        } else {
            if ($userInfo->password == $request->password) {
                $request->session()->put('LoggedUser', $userInfo->name);
                return redirect('/');
            } else {
                return back()->with('fail', 'incorrect password');
            };
        }
    }

    public function logout()
    {
        if (session()->has('LoggedUser')) {
            session()->pull('LoggedUser');
            return redirect('/login');
        }
    }
}