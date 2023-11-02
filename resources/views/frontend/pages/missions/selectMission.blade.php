@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="missions-content w-[calc(100%_-_10px)] h-[calc(100%_-_38px)] m-2 overflow-auto">
        <ul class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 m-2 :pl-4">
            <a href="{{ route("dashboard.missions.$v.type-mission", ['type' => 'robot-mission']) }}">
                <li class="w-full p-2 btn bg-opacity-70 h-full bg-cover shadow-md rounded-md overflow-hidden  min-h-[120px]"
                    style="background-image: url(/img/mission/amr.png)">
                    <div
                        class="flex relative items-end w-full h-full text-[#fff] href-mission text-3xl pt-4 drop-shadow-md font-bold capitalize text-shadown">
                        Create mission for robots
                    </div>
                </li>
            </a>
            <a href="{{ route("dashboard.missions.$v.type-mission", ['type' => 'gpio-mission']) }}">
                <li class="w-full p-2 btn bg-opacity-70 h-full bg-cover shadow-md rounded-md overflow-hidden  min-h-[120px]"
                    style="background-image: url(/img/mission/gpio.png)">
                    <div
                        class="flex relative items-end w-full h-full text-[#fff] href-mission text-3xl pt-4 drop-shadow-md font-bold capitalize text-shadown">
                        Create mission for GPIO module
                    </div>
                </li>
            </a>
        </ul>
    </div>
@endsection
