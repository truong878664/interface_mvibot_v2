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
        if (!Schema::hasTable('mission_footprints')) {
            Schema::create('mission_footprints', function (Blueprint $table) {
                $table->id();
                $table->string('name_footprint');
                $table->string('mode')->default('footprint');
                $table->integer('time_out')->default(-1);
                $table->float('x1', 5, 3);
                $table->float('y1', 5, 3);
                $table->float('x2', 5, 3);
                $table->float('y2', 5, 3);
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
        Schema::dropIfExists('mission_footprints');
    }
};
