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
        Schema::create('mission_lifts', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('time_out')->default(-1);
            $table->string('mode')->default('lift');
            $table->integer('lift_control')->nullable();
            $table->decimal('lift_min')->nullable();
            $table->decimal('lift_max')->nullable();
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
        Schema::dropIfExists('mission_lifts');
    }
};
