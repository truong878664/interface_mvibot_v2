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
        if (!Schema::hasTable('mission_sleeps')) {
            Schema::create('mission_sleeps', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->integer('time_out')->default(-1);
                $table->string('mode')->default('sleep');
                $table->integer('time_sleep');
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
        Schema::dropIfExists('mission_sleeps');
    }
};