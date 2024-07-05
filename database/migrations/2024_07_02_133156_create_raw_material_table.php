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
        Schema::create('raw_material', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('line');
            $table->integer('require');
            $table->enum('status', array("done", "cancel", "processing", "require"))->nullable();
            $table->string('notes')->nullable();
            $table->string('cancel_reason')->nullable();
            $table->integer('odd_box')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('raw_material');
    }
};
