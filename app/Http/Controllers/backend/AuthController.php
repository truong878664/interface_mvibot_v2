<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function check(Request $request)
    {
        try {
            //code...

            $validator = Validator::make($request->all(), [
                'name' => 'required|string',
                'password' => 'required|string',
            ]);

            if ($validator->fails()) {
                return  back()->with('fail', 'Enter your username and password');
            }

            if (!$token = auth('api')->attempt($validator->validated())) {
                return back()->with('fail', 'We do not recognize your username');
            }

            $timeLine =  $this->guard()->factory()->getTTL();
            $request->session()->put('token', $token);
            $request->session()->put('expires_in', $timeLine);
            $request->session()->put("UserName", auth('api')->user()->name);

            return redirect("/")->withCookies([
                cookie("token", $token, $timeLine),
                cookie("username", $request->input('name'), $timeLine)
            ]);
        } catch (\Throwable $th) {
            return redirect("/")->with("fail", "something wrong, try again");
        }
    }
    /**
     * Get the token array structure.
     *
     * @param  string $token
     * 
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token)
    {

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $this->guard()->factory()->getTTL() * 60,
            'user' => auth('api')->user()
        ]);
    }

    /**
     * Get the guard to be used during authentication.
     *
     * @return any
     */
    public function guard()
    {
        return Auth::guard();
    }
    public function logout(Request $request)
    {
        if ($request->cookie('token')) {
            return redirect('/login')->withCookies([cookie()->forget('token'), cookie()->forget('username')]);
        }

        if (session()->has('LoggedUser')) {
            session()->pull('LoggedUser');
            session()->pull('TypeUser');
            session()->pull('UserName');
            return redirect('/login');
        }
    }
}