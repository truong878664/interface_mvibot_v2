@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="heading">Battery</div>
    <div class="flex justify-between mt-3 ml-4">
        @include('frontend.blocks.selectRobot', ['type' => 'robot', 'id' => 'robot-status'])
    </div>
    <style>
        [data-status-robot="yes"] .no {
            color: rgb(220, 16, 16);
        }

        [data-status-robot="yes"] .yes {
            color: #54B435;
        }


    </style>
    <div class="group/status wrapper-battery-content w-[calc(100%_-_10px)] h-[calc(100%_-_38px)] m-2 overflow-auto flex flex-wrap data-[status-robot=no]:!text-[#d2d2d2]" data-status-robot="no">
        <div class="w-1/2 md:w-1/3 lg:w-1/4">
            <div class="w-[calc(100%_-_8px)] mx-2 bg-[#fff] rounded-md shadow-md p-4">
                <div class="">
                    <label class="inline-flex justify-center items-center p-3 rounded-md bg-red-400 text-[#fff]">
                        <i class="fa-solid fa-robot"></i>
                    </label>
                    <span class="font-bold" id="name_seri"></span>
                </div>

                <div class="flex justify-end">
                    <div class="flex flex-col">
                        <span class="py-2 h-[30px] font-bold text-2xl px-2 text-right">Status</span>
                        <span class="py-2 h-[30px] font-bold text-2xl px-2 text-right">mode</span>
                        <span class="py-2 h-[30px] font-bold text-2xl px-2 text-right">mode status</span>
                        <span class="py-2 h-[30px] font-bold text-2xl px-2 text-right">ip node</span>
                        <span class="py-2 h-[30px] font-bold text-2xl px-2 text-right">ip master</span>
                        <span class="py-2 h-[30px] font-bold text-2xl px-2 text-right">type connect</span>
                    </div>
                    <div class="flex flex-col mx-6">
                        <span class="py-2 h-[30px] text-2xl pr-8 pl-2 parameter-status" id="status">-</span>
                        <span class="py-2 h-[30px] text-2xl pr-8 pl-2 parameter-status" id="mode">-</span>
                        <span class="py-2 h-[30px] text-2xl pr-8 pl-2 parameter-status" id="mode_status">-</span>
                        <span class="py-2 h-[30px] text-2xl pr-8 pl-2 parameter-status" id="ip_node">-</span>
                        <span class="py-2 h-[30px] text-2xl pr-8 pl-2 parameter-status" id="ip_master">-</span>
                        <span class="py-2 h-[30px] text-2xl pr-8 pl-2 parameter-status" id="type_connect">-</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-1/2 md:w-1/3 lg:w-1/4">
            <div class="w-[calc(100%_-_8px)] mx-2 bg-[#fff] rounded-md shadow-md p-4">
                <div class="">
                    <label class="inline-flex justify-center items-center p-3 rounded-md bg-yellow-400 text-[#fff]">
                        <i class="fa-solid fa-bolt"></i>
                    </label>
                    <span class="font-bold">Battery</span>
                </div>

                <div class="flex justify-end">
                    <div class="flex flex-col">
                        {{-- <span class="py-2 h-[30px] font-bold text-2xl px-2 text-right">Health</span> --}}
                        <span class="py-2 h-[30px] font-bold text-2xl px-2 text-right">Chagre</span>
                        <span class="py-2 h-[30px] font-bold text-2xl px-2 text-right">Level</span>
                        <span class="py-2 h-[30px] font-bold text-2xl px-2 text-right">Temperature</span>
                        <span class="py-2 h-[30px] font-bold text-2xl px-2 text-right">Voltage</span>
                        <span class="py-2 h-[30px] font-bold text-2xl px-2 text-right">Cycle count</span>
                        <span class="py-2 h-[30px] font-bold text-2xl px-2 text-right">Current</span>
                        <span class="py-2 h-[30px] font-bold text-2xl px-2 text-right">Num cell</span>
                        <span class="py-2 h-[30px] font-bold text-2xl px-2 text-right">Capacity now</span>
                        <span class="py-2 h-[30px] font-bold text-2xl px-2 text-right">Capacity max</span>
                    </div>
                    <div class="flex flex-col mx-6">
                        {{-- <span class="py-2 h-[30px] text-2xl pr-8 pl-2">Gooth</span> --}}
                        <span class="py-2 h-[30px] text-2xl pr-8 pl-2 parameter-status" id="charge">-</span>
                        <span class="py-2 h-[30px] text-2xl pr-8 pl-2">
                            <div
                                class="w-[120px] h-[20px] border-[2px] rounded-full  text-center font-bold text-xl soc-wrapper">
                                <spa parameter-statusn id="soc">-</spa>%
                            </div>
                        </span>
                        <span class="py-2 h-[30px] text-2xl pr-8 pl-2"><spa parameter-statusn id="temperature">-</spa> <span>°C</span></span>
                        <span class="py-2 h-[30px] text-2xl pr-8 pl-2"><spa parameter-statusn id="vol">-</spa> <span>v</span></span>
                        <span class="py-2 h-[30px] text-2xl pr-8 pl-2 parameter-status" id="cycle">-</span>
                        <span class="py-2 h-[30px] text-2xl pr-8 pl-2 parameter-status" id="current">-</span>
                        <span class="py-2 h-[30px] text-2xl pr-8 pl-2 parameter-status" id="num_cell">-</span>
                        <span class="py-2 h-[30px] text-2xl pr-8 pl-2 parameter-status" id="capacity_now">-</span>
                        <span class="py-2 h-[30px] text-2xl pr-8 pl-2 parameter-status" id="capacity_max">-</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-1/2 md:w-1/3 lg:w-1/4">
            <div class="w-[calc(100%_-_8px)] mx-2 bg-[#fff] rounded-md shadow-md p-4">
                <div class="">
                    <label class="inline-flex justify-center items-center p-3 rounded-md bg-blue-400 text-[#fff]">
                        <i class="fa-solid fa-tablet-screen-button"></i>
                    </label>
                    <span class="font-bold">Device</span>
                </div>

                <div class="flex justify-end">
                    <div class="flex flex-col">
                        <span class="py-2 h-[30px] font-bold text-2xl px-2 text-right">Radar 1</span>
                        <span class="py-2 h-[30px] font-bold text-2xl px-2 text-right">Radar 2</span>
                        <span class="py-2 h-[30px] font-bold text-2xl px-2 text-right">Camera 1</span>
                        <span class="py-2 h-[30px] text-2xl px-2 text-right">serial</span>
                        <span class="py-2 h-[30px] font-bold text-2xl px-2 text-right">Camera 2</span>
                        <span class="py-2 h-[30px] text-2xl px-2 text-right">serial</span>
                        <span class="py-2 h-[30px] text-2xl font-bold px-2 text-right">uart</span>

                    </div>
                    <div class="flex flex-col mx-6">
                        <span class="py-2 h-[30px] text-2xl pr-8 pl-2 parameter-status" id="radar1">-</span>
                        <span class="py-2 h-[30px] text-2xl pr-8 pl-2 parameter-status" id="radar2">-</span>
                        <span class="py-2 h-[30px] text-2xl pr-8 pl- parameter-status2"id="camera1">-</span>
                        <span class="py-2 h-[30px] text-2xl pr-8 pl-2 parameter-status" id="serial_camera1">-</span>
                        <span class="py-2 h-[30px] text-2xl pr-8 pl-2 parameter-status" id="camera2">-</span>
                        <span class="py-2 h-[30px] text-2xl pr-8 pl-2 parameter-status" id="serial_camera2">-</span>
                        <span class="py-2 h-[30px] text-2xl pr-8 pl-2 parameter-status" id="uart">-</span>

                    </div>
                </div>
            </div>
        </div>
        <div class="w-1/2 md:w-1/3 lg:w-1/4">

            <div class="w-[calc(100%_-_8px)] mx-2 bg-[#fff] rounded-md shadow-md p-4">
                <div class="">
                    <label class="inline-flex justify-center items-center p-3 rounded-md bg-[#8d6e63] text-[#fff]">
                        <i class="fa-solid fa-fax"></i>
                    </label>
                    <span class="font-bold">Motor</span>
                </div>

                <div class="flex justify-end">
                    <div class="flex flex-col">
                        <span class="py-2 h-[30px] font-bold text-2xl px-2 text-right">Motor left</span>
                        <span class="py-2 h-[30px] font-bold text-2xl px-2 text-right">live</span>
                        <span class="py-2 h-[30px] font-bold text-2xl px-2 text-right">error</span>
                        <span class="py-2 h-[30px] font-bold text-2xl px-2 text-right">enable</span>
                        <span class="py-2 h-[30px] text-2xl font-bold px-2 text-right">brake</span>

                        <span class="py-2 h-[30px] font-bold text-2xl px-2 text-right">Motor right</span>
                        <span class="py-2 h-[30px] font-bold text-2xl px-2 text-right">live</span>
                        <span class="py-2 h-[30px] font-bold text-2xl px-2 text-right">error</span>
                        <span class="py-2 h-[30px] font-bold text-2xl px-2 text-right">enable</span>
                        <span class="py-2 h-[30px] text-2xl font-bold px-2 text-right">brake</span>
                    </div>
                    <div class="flex flex-col mx-6">
                        <span class="py-2 h-[30px] text-2xl pr-8 pl-2">-</span>
                        <div class="flex flex-col motor_left">
                            <span class="py-2 h-[30px] text-2xl pr-8 pl-2 live">-</span>
                            <span class="py-2 h-[30px] text-2xl pr-8 pl-2 error">-</span>
                            <span class="py-2 h-[30px] text-2xl pr-8 pl-2 enable">-</span>
                            <span class="py-2 h-[30px] text-2xl pr-8 pl-2 brake">-</span>
                        </div>
                        <span class="py-2 h-[30px] text-2xl pr-8 pl-2 ">-</span>
                        <div class="flex flex-col motor_right">
                            <span class="py-2 h-[30px] text-2xl pr-8 pl-2 live">-</span>
                            <span class="py-2 h-[30px] text-2xl pr-8 pl-2 error">-</span>
                            <span class="py-2 h-[30px] text-2xl pr-8 pl-2 enable">-</span>
                            <span class="py-2 h-[30px] text-2xl pr-8 pl-2 brake">-</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

   
    <script type="module" src="/js/status/status2.js"></script>
@endsection
