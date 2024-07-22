<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\backend\RequireProduce;
use App\Models\backend\RequireRaw;
use App\Models\backend\Requires;
use App\Models\User;
use GuzzleHttp\Psr7\Response;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RequiresController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $requiresQuery = Requires::where("status", "require")->get();
        $requiresArray = [];
        foreach ($requiresQuery as $require) {
            array_push($requiresArray, $require);
        }
        $data = array_map(function ($require) {
            return [
                'id' => $require->id,
                'status' => $require->status,
                'created_at' => $require->created_at,
                'updated_at' => $require->updated_at,
                'produce' => RequireProduce::where('requireID', $require->id)->get(),
                'raw' => RequireRaw::where('requireID', $require->id)->get(),
                'user' => User::where("id", $require->userID)->first(),
            ];
        }, $requiresArray);
        return $data;


        // $produce =  Requires::select("require.created_at", "require.updated_at", "require.status", DB::raw("require.id as requireID"), "require_produce.*")
        //     ->where("status", "require")
        //     ->leftJoin("require_produce", "require.id", "=", "require_produce.requireID")
        //     ->selectRaw("'produce' as type");

        // $raw = Requires::select("require.created_at", "require.updated_at", "require.status", DB::raw("require.id as requireID"), "require_raw.*")
        //     ->where("status", "require")
        //     ->leftJoin("require_raw", "require.id", "=", "require_raw.requireID")
        //     ->selectRaw("'raw' as type");

        // $data = $produce->union($raw)->get();

        // return $data;
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
    public function store(Request $request, Response $response)
    {
        //code...
        $userID = auth('api')->user()['id'];
        $requireCurrent = Requires::where("status", "require")->count();
        if ($requireCurrent >= 2) {
            return ['message' => 'require is full', 'success' => false, 'count' => $requireCurrent];
        }
        $require = Requires::create(['userID' => $userID]);

        $produces = $request->data['produce'];
        $raws = $request->data['raw'];

        $created = [
            "produce" => [],
            'raw' => []
        ];

        foreach ($produces as $produce) {
            $saved = RequireProduce::create(
                array(
                    'line' => $produce['line'],
                    'produceName' => $produce['produceName'],
                    'note' => $produce['note'],
                    'pcs' => $produce['pcs'],
                    'quality' => $produce['quality'],
                    'requireID' => $require['id']
                )
            );
            array_push($created['produce'], $saved);
        }

        foreach ($raws as $raw) {
            $saved = RequireRaw::create(array(
                'line' => $raw['line'],
                'produceName' => $raw['produceName'],
                'note' => $raw['note'],
                'pcs' => $raw['pcs'],
                'quality' => $raw['quality'],
                'requireID' => $require['id']
            ));
            array_push($created['raw'], $saved);
        }
        return ['message' => '', 'data' => $created, 'success' => true, 'count' => $requireCurrent];
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
