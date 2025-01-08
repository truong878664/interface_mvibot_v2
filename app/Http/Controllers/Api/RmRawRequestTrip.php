<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\backend\RmFinishedProduct;
use App\Models\backend\RmRawRequest;
use App\Models\backend\RmTrip;
use App\Models\backend\RmTripLog;
use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Mockery\Undefined;

use function PHPSTORM_META\map;

class RmRawRequestTrip extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $rmTrip = new RmTrip();
        return [
            "data" => $rmTrip->processing_trips()->with(["rm_raw_requests", "rm_finished_products", "user"])->get()
        ];
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
        $rmTrip = new RmTrip();

        if ($rmTrip->processing_trips()->count() > 1) {
            return response()->json([
                "errors" => [[
                    "code" => 411,
                    "title" => "Chỉ được tối đa 2 yêu cầu.",
                    "detail" => "Qlsx cần xử lý xong 2 yêu cầu mới được tạo yêu cầu mới."
                ]]
            ], 411);
        }

        $user = auth("api")->user();
        $trip = $rmTrip->create(["user_id" => $user->id]);
        $finishedProducts  = $request["finishedProducts"];
        $rawMaterialRequest = $request["rawMaterialRequest"];

        foreach ($finishedProducts as $product) {
            RmFinishedProduct::create([
                "line" => $product["line"],
                "product_name" => $product["product_name"],
                "note" => $product["note"],
                "pcs" => $product["pcs"],
                "quality" => $product["quality"],
                "trip_id" => $trip["id"],
            ]);
        }
        foreach ($rawMaterialRequest as $raw) {
            RmRawRequest::create([
                "line" => $raw["line"],
                "product_name" => $raw["product_name"],
                "note" => $raw["note"],
                "pcs" => $raw["pcs"],
                "quality" => $raw["quality"],
                "trip_id" => $trip["id"],
            ]);
        }

        $data = $rmTrip->where("id", $trip["id"])->with(["rm_raw_requests", "rm_finished_products"])->get();
        return ["data" => $data];
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
        $currentTrip = RmTrip::where("id", $id);

        $data = $currentTrip->first();

        $currentTrip->update($request["data"]);

        foreach ($request["data"] as $key => $value) {
            if (isset($value)) {
                if ($data[$key] !== $value) {
                    RmTripLog::create([
                        "trip_id" => $data["id"],
                        "user_id" => $user["id"],
                        "action" => "update",
                        "key_change" => $key,
                        "from" => $data[$key],
                        "to" => $value
                    ]);
                }
            }
        }


        return $data;
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