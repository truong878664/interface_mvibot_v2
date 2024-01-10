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
                        data-name="trip">
                        Trips
                    </button>
                    <button
                        class="px-4 mt-2 btn rounded border border-gray-500 group-data-[active='error']:text-white group-data-[active='error']:bg-main"
                        data-name="error">
                        Short stop error
                    </button>
                    <button
                        class="px-4 mt-2 btn rounded border border-gray-500 group-data-[active='systemError']:text-white group-data-[active='systemError']:bg-main"
                        data-name="systemError">
                        System Error
                    </button>
                    <button
                        class="px-4 mt-2 btn rounded border border-gray-500 group-data-[active='battery']:text-white group-data-[active='battery']:bg-main"
                        data-name="battery">
                        Battery
                    </button>
                    <button data-name="performance"
                        class="px-4 mt-2 btn rounded border border-gray-500 group-data-[active='performance']:text-white group-data-[active='performance']:bg-main">
                        robot performance chart
                    </button>
                    <button data-name="performanceMvpTime"
                        class="px-4 mt-2 btn rounded border border-gray-500 group-data-[active='performanceMvpTime']:text-white group-data-[active='performanceMvpTime']:bg-main">
                        performance chart MVP time
                    </button>
                </div>
            </div>
            <div class="flex items-center justify-center w-full h-full">
                <div class="relative w-[90%] h-[90%] flex items-center justify-center">
                    <canvas id="trips"></canvas>
                    <button data-name="left-chart-date"
                        class="absolute left-0 bottom-0 -translate-x-full rounded-full border border-gray-600 py-1 px-3">
                        <i class="fa-solid fa-angle-left"></i>
                    </button>
                    <button data-name="right-chart-date"
                        class="absolute right-0 bottom-0 translate-x-full rounded-full border border-gray-600 py-1 px-3">
                        <i class="fa-solid fa-angle-right"></i>
                    </button>

                </div>
            </div>
        </div>
    </div>
    <script type="module" src="/js/library/chart.js"></script>
    <script type="module" src="/js/library/ChartDataLabels.js"></script>
    <script type="module" src="/js/chart/chart.js"></script>
@endsection
