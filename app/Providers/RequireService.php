<?php

namespace App\Providers;

use App\Models\backend\RequireProduce;
use App\Models\backend\RequireRaw;
use App\Models\User;
use phpDocumentor\Reflection\Types\Boolean;

// use Illuminate\Support\ServiceProvider;

class RequireService
{
    // /**
    //  * Register services.
    //  *
    //  * @return void
    //  */
    // public function register()
    // {
    //     //
    // }

    // /**
    //  * Bootstrap services.
    //  *
    //  * @return void
    //  */
    // public function boot()
    // {
    //     //
    // }
    /**
     * @return string
     */
    public function getRequire()
    {
        return ["data" => "this is require service"];
    }

    public function toDataRequire($data)
    {
        $requiresArray = [];
        foreach ($data as $require) {
            array_push($requiresArray, $require);
        }

        $result = [];
        foreach ($requiresArray as $require) {
            $produces = RequireProduce::where('requireID', $require->id)
                ->join("line", "require_produce.line", "=", "line.id")
                ->select("require_produce.*", "line.name as name")
                ->get();
            $raw =  RequireRaw::where('requireID', $require->id)
                ->join("line", "require_raw.line", "=", "line.id")
                ->select("require_raw.*", "line.name as name")
                ->get();

            $status =  $require->status;
            $statusProduce =  $require->statusProduce;

            $item = [
                'id' => $require->id,
                'status' => $status,
                'created_at' => $require->created_at,
                'updated_at' => $require->updated_at,
                'cancelReason' => $require->cancelReason,
                'statusProduce' => $statusProduce,
                'produce' => $produces,
                'raw' => RequireRaw::where('requireID', $require->id)
                    ->join("line", "require_raw.line", "=", "line.id")
                    ->select("require_raw.*", "line.name as name")
                    ->get(),
                'user' => User::where("id", $require->userID)->first(),
            ];

            array_push($result, $item);
        }
        return $result;
    }
}