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
    public function index(Request $request)
    {
        $user = auth("api")->user();
        $status =  $request->query("status");
        $page = (int)$request->query("page") ?? 1;
        $rmTrip = new RmTrip();

        if ($status === "processing") {
            $rmTripWhere = $rmTrip->processingTripsWithUnRecorded();
            if ($user->type === "qlsx") {
                $rmTripWhere->where("isRecorded", false);
            }
            // return $user;
        } else if ($status  === "history") {
            $rmTripWhere = $rmTrip->historicalTrips()->orderBy("updated_at", "desc");
        } else {
            return [];
        }

        $data =  $rmTripWhere->with([
            "rmRawRequests.logs.user",
            "rmFinishedProducts.logs.user",
            "user",
            "logs.user"
        ])->paginate(5, ["*"], "page", $page);

        return $data;
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
        $numberTripMax = config('services.app.number_trip_max');

        if ($rmTrip->processingTrips()->count() >= $numberTripMax) {
            return response()->json([
                "errors" => [[
                    "code" => 411,
                    "title" => "Chỉ được tối đa 3 yêu cầu.",
                    "detail" => "Qlsx cần xử lý xong 3 yêu cầu mới được tạo yêu cầu mới."
                ]]
            ], 411);
        }

        $user = auth("api")->user();

        $finishedProducts  = $request["finishedProducts"];
        $rawMaterialRequest = $request["rawMaterialRequest"];

        $dataTrip = ["userId" => $user->id];

        if (count($finishedProducts) === 0) {
            $dataTrip["finishedProductStatus"] = "confirmed";
        }
        if (count($rawMaterialRequest) === 0) {
            $dataTrip["rawMaterialStatus"] = "confirm";
        }
        $trip = $rmTrip->create($dataTrip);

        try {
            foreach ($finishedProducts as $product) {
                RmFinishedProduct::create([
                    "msnv" => $product["msnv"],
                    "productCode" => $product["productCode"],
                    "productName" => $product["productName"],
                    "comment" => $product["comment"],
                    "quantityOdd" => $product["quantityOdd"],
                    "quantity" => $product["quantity"],
                    "workShift" => $product["workShift"],
                    "tripId" => $trip["id"],
                ]);
            }
        } catch (\Throwable $th) {
            $dataTrip["finishedProductStatus"] = "confirmed";
        }

        try {
            foreach ($rawMaterialRequest as $raw) {
                RmRawRequest::create(
                    [
                        "msnv" => $raw["msnv"],
                        "productCode" => $raw["productCode"],
                        "productName" => $raw["productName"],
                        "comment" => $raw["comment"],
                        "quantityOdd" => $raw["quantityOdd"],
                        "quantity" => $raw["quantity"],
                        "workShift" => $raw["workShift"],
                        "tripId" => $trip["id"],
                    ]
                );
            }
        } catch (\Throwable $th) {
            $dataTrip["rawMaterialStatus"] = "confirm";
        }
        $data = $rmTrip->where("id", $trip["id"])->with(["rmRawRequests", "rmFinishedProducts"])->get();
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
                        "tripId" => $data["id"],
                        "userId" => $user["id"],
                        "action" => "update",
                        "keyChange" => $key,
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