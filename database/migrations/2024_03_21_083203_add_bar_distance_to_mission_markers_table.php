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
        Schema::table('mission_markers', function (Blueprint $table) {
            $table->float('bar_distance', 8, 4)->nullable()->after('marker_dir');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('mission_markers', function (Blueprint $table) {
            $table->dropColumn('bar_distance');
        });
    }
};
