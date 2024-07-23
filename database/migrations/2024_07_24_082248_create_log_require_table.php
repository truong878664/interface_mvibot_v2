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
        Schema::create('log_require', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->enum("type", array("produce", "raw", "require"));
            $table->bigInteger("requireID");
            $table->string("log");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('log_require');
    }
};
