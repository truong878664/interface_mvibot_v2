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
        Schema::table('mission_footprints', function(Blueprint $table) {
            $table->renameColumn( 'name_footprint', 'name');
        });

        Schema::table('mission_gpios', function(Blueprint $table) {
            $table->renameColumn( 'name_gpio', 'name');
        });

        Schema::table('mission_gpio_modules', function(Blueprint $table) {
            $table->renameColumn( 'name_gpio', 'name');
        });

        Schema::table('mission_markers', function(Blueprint $table) {
            $table->renameColumn( 'name_marker', 'name');
        });
        Schema::table('mission_positions', function(Blueprint $table) {
            $table->renameColumn( 'name_position', 'name');
        });
        Schema::table('mission_sleeps', function(Blueprint $table) {
            $table->renameColumn( 'name_sleep', 'name');
        });
        Schema::table('mission_sounds', function(Blueprint $table) {
            $table->renameColumn( 'name_sound', 'name');
        });
        Schema::table('mission_variables', function(Blueprint $table) {
            $table->renameColumn( 'name_function_variable', 'name');
        });

      
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        
    }
};
