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
        Schema::create('mission_configs', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('mode')->default('config');
            $table->integer('time_out')->default(-1);
            $table->string('footprint_padding')->default("none");
            $table->string('max_vel_x')->default("none");
            $table->string('acc_lim_x')->default("none");
            $table->string('max_vel_theta')->default("none");
            $table->string('acc_lim_theta')->default("none");
            $table->string('inflation_radius')->default("none");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mission_configs');
    }
};
