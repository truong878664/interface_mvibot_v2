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
            $table->unsignedBigInteger("user_id");
            $table->enum('finished_product_status', array("unconfirmed", "was_wrong", "confirmed", "wrong_qlsx_confirmed", "wrong_and_confirmed"))->default("unconfirmed");
            $table->enum('raw_material_status', array("cancel", "requesting", "processing",  "confirm", "done",))->default("requesting");
            $table->string("cancel_raw_request_reason")->nullable();
            $table->timestamps();
        });
        Schema::table('rm_trips', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users');
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
