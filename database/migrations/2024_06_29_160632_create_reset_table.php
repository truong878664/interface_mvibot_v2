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
        Schema::create('reset', function (Blueprint $table) {
            $table->id();
            $table->string("name_seri");
            $table->integer("position_no_toollift")->nullable();
            $table->integer("mission_go_to_toollift")->nullable();
            $table->json("missions_send_robot")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reset');
    }
};
