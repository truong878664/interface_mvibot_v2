@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="heading">Mission</div>
    <div class="missions-content w-[calc(100%_-_10px)] h-[calc(100%_-_38px)] m-2 overflow-auto">
        <div class="w-full flex flex-wrap">
            @php
                $typeMission = ['normal', 'error', 'battery'];
                $nameMission = ['normal mission', 'error mission', 'battery mission'];
                $color = ['from-green-500 to-green-400', 'from-red-500 to-red-400', 'from-blue-500 to-blue-600']
            @endphp

            @foreach ($nameMission as $index => $mission)
                <div class="w-full md:w-1/3 lg:w-1/5 xl:1/6">
                    <div
                        class=" bg-gradient-to-r {{$color[$index]}} w-[calc(100%_-_10px)] h-[120px] rounded-md p-4 mb-4 mx-[5px] btn">
                        <a href="{{ route('dashboard.missions.create-missions.', ["type" => $typeMission[$index]]) }}"
                            class=" flex relative items-end w-full h-full text-[#fff] href-mission text-[26px] font-bold capitalize">
                            {{ $mission }}
                        </a>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
@endsection
