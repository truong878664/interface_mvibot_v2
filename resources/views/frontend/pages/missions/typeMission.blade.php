@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="heading">Mission</div>
    <div class="missions-content w-[calc(100%_-_10px)] h-[calc(100%_-_38px)] m-2 overflow-auto">
        <div class="w-full flex flex-wrap">
            
            @php
                // $type = 'gpio-mission';
                $color = [
                    'normal' => 'from-green-500 to-green-400',
                    'error' => 'from-red-500 to-red-400',
                    'battery' => 'from-blue-500 to-blue-600',
                    'gpio' => 'from-yellow-500 to-orange-600',
                ];
                
                $typeMisison = [
                    'robot-mission' => ['normal', 'error', 'battery'],
                    'gpio-mission' => ['gpio', 'error'],
                ];
            @endphp
            @foreach ($typeMisison[$type] as $index => $mission)
                <div class="w-full md:w-1/3 lg:w-1/5 xl:1/6">
                    <div
                        class=" bg-gradient-to-r {{ $color[$mission] }} w-[calc(100%_-_10px)] h-[120px] rounded-md p-4 mb-4 mx-[5px] btn">
                        <a href="{{ route('dashboard.missions.create-missions.', ['type' => $mission]) }}"
                            class=" flex relative items-end w-full h-full text-[#fff] href-mission text-[26px] font-bold capitalize">
                            {{ $mission }} mission
                        </a>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
@endsection
