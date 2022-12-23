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
        if (!Schema::hasTable('wake_up')) {
            Schema::create('wake_up', function (Blueprint $table) {
                $table->id();
                $table->string('name_mission');
                $table->string('type')->default('wake_up');
                $table->string('out_set')->nullable();
                $table->string('out_reset')->nullable();
                $table->string('in_on')->nullable();
                $table->string('in_off')->nullable();
                $table->string('in_pullup')->nullable();
                $table->string('in_pulldown')->nullable();
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
        Schema::dropIfExists('wake_up');
    }
};