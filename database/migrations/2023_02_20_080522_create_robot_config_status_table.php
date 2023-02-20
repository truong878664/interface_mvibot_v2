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
        Schema::create('robot_config_status', function (Blueprint $table) {
            $table->string("name_seri")->unique();
            $table->string("robot_R");
            $table->string("robot_L");
            $table->string("robot_ax");
            $table->string("robot_aw");
            $table->string("robot_vmax");
            $table->string("robot_wmax");
            $table->string("robot_volume");
            $table->string("serial_camera1");
            $table->string("serial_camera2");
            $table->string("mode");
            $table->string("ip_master");
            $table->string("ip_node");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('robot_config_status');
    }
};
