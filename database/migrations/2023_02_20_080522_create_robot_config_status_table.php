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
        if (!Schema::hasTable('robot_config_status')) {
            Schema::create('robot_config_status', function (Blueprint $table) {
                $table->string("name_seri")->unique();
                $table->string("robot_R")->nullable();
                $table->string("robot_L")->nullable();
                $table->string("robot_gear")->nullable();
                $table->string("robot_ax")->nullable();
                $table->string("robot_aw")->nullable();
                $table->string("robot_vmax")->nullable();
                $table->string("robot_wmax")->nullable();
                $table->string("robot_volume")->nullable();
                $table->string("robot_low_battery")->nullable();
                $table->string("robot_type_connect")->nullable();
                $table->string("serial_camera1")->nullable();
                $table->string("serial_camera2")->nullable();
                $table->string("lan_type")->nullable();
                $table->string("lan_ipv4")->nullable();
                $table->string("lan_ipv4_gateway")->nullable();
                $table->string("lan_ipv4_dns")->nullable();
                $table->string("wifi_type")->nullable();
                $table->string("wifi_ssid")->nullable();
                $table->string("wifi_password")->nullable();
                $table->string("wifi_ipv4")->nullable();
                $table->string("wifi_ipv4_gateway")->nullable();
                $table->string("wifi_ipv4_dns")->nullable();
                $table->string("mode")->nullable();
                $table->string("ip_master")->nullable();
                $table->string("is_master")->nullable();
                $table->string("ip_node")->nullable();
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
        Schema::dropIfExists('robot_config_status');
    }
};
