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
        Schema::table('mission_positions', function (Blueprint $table) {
            $table->string('non_avoid')->nullable()->after('mode');
        });
        Schema::table('mission_configs', function (Blueprint $table) {
            $table->string('min_vel_x')->default("none")->after('max_vel_x');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('mission_positions', function (Blueprint $table) {
            $table->dropColumn('non_avoid');
        });
        Schema::table('mission_configs', function (Blueprint $table) {
            $table->dropColumn('min_vel_x');
        });
    }
};
