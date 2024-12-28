<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\backend\LogRequire;
use App\Models\backend\RequireProduce;
use App\Models\backend\RequireRaw;
use App\Models\backend\Requires;
use App\Models\User;
use App\Providers\RequireService;
use GuzzleHttp\Psr7\Response;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Mockery\Undefined;

class RequiresController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $requireService = new RequireService();
        $requiresQuery = Requires::where("status", "require")
            ->orWhere("status", "processing")
            ->orWhere("statusProduce", "unconfirmed")
        ->get();

        $requireComplete = Requires::where("status", "done")
        ->orWhere("status", "cancel")
            ->where("statusProduce", "confirmed")
            ->orderBy("updated_at", "desc")->limit(5)->get();

        $data = $requireService->toDataRequire($requiresQuery);
        $history = $requireService->toDataRequire($requireComplete);



        return ['data' => $data, 'history' => $history];
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
        $requireService = new RequireService();
        $userID = auth('api')->user()['id'];
        $requireCurrentCount = Requires::where("status", "require")
        ->orWhere("status", "processing")
        ->orWhere("statusProduce", "unconfirmed")->count();

        if ($requireCurrentCount >= 2) {
            return ['message' => 'Chỉ được tối đa 2 yêu cầu', 'success' => false, 'count' => $requireCurrentCount];
        }
        $produces = $request->data['produce'];
        $raws = $request->data['raw'];

        $require = Requires::create([
            'userID' => $userID,
            'status' => (count($raws) === 0) ? "done" : "require",
            'statusProduce' => (count($produces) === 0) ? "confirmed" : "unconfirmed"
        ]);


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
                    'requireID' => $require['id'],
                )
            );
            $data = RequireProduce::where("require_produce.id", $saved->id)
                ->join("line", "require_produce.line",  "=", "line.id")
                ->select("require_produce.*", "line.name as name")
                ->first();

            array_push($created['produce'], $data);
        }

        foreach ($raws as $raw) {
            $saved = RequireRaw::create(array(
                'line' => $raw['line'],
                'produceName' => $raw['produceName'],
                'note' => $raw['note'],
                'pcs' => $raw['pcs'],
                'quality' => $raw['quality'],
                'requireID' => $require['id'],
            ));
            $data = RequireRaw::where("require_raw.id", $saved->id)
                ->join("line", "require_raw.line",  "=", "line.id")
                ->select("require_raw.*", "line.name as name")
                ->first();
            array_push($created['raw'], $data);
        }
        return ['message' => '', 'data' => [
            'id' => $require->id,
            'status' => $require->status,
            'statusProduce' => $require->statusProduce,
            'created_at' => $require->created_at,
            'updated_at' => $require->updated_at,
            'produce' => $created['produce'],
            'raw' => $created['raw'],
            'user' => User::where("id", $require->userID)->first(),
        ], 'success' => true];
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
        $user = auth('api')->user();
        switch ($request->type) {
            case 'produce':

                $produce =  RequireProduce::where("id", $id);
                $dataCurrent = $produce->first();
                $dataUpdate = $request->data;

                $log = [];

                foreach ($dataUpdate as $key => $value) {
                    if ($dataCurrent[$key] !== $value) {
                        array_push($log, "$key từ \"$dataCurrent[$key]\" sang \"$value\"");
                    }
                }

                $logBody =  "$user->name: Thay đổi " . join(", ", $log);
                $this->createLog('produce', $id, $logBody);

                return $produce->update($dataUpdate);
                break;
            case "raw":
                $data = $request->data;
                foreach ($data as $dataRawUpdate) {
                    unset($dataRawUpdate["created_at"]);
                    unset($dataRawUpdate["updated_at"]);
                    $raw = RequireRaw::where("id", $dataRawUpdate["id"]);
                    $dataRawCurrent = $raw->first();
                    $rawLog = [];
                    foreach ($dataRawUpdate as $key => $rawUpdateItem) {
                        if ($rawUpdateItem !== $dataRawCurrent[$key]) {
                            array_push($rawLog, "$key từ \"$dataRawCurrent[$key]\" sang \"$rawUpdateItem\"");
                        }
                    }
                    $logBody =  "$user->name: Thay đổi " . join(", ", $rawLog);
                    $this->createLog('produce', $dataRawUpdate["id"], $logBody);
                    $raw->update($dataRawUpdate);
                }
                return ["message" => "update success"];
            default:
                return Requires::where("id", $id)->update($request->data);
                break;
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

    public function createLog($type, $requireID, $log)
    {
        // if ($log) {
        LogRequire::create([
            'type' => $type,
            'requireID' => $requireID,
            'log' => $log
        ]);
        // }
    }
}