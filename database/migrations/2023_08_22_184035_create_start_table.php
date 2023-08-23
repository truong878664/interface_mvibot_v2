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
        Schema::create('start', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("position_with_toollift");
            $table->string("position_no_toollift");
            $table->string("mission_go_to_toollift");
            $table->string("missions_send_robot");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('start');
    }
};