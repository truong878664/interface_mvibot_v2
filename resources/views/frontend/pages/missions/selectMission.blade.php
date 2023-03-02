@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="heading">Mission</div>
    <div class="missions-content w-[calc(100%_-_10px)] h-[calc(100%_-_38px)] m-2 overflow-auto">
        <ul class="w-full flex flex-wrap">
            <li class="w-full md:w-1/3 lg:w-1/5 xl:1/6 btn bg-opacity-70">
                    <a href="{{route('dashboard.missions.type-mission', ['type' => 'robot-mission'])}}"
                        class="w-[calc(100%_-_10px)] h-[140px] rounded-md p-4 mb-4 mx-[5px]  bg-cover shadow-md"  style="background-image: url(/img/mission/amr.png)">
                        <div class=" flex relative items-end w-full h-full text-[#fff] href-mission text-5xl font-bold capitalize">
                           <span class="text-shadown">

                               Create mission for robots
                            </span>
                        </div>
                    </a>
                </li>
            </li>

            <li class="w-full md:w-1/3 lg:w-1/5 xl:1/6 ">
                <a href="{{route('dashboard.missions.type-mission', ['type' => 'gpio-mission'])}}" style="background-image: url(/img/mission/gpio.png)"
                    class="  w-[calc(100%_-_10px)] h-[140px] rounded-md p-4 mb-4 mx-[5px] bg-cover bg-no-repeat btn shadow-md">
                    <div class=" flex relative items-end w-full h-full text-[#fff] href-mission text-5xl font-bold capitalize">
                        <span class="text-shadown">
                            Create mission for GPIO module
                        </span>
                    </div>
                </a>
            </li>
        </div>
    </div>
    <style>
        .text-shadown {
            text-shadow: 1px 1px 5px rgb(36 37 47 / 50%);
        }
    </style>
@endsection