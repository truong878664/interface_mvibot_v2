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
        if (!Schema::hasTable('bookmark')) {
            Schema::create('bookmark', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('link');
                $table->string('icon')->default('fa-solid fa-book-bookmark');
                $table->string('color');
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
        Schema::dropIfExists('bookmark');
    }
};
