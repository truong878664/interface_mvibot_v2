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
        Schema::create('mission_markers', function (Blueprint $table) {
            $table->id();
            $table->string('name_marker');
            $table->integer('time_out')->default(-1);
            $table->string('mode')->default('marker');
            $table->string('marker_type');
            $table->string('marker_dir')->nullable();
            $table->float('off_set_x1')->nullable();
            $table->float('off_set_x2')->nullable();
            $table->float('off_set_y1')->nullable();
            $table->float('off_set_y2')->nullable();
            $table->float('off_set_dis')->nullable();
            $table->float('off_set_angle')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mission_markers');
    }
};