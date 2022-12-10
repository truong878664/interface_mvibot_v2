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
        if (!Schema::hasTable('battery_status')) {
            Schema::create('battery_status', function (Blueprint $table) {
                $table->string('name_seri')->nullable()->unique();
                $table->integer('soc')->nullable();
                $table->float('vol')->nullable();
                $table->integer('cycle')->nullable();
                $table->float('capacity_now')->nullable();
                $table->float('capacity_max')->nullable();
                $table->integer('charge')->nullable();
                $table->float('current')->nullable();
                $table->integer('num_cell')->nullable();
                $table->float('temperature')->nullable();
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
        Schema::dropIfExists('battery_status');
    }
};