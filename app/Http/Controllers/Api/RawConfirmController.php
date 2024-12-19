<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\backend\Requires;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RawConfirmController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = $request->query();
        $user = auth('api')->user();
        $total = 0;

        $pageOffset = $query["page"] ?? 1;
        $statusConfirm = $query["statusConfirm"] ?? "unconfirmed";
        $perPage = 5;

        // $created_at = $query["created_at"];

        $required = DB::table("require as R")
            ->leftJoin("require_produce as RP", "R.id", "=", "RP.requireID")
            ->leftJoin("users as U", "R.userID", "=", "U.id")
            ->where("RP.confirm", $statusConfirm === "unconfirmed" ? "=" : "!=", "unconfirmed")
        ->where("statusProduce", "confirmed");

        if (isset($query["created_at"])) {
            $lte = $query["created_at"]["lte"];
            $gte =  $query["created_at"]["gte"];
            if ($lte && $gte) {
                $required->where("R.created_at", ">=", $gte)
                ->where("R.created_at", "<=", $lte);
            }
        }

        if ($user->type !== "qlsx") {
            $required->where("R.userID", $user->id);
        }


        $required
            ->selectRaw("R.id, R.status, R.cancelReason, R.created_at, R.updated_at, DATE_FORMAT(R.updated_at, '%d-%m-%Y') AS 'date'")
            ->selectRaw(
                "JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', RP.id,
                    'line', RP.line,
                    'confirm', RP.confirm,
                    'quality', RP.quality,
                    'produceName', RP.produceName,
                    'note', RP.note,
                    'pcs', RP.pcs,
                    'noteConfirm', RP.noteConfirm,
                    'logs', (
                         SELECT JSON_ARRAYAGG(
                             JSON_OBJECT(
                                'type', 'log',
                                'id', L.id,
                                'message', L.log,
                                'created_at', L.created_at
                             )
                         )
                         FROM `log_require` L 
                         WHERE L.requireID = RP.id
                     )
                )
            ) as produce"
        )


        ->selectRaw("JSON_OBJECT( 'id', U.id, 'name', U.name) AS user")
        ->groupBy("R.id")
            ->orderBy("R.id", "desc");

        $total = $required->get()->count();

        $required->paginate($perPage, ['*'], 'page', $pageOffset);

        $result = array_map(
            function ($item) {
                $produce =  json_decode($item->produce);
                $user =  json_decode($item->user);
                $item->produce = $produce === null ? [] : $produce;
                $item->user = $user === null ? [] : $user;
                return $item;
            },
            $required->get()->toArray()
        );

        return [
            "meta" => [
                "count" => count($result),
                "totalPages" => $total ? ceil($total / $perPage) : 1,
                "total" => $total,
                "page" =>  (int)$pageOffset
            ],
            "data" => $result
        ];
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create() {}

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
        $result = DB::table("require_produce")
        ->where("id", $id)->where("confirm", "unconfirmed")
        ->update([
            "confirm" => $request["confirm"],
            "noteConfirm" => $request["noteConfirm"] ?? "",
        ]);
        return [
            "message" => $result ? "Update successfully" : "Current status cannot be updated",
            "success" => $result ? true : false
        ];
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