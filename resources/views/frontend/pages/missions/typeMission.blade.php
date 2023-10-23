@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="missions-content w-[calc(100%_-_10px)] h-[calc(100%_-_38px)] m-2 overflow-auto">
        <div class="w-full flex flex-wrap">
            @php
                $color = [
                    'normal' => 'from-green-500 to-green-400',
                    'error-gpio' => 'from-red-500 to-red-400',
                    'error-robot' => 'from-red-500 to-red-400',
                    'battery' => 'from-blue-500 to-blue-600',
                    'gpio' => 'from-yellow-500 to-orange-600',
                ];

                $typeMisison = [
                    'robot-mission' => ['normal', 'error-robot', 'battery'],
                    'gpio-mission' => ['gpio', 'error-gpio'],
                ];
            @endphp
            @foreach ($typeMisison[$type] as $index => $mission)
                <div
                    class="w-full md:w-1/3 lg:w-1/5 xl:1/6 {{ $version === 'new_wave' && ($mission === 'error-robot' || $mission === 'error-gpio' || $mission === 'battery') ? 'hidden' : '' }}">
                    <div
                        class=" bg-gradient-to-r {{ $color[$mission] }} w-[calc(100%_-_10px)] h-[120px] rounded-md p-4 mb-4 mx-[5px] btn">
                        <a href="{{ route("dashboard.missions.$v.create-missions.", ['type' => $mission]) }}"
                            class=" flex relative items-end w-full h-full text-[#fff] href-mission text-[26px] font-bold capitalize">
                            {{ $mission === 'error-robot' || $mission === 'error-gpio' ? 'error' : $mission }} mission
                        </a>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
@endsection
