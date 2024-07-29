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
        Schema::create('timer_gpio', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("name_seri")->nullable();
            $table->integer("hour");
            $table->integer("minute");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('timer_gpio');
    }
};
