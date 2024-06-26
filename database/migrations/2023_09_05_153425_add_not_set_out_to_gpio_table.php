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
        Schema::table('mission_gpios', function (Blueprint $table) {
            $table->string('not_set_out')->nullable()->after('mode');
        });
        Schema::table('mission_gpio_modules', function (Blueprint $table) {
            $table->string('not_set_out')->nullable()->after('mode');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('mission_gpios', function (Blueprint $table) {
            $table->dropColumn('not_set_out');
        });
        Schema::table('mission_gpio_modules', function (Blueprint $table) {
            $table->dropColumn('not_set_out');
        });
    }
};
