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
        if (!Schema::hasTable('mission_sounds')) {
            Schema::create('mission_sounds', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('time_out')->default(-1);
                $table->string('mode')->default('sound');
                $table->string('music_mode');
                $table->string('music_start');
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
        Schema::dropIfExists('mission_sounds');
    }
};
