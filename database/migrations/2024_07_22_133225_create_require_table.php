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
        Schema::create('require', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('userID');
            $table->enum('status', array("done", "cancel", "processing", "require", "confirm"))->default("require");
            $table->string("cancelReason")->nullable();
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
        Schema::dropIfExists('require');
    }
};