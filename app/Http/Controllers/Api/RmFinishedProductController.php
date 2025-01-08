<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\backend\RmFinishedProduct;
use App\Models\backend\RmTripLog;
use Illuminate\Http\Request;

class RmFinishedProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
    public function update(Request $request, $id)
    {
        $user = auth("api")->user();
        $currentFinished = RmFinishedProduct::where("id", $id);

        $data = $currentFinished->first();

        $currentFinished->update($request->all());

        foreach ($request->all() as $key => $value) {
            if (isset($value)) {
                if ($data[$key] !== $value) {
                    RmTripLog::create([
                        "finished_product_id" => $data["id"],
                        "user_id" => $user["id"],
                        "action" => "update",
                        "key_change" => $key,
                        "from" => $data[$key],
                        "to" => $value
                    ]);
                }
            }
        }
        return $request;
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