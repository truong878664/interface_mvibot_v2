<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        try {
            $token = str_replace('Bearer ', "", $request->cookie('token'));
            $isLogin = JWTAuth::setToken($token)->check();
            if ($isLogin) {
                return $next($request);
            } else {
                return redirect('login')->with('fail', 'You must be logged in');
            }
        } catch (\Throwable $th) {
            return redirect('login')->with('fail', 'You must be logged in');
        }
    }
}