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
        if (!Schema::hasTable('sensor_status')) {
            Schema::create('sensor_status', function (Blueprint $table) {
                $table->string('name_seri')->nullable()->unique();
                $table->integer('radar1')->nullable();
                $table->integer('radar2')->nullable();
                $table->integer('camera1')->nullable();
                $table->integer('camera2')->nullable();
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
        Schema::dropIfExists('sensor_status');
    }
};