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
                $table->string('name_map_active');
                $table->string('name_layer')->unique();
                $table->string('type_layer');
                $table->float('height');
                $table->float('width');
                $table->float('xo');
                $table->float('yo');
                $table->float('yawo', 7, 5);
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
        Schema::dropIfExists('layer_emulator');
    }
};