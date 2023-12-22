<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $tableList = [
            'mission_configs',
            'mission_footprints',
            'mission_gpios',
            'mission_gpio_modules',
            'mission_markers',
            'mission_positions',
            'mission_sleeps',
            'mission_sounds',
            'mission_variables',
        ];

        foreach ($tableList as $table) {
            Schema::table($table, function (Blueprint $table) {
                $table->float('time_out')->default(-1)->change();
                if ($table === "mission_sleeps") {
                    $table->float('time_sleep')->change();
                }
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};
