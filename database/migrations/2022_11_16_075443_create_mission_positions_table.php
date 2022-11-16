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
        Schema::create('mission_positions', function (Blueprint $table) {
            $table->id();
            $table->string('name_position');
            $table->integer('time_out')->default(-1);
            $table->string('mode')->default('position');
            $table->float('x');
            $table->float('y');
            $table->float('z', 20, 10);
            $table->float('w', 20, 10);
            $table->integer('time_position');
            $table->string('color_position');
            $table->string('mode_position');
            $table->string('mode_child');
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
        Schema::dropIfExists('mission_positions');
    }
};