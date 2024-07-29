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
        Schema::table('timer_gpio', function (Blueprint $table) {
            $table->renameColumn('name_seri', 'line_id');
        });
        Schema::create('config_line_gpio', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name_seri');
            $table->string('line_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('timer_gpio', function (Blueprint $table) {
            $table->renameColumn('line_id', 'name_seri');
        });
        Schema::dropIfExists('config_line_gpio');
    }
};
