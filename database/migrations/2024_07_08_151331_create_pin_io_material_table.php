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
        Schema::create('pin_io_material', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name_seri')->nullable();
            $table->json('enable');
            $table->json('disable');
            $table->enum('when', array("done", "cancel", "processing", "require"));
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pin_io_material');
    }
};
