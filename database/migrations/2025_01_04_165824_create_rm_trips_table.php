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
        Schema::create('rm_trips', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("userId");
            $table->enum('rawMaterialStatus', array("cancel", "requesting", "processing",  "confirm", "done",))->default("requesting");
            $table->enum('finishedProductStatus', array("unconfirmed", "wasWrong", "confirmed",  "wrongAndConfirmed"))->default("unconfirmed");
            $table->string("cancelRawRequestReason")->nullable();
            $table->boolean("isRecorded")->default(false);
            $table->timestamps();
        });
        Schema::table('rm_trips', function (Blueprint $table) {
            $table->foreign('userId')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('rm_trips');
    }
};