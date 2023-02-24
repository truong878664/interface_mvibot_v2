<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class userController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $user =
            [
                'name' => $request->username,
                'password' => Hash::make($request->password)
            ];

        User::insert($user);
        return  ['message' => 'create user success', 'status' => 200];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $type)
    {

        switch ($type) {
            case 'logged':
                return ['data' => User::where('id', session('LoggedUser'))->first()];

            case 'normal-user':
                return User::where('type', 'user')->get();
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $type)
    {
        $userLogged = User::where('id', session('LoggedUser'))->first();
        // if ($type == "check") {
        //     if (Hash::check($request->password, $userLogged->password)) {

        //         $userLogged->update(['password' => Hash::make($request->new_password)]);
        //         return ['message' => 'Updated password', 'status' => 200];
        //     } else {
        //         return ['message' => 'incorrect password'];
        //     }
        // } else if ($type == 'update') {
        //     $userLogged->update(['name' => $request->username]);
        //     return ['message' => 'ok'];
        // }

        switch ($type) {
            case 'check':
                if (Hash::check($request->password, $userLogged->password)) {

                    $userLogged->update(['password' => Hash::make($request->new_password)]);
                    return ['message' => 'Updated password', 'status' => 200];
                } else {
                    return ['message' => 'incorrect password'];
                }

            case 'update':
                $userLogged->update(['name' => $request->username]);
                return ['message' => 'ok', 'status' => 200];
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
