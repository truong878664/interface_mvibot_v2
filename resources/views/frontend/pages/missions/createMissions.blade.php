@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="font-bold text-center">
        {{ $type === 'error-robot' || $type === 'error-gpio' ? 'error' : $type }}
    </div>
    <div class="overflow-auto h-full w-full p-2" data-version="{{ $v }}" data-type-mission="{{ $type }}">
        <div id="create-mission" class="">
            <div class="w-full grid gap-x-3 gap-y-5 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                @include('frontend.blocks.mission.createMissions.index')
            </div>

            <div class="fixed bottom-10 right-10 flex">
                <label for="reset-mission" class=" btn bg-red-400 text-[#fff] self-end px-4 py-2 rounded-md mr-4 font-bold">
                    Reset misison
                </label>
                <button
                    class=" btn bg-sky-400 text-[#fff] self-end px-4 py-2 rounded-md mr-4 select-btn font-bold">Select</button>
                <div class="flex hidden action-select">
                    <button
                        class=" btn bg-red-500 text-[#fff] self-end px-4 py-2 rounded-md mr-4 delete-btn font-bold">Delete</button>
                    <label for="select-robot"
                        class=" btn bg-[#0f6cbd] text-[#fff] self-end px-4 py-2 rounded-md mr-4 font-bold">
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
                    @include('frontend.blocks.selectRobot', [
                        'type' => 'all_robot',
                        'id' => 'robot-active',
                    ])
                    <button
                        class="ml-2 font-bold rounded-md px-4 py-2 bg-[#0f6cbd] text-[#fff] mx-2 btn send-btn">Send</button>
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
                        class="block btn font-bold bg-red-400 py-2 text-[#fff] self-end px-4 rounded-md reset-mission-btn"
                        data-type="{{ $type }}">Reset</button>
                </div>
            </div>
        </div>
        <script type="module" src="/js/missions.js"></script>
        <script type="module" src="/js/missions/createMission/createMissions.js"></script>
    </div>
@endsection
