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
            $table->boolean('done')->default(false);
            $table->boolean('cancel')->default(false);
            $table->string('note')->nullable();
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
