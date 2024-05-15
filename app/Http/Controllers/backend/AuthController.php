<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

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
            if (Hash::check($request->password, $userInfo->password)) {
                $request->session()->put('LoggedUser', $userInfo->id);
                $request->session()->put('TypeUser', $userInfo->type);
                $request->session()->put('UserName', $userInfo->name);
                return redirect('/');
            } else {
                return back()->with('fail', 'incorrect password!');
            };
        }
    }
    // test
    public function logout()
    {
        if (session()->has('LoggedUser')) {
            session()->pull('LoggedUser');
            session()->pull('TypeUser');
            session()->pull('UserName');
            return redirect('/login');
        }
    }
}