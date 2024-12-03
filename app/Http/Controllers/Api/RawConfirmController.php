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
    public function index()
    {
        $user = auth('api')->user();
        $required = DB::select(
            "SELECT 
                R.id,
                R.status,
                R.cancelReason,
                R.created_at,
                R.updated_at,
                
                DATE_FORMAT(R.updated_at, '%d-%m-%Y') AS 'date',

                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', RP.id,
                        'line', RP.line,
                        'confirm', RP.confirm,
                        'quality', RP.quality,
                        'produceName', RP.produceName,
                        'note', RP.note,
                        'pcs', RP.pcs,
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
                ) as produce,

                JSON_OBJECT(
                    'id', U.id,
                    'name', U.name
                ) AS user

            FROM `require` R
            LEFT JOIN `require_produce` RP ON R.id = RP.requireID
            LEFT JOIN `users` U ON R.userID = U.id
            WHERE R.statusProduce = ? AND R.userID = ? 
            GROUP BY R.id
            ORDER BY R.id DESC
            LIMIT 5
            ",
            ['confirmed', $user->id]
        );

        $result = array_map(function ($item) {
            $produce =  json_decode($item->produce);
            $user =  json_decode($item->user);
            $item->produce = $produce === null ? [] : $produce;
            $item->user = $user === null ? [] : $user;
            return $item;
        }, $required);

        return ["data" => $result];
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