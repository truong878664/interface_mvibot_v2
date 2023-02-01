<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\backend\InputGpio;
use App\Models\backend\OutputGpio;
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
        $outputRobot = OutputGpio::where('name_seri',  $request->name_seri)->first();
        if ($inputRobot ||  $outputRobot) {


            $data = [
                'name_seri' => $inputRobot->name_seri,
                'dataInput' =>
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
                ],
                'dataOutput' =>
                [
                    $outputRobot->out1,
                    $outputRobot->out2,
                    $outputRobot->out3,
                    $outputRobot->out4,
                    $outputRobot->out5,
                    $outputRobot->out6,
                    $outputRobot->out7,
                    $outputRobot->out8,
                    $outputRobot->out9,
                    $outputRobot->out10,
                    $outputRobot->out11,
                    $outputRobot->out12,
                    $outputRobot->out13,
                    $outputRobot->out14,
                    $outputRobot->out15,
                    $outputRobot->out16,
                    $outputRobot->out17,
                    $outputRobot->out18,
                    $outputRobot->out19,
                    $outputRobot->out20
                ]
            ];
            return $data;
        } else {
            return ['message' => "ERR! Don't have robot", 'status' => 400];
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
