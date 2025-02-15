<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\backend\RmFinishedProduct;
use App\Models\backend\RmRawRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RmRawRequestHistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = $request->query();
        $filter = $query["filter"];
        $type = $query["type"];

        $model = null;

        if ($type === "finishedProduct") {
            $model = RmFinishedProduct::withWhereHas("rm_trip", function ($query) {
                $query->where("isRecorded", true);
            });
        } elseif ($type  === "rawRequest") {
            $model = RmRawRequest::withWhereHas("rm_trip", function ($query) {
                $query->where("isRecorded", true)->where("rawMaterialStatus", "!=", "cancel");
            });
        } else return ["data" => []];

        $data = $model
            ->where("created_at", "<=", $filter["created_at"]["lte"])
            ->where("created_at", ">=", $filter["created_at"]["gte"])
            ->get();

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
        //
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