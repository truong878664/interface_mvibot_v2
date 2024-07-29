<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use \App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table("users")->insert([
            [
                'name' => 'admin',
                'email' => 'admin@email.com',
                'password' => Hash::make('admin'),
                'line'=> "admin",
                'type' => 'admin'
            ],
            [
                'name' => 'dev',
                'email' => 'dev@gmail.com',
                'password' => Hash::make('dev'),
                'line'=> "admin",
                'type' => 'admin'
            ],
        ]);
        
    }
}