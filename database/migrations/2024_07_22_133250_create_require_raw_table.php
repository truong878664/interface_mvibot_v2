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
        Schema::create('require_raw', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('line');
            $table->bigInteger('requireID');
            $table->integer('quality');
            $table->string('produceName');
            $table->integer('pcs')->nullable();
            $table->text('note')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('require_raw');
    }
};
