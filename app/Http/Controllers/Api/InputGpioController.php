<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\backend\InputGpio;
use Illuminate\Http\Request;

class InputGpioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $inputRobot = InputGpio::where('name_seri', $request->name_seri)->first();
        if ($inputRobot ) {


            $data = [
                'name_seri' => $inputRobot->name_seri,
                'data' =>
                [
                    $inputRobot->in1,
                    $inputRobot->in2,
                    $inputRobot->in3,
                    $inputRobot->in4,
                    $inputRobot->in5,
                    $inputRobot->in6,
                    $inputRobot->in7,
                    $inputRobot->in8,
                    $inputRobot->in9,
                    $inputRobot->in10,
                    $inputRobot->in11,
                    $inputRobot->in12,
                    $inputRobot->in13,
                    $inputRobot->in14,
                    $inputRobot->in15,
                    $inputRobot->in16,
                    $inputRobot->in17,
                    $inputRobot->in18,
                    $inputRobot->in19,
                    $inputRobot->in20
                ]

            ];
            return $data;
        } else {
            return ['message' => 'dont have robot', 'status' =>400];
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
