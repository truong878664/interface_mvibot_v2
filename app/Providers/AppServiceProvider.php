<?php

namespace App\Providers;

use App\Models\backend\Robot;
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
            $robots = Robot::all();
        } catch (\Illuminate\Database\QueryException $e) {
            $robots = [];
        }
        View::share('robots', $robots);
    }
}
