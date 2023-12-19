@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="w-full p-1 h-full flex flex-col">
        <div class="h-full flex flex-col">
            <div class="absolute top-0 left-0 flex gap-2">
                <div class="">
                    @include('frontend.blocks.selectRobot', ['type' => 'robot', 'id' => 'robot-chart'])
                </div>
                <div class="flex gap-2 group" data-name="change-type-chart" data-active="trip">
                    <button
                        class="px-4 mt-2 btn rounded border border-gray-500 group-data-[active='trip']:text-white group-data-[active='trip']:bg-main"
                        data-name="trip">Trip</button>
                    <button
                        class="px-4 mt-2 btn rounded border border-gray-500 group-data-[active='error']:text-white group-data-[active='error']:bg-main"
                        data-name="error">Error</button>
                    <button
                        class="px-4 mt-2 btn rounded border border-gray-500 group-data-[active='battery']:text-white group-data-[active='battery']:bg-main"
                        data-name="battery">Battery</button>
                </div>
            </div>
            <div class="flex items-center justify-center w-full h-full">
                <div class="w-[90%] h-[90%] flex items-center justify-center">
                    <canvas id="trips"></canvas>
                </div>
            </div>
        </div>

    </div>
    <script type="module" src="/js/library/chart.js"></script>
    <script type="module" src="/js/library/ChartDataLabels.js"></script>
    <script type="module" src="/js/chart/chart.js"></script>
@endsection
