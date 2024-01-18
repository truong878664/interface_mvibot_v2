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
        if (!Schema::hasTable('mission_markers')) {
            Schema::create('mission_markers', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->integer('time_out')->default(-1);
                $table->string('mode')->default('marker');
                $table->string('marker_type');
                $table->string('marker_dir')->nullable();
                $table->float('off_set_x1')->nullable();
                $table->float('off_set_x2')->nullable();
                $table->float('off_set_y1')->nullable();
                $table->float('off_set_y2')->nullable();
                $table->float('off_set_dis')->nullable();
                $table->float('off_set_angle')->nullable();
                $table->float('sx1', 8, 3)->nullable();
                $table->float('sx2', 8, 3)->nullable();
                $table->float('sy1', 8, 3)->nullable();
                $table->float('sy2', 8, 3)->nullable();
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
        Schema::dropIfExists('mission_markers');
    }
};
