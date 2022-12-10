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
        if (!Schema::hasTable('layer_emulator')) {
            Schema::create('layer_emulator', function (Blueprint $table) {
                $table->id();
                $table->string('name_map_active');
                $table->string('name_layer')->unique();
                $table->string('type_layer');
                $table->integer('height');
                $table->integer('width');
                $table->integer('xo');
                $table->integer('yo');
                $table->integer('yawo');
                // $table->timestamps();
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
        Schema::dropIfExists('layers');
    }
};