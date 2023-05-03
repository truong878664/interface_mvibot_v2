@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="heading">Mission - {{ $type }}</div>
    <div class="missions-content w-[calc(100%_-_10px)] h-[calc(100%_-_38px)] m-2 overflow-auto">
        <div id="create-mission" class="missions-wrapper-create-missions nav-content content-missions">
            <div class="">
                @include('frontend.blocks.mission.createMissions.index')
            </div>

            {{-- <label for="select-robot" class="mb-2 rounded-md px-4 py-2 bg-[#0f6cbd] text-[#fff] mx-2 btn">Send</label> --}}

            <div class="fixed bottom-10 right-10 flex">
                <label for="reset-mission"
                    class=" btn bg-red-400 text-[#fff] self-end px-4 py-2 rounded-md mr-4 text-2xl font-bold">Reset
                    misison</label>

                <button
                    class=" btn bg-sky-400 text-[#fff] self-end px-4 py-2 rounded-md mr-4 select-btn text-2xl font-bold">Select</button>
                <div class="flex hidden action-select">
                    <button
                        class=" btn bg-red-500 text-[#fff] self-end px-4 py-2 rounded-md mr-4 delete-btn text-2xl font-bold">Delete</button>
                    <label for="select-robot"
                        class=" btn bg-[#0f6cbd] text-[#fff] self-end px-4 py-2 rounded-md mr-4 text-2xl font-bold">
                        <span>Send</span>
                    </label>
                </div>
            </div>
        </div>
        <input type="checkbox" name="" id="select-robot" class="peer/robot hidden">
        <input type="checkbox" name="" id="reset-mission" class="peer/reset hidden">

        <div class="hidden peer-checked/robot:block fixed top-0 left-0 right-0 bottom-0 z-20">
            <label for="select-robot" class="absolute w-full h-full bg-[#0000004c]"></label>
            <div
                class="absolute bg-[#fff] p-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg flex items-center">
                <div class="flex">
                    @if ($type === 'normal' || $type === 'error-robot' || $type === 'battery')
                        @include('frontend.blocks.selectRobot', [
                            'type' => 'robot',
                            'id' => 'robot-active',
                        ])
                    @elseif($type === 'gpio' || $type === 'error-gpio')
                        @include('frontend.blocks.selectRobot', [
                            'type' => 'module_gpio',
                            'id' => 'robot-active',
                        ])
                    @endif

                    <button
                        class="ml-2 text-2xl font-bold rounded-md px-4 py-2 bg-[#0f6cbd] text-[#fff] mx-2 btn send-btn">Send</button>
                </div>
            </div>
        </div>

        <div class="hidden peer-checked/reset:block fixed top-0 left-0 right-0 bottom-0 z-20">
            <label for="reset-mission" class="absolute w-full h-full bg-[#0000004c]"></label>
            <div
                class="absolute bg-[#fff] p-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg flex items-center flex-col">
                <div class="flex items-center">

                    @include('frontend.blocks.selectRobot', ['type' => 'all_robot', 'id' => 'robot-reset'])

                    <button
                        class="block btn text-2xl font-bold bg-red-400 py-2 text-[#fff] self-end px-4 rounded-md reset-mission-btn"
                        data-type="{{ $type }}">Reset</button>
                </div>
            </div>
        </div>
        <script type="module" src="/js/missions.js"></script>
        <script type="module" src="/js/missions/createMission/createMissions.js"></script>
    </div>
@endsection
