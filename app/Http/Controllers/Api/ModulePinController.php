<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\backend\Line;
use App\Models\backend\ModulePinMaterial;
use App\Models\backend\RmFinishedProduct;
use App\Models\backend\RmRawRequest;
use App\Models\backend\RmTrip;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;

class ModulePinController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = ModulePinMaterial::all()->groupBy("when");
        $line = Line::all();
        $userId = $request->userId;
        $productCode = $request->productCode;
        $currentTripId = $request->currentTripId;
        $rmTrip = new RmTrip();
        if ($request->when) {
            if ($userId) {
                $processingTripCount = $rmTrip->processingTrips()->count();
                if ($processingTripCount === 1) {
                    $data = $this->getModuleWhenRequest($userId, $productCode);
                }
            } else {
                $rmTripQueryProcessingTrips = $rmTrip->processingTrips()->where("id", "!=", $currentTripId);
                $result = [];
                if ($rmTripQueryProcessingTrips->count() >= 1) {
                    if ($request->when === "cancel" || $request->when === "done") {
                        $rmTripProcessingTrips = $rmTripQueryProcessingTrips->first();
                        $tripId = $rmTripProcessingTrips->id;
                        $userId = $rmTripProcessingTrips->userId;

                        $finishedProduct = RmFinishedProduct::where("tripId", $tripId)->first();

                        if ($finishedProduct) {
                            $productCode = $finishedProduct->productCode;
                        } else {
                            $rawRequest = RmRawRequest::where("tripId", $tripId)->first();
                            $productCode = $rawRequest->productCode;
                        }

                        array_push($result, ...$this->getModuleWhenRequest($userId, $productCode));
                    }
                }

                array_push($result, ...ModulePinMaterial::where('when', $request->when)->get());
                $data = $result;
            }
        }


        return [
            'data' => $data,
            'request' => $request->when,
            'included' => [
                'line' => $line,
            ]
        ];
    }


    public function getModuleWhenRequest($userId, $productCode)
    {
        $lineValid = DB::table('line_user_role')->where('userID', $userId)->get();
        $lineValidArray = array_map(function ($item) {
            return $item->lineID;
        }, $lineValid->toArray());
        $data = [];

        $queryModule =
            ModulePinMaterial::where('when', "require")->whereIn('lineID', $lineValidArray);

        $rmTrip = new RmTrip();
        $data = $queryModule->where('productCode', $productCode)->get();
        // if ($rmTrip->processingTrips()->count() >= 1) {
        // } else {
        //     $data = [];
        // }
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
        return ModulePinMaterial::create($request->all());
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
        return ModulePinMaterial::where('id', $id)->update($request->all());
        return ['request' => $request->all()];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $item = ModulePinMaterial::where('id', $id);
        $itemDelete = $item->first();
        $item->delete();
        return  $itemDelete;
    }
}