<?php

namespace App\Providers;

use App\Models\backend\Robot;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        try {
            $allRobots = Robot::all();
            $robots = Robot::where('type', 'robot')->get();
            $moduleGpios = Robot::where('type', 'gpio_module')->get();
            $robotsSlam = DB::table('robot_status')->where('mode', 'slam')->get();
            $robotsNavigation = DB::table('robot_status')->where('mode', 'navigation')->get();
            //app version
            $version = env('APP_VERSION', 'common');
        } catch (\Illuminate\Database\QueryException $e) {
            $robots = [];
            $moduleGpios = [];
            $robotsSlam = [];
            $robotsNavigation = [];
            $allRobots = [];
            $version = "";
        }
        View::share([
            'robots' => $robots,
            'moduleGpios' => $moduleGpios,
            'robotsSlam' => $robotsSlam,
            'robotsNavigation' => $robotsNavigation,
            'allRobots' => $allRobots,
            'version' => $version
        ]);
    }
}
