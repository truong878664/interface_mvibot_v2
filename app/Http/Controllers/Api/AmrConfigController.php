<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\backend\AmrConfig;
use Illuminate\Http\Request;

class AmrConfigController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = AmrConfig::where("name_seri", $request->query("name_seri"))->first();
        return ["data" => $data];
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
        try {
            $name_seri = $request->input("name_seri");
            $password = $request->input("password");

            $where = AmrConfig::where("name_seri", $name_seri);
            // return $where->count() === 1;
            if ($where->count() === 1) {
                $where->update(["password" => $password]);
                return ["data" => $where->first()];
            } else {
                $data = AmrConfig::create(["name_seri" => $name_seri, "password" => $password]);
                return ["data" => $data];
            }
        } catch (\Throwable $th) {
            return ["errors" => [
                [
                    "message" => "Duplicated record",
                    "detail" => $th->getMessage(),
                    "status" => 500
                ]
            ]];
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return 12311;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return "edit";
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $password = $request->password;
            $AmrConfig = AmrConfig::where("id", $id)->update(["password" => $password]);

            if ($AmrConfig) {
                return ["data" => [
                    "id" => $id,
                    "password" => $password
                ]];
            } else {
                throw "error";
            }
        } catch (\Throwable $th) {
            return  ["errors" => [
                "message" => "Interval errors",
                "status" => 500,
                "detail" => $th->getMessage()
            ]];
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


    public function check(Request $req, $name_seri)
    {
        $password = $req->password;

        $count = AmrConfig::where("name_seri", $name_seri)->where("password", $password)->count();
        return [
            "ok" => $count === 1,
        ];
    }
}