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

        Schema::table('mission_footprints', function (Blueprint $table) {
            if (Schema::hasColumn('mission_footprints', 'name_footprint')) {
                $table->renameColumn('name_footprint', 'name');
            }
        });

        Schema::table('mission_gpios', function (Blueprint $table) {
            if (Schema::hasColumn('mission_gpios', 'name_gpio')) {
                $table->renameColumn('name_gpio', 'name');
            }
        });

        Schema::table('mission_gpio_modules', function (Blueprint $table) {
            if (Schema::hasColumn('mission_gpio_modules', 'name_gpio')) {
                $table->renameColumn('name_gpio', 'name');
            }
        });

        Schema::table('mission_markers', function (Blueprint $table) {
            if (Schema::hasColumn('mission_markers', 'name_marker')) {
                $table->renameColumn('name_marker', 'name');
            }
        });
        Schema::table('mission_positions', function (Blueprint $table) {
            if (Schema::hasColumn('mission_positions', 'name_position')) {
                $table->renameColumn('name_position', 'name');
            }
        });
        Schema::table('mission_sleeps', function (Blueprint $table) {
            if (Schema::hasColumn('mission_sleeps', 'name_sleep')) {
                $table->renameColumn('name_sleep', 'name');
            }
        });
        Schema::table('mission_sounds', function (Blueprint $table) {
            if (Schema::hasColumn('mission_sounds', 'name_sound')) {
                $table->renameColumn('name_sound', 'name');
            }
        });
        Schema::table('mission_variables', function (Blueprint $table) {
            if (Schema::hasColumn('mission_variables', 'name_function_variable')) {
                $table->renameColumn('name_function_variable', 'name');
            }
        });

        Schema::table('missions', function (Blueprint $table) {
            if (Schema::hasColumn('missions', 'name_mission')) {
                $table->renameColumn('name_mission', 'name');
            }
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
    }
};
