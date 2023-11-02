@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="font-bold text-center">
        {{ $type === 'error-robot' || $type === 'error-gpio' ? 'error' : $type }}
    </div>
    <div class="overflow-auto h-full w-full p-2" data-version="{{ $v }}" data-type-mission="{{ $type }}">
        <div id="create-mission" class="">
            <div
                class="w-full grid gap-x-3 gap-y-5 grid-cols-1 pb-40 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
                @include('frontend.blocks.mission.createMissions.index')
            </div>

            <div class="fixed bottom-0 right-0 flex pb-16 mb-2 mr-2 flex-wrap gap-2 justify-end md:pb-0">
                <label for="reset-mission" class=" btn bg-red-400 text-white self-end px-4 py-2 rounded-md font-bold">
                    Reset misison
                </label>
                <button
                    class=" btn bg-sky-400 text-white self-end px-4 py-2 rounded-md select-btn font-bold">Select</button>
                <div class="flex hidden action-select gap-2">
                    <button
                        class=" btn bg-red-500 text-white self-end px-4 py-2 rounded-md delete-btn font-bold">Delete</button>
                    <label for="select-robot" class=" btn bg-main text-white self-end px-4 py-2 rounded-md font-bold">
                        <span>Send</span>
                    </label>
                </div>
            </div>
        </div>
        <input type="checkbox" name="" id="select-robot" class="peer/robot hidden">
        <input type="checkbox" name="" id="reset-mission" class="peer/reset hidden">

        <div class="hidden peer-checked/robot:block fixed top-0 left-0 right-0 bottom-0 z-20">
            <label for="select-robot" class="absolute w-full h-full bg-black/20"></label>
            <div
                class="absolute bg-white p-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg flex items-center">
                <div class="flex">
                    @include('frontend.blocks.selectRobot', [
                        'type' => 'all_robot',
                        'id' => 'robot-active',
                    ])
                    <button
                        class="ml-2 font-bold rounded-md px-4 py-2 bg-[#0f6cbd] text-white mx-2 btn send-btn">Send</button>
                </div>
            </div>
        </div>

        <div class="hidden peer-checked/reset:block fixed top-0 left-0 right-0 bottom-0 z-20">
            <label for="reset-mission" class="absolute w-full h-full bg-black/20"></label>
            <div
                class="absolute bg-white p-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg flex items-center flex-col">
                <div class="flex items-center">

                    @include('frontend.blocks.selectRobot', ['type' => 'all_robot', 'id' => 'robot-reset'])

                    <button
                        class="block btn font-bold bg-red-400 py-2 text-white self-end px-4 rounded-md reset-mission-btn"
                        data-type="{{ $type }}">Reset</button>
                </div>
            </div>
        </div>
        <script type="module" src="/js/missions.js"></script>
        <script type="module" src="/js/missions/createMission/createMissions.js"></script>
    </div>
@endsection
