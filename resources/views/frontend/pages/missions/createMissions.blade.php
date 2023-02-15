@extends('frontend.layouts.mainLayout')
@section('content')

    <div class="heading">Mission - {{ $type }}</div>
    <div class="missions-content w-[calc(100%_-_10px)] h-[calc(100%_-_38px)] m-2 overflow-auto">
        <div id="create-mission" class="missions-wrapper-create-missions nav-content content-missions">
            <div class="">
                @include('frontend.blocks.mission.createMissions.index')
            </div>
            <div class="fixed bottom-10 right-10 flex">
                <button class=" btn bg-sky-400 text-[#fff] self-end px-4 py-1 rounded-md mr-4 select-btn">Select</button>
                <div class="flex hidden action-select">
                    <button class=" btn bg-red-500 text-[#fff] self-end px-4 py-1 rounded-md mr-4 delete-btn">Delete</button>
                    <label for="select-robot" class=" btn bg-[#0f6cbd] text-[#fff] self-end px-4 py-1 rounded-md mr-4 ">
                        <span>Send</span>
                    </label>
                </div>
            </div>
        </div>
        <input type="checkbox" name="" id="select-robot" class="peer hidden">
        <div class="hidden peer-checked:block fixed top-0 left-0 right-0 bottom-0 z-20">
            <label for="select-robot" class="absolute w-full h-full bg-[#0000004c]"></label>
            <div
                class="absolute bg-[#fff] p-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg flex items-center">
                <select id="" class="bg-transparent outline-none robot-active">
                    <option value="">Choose Robot</option>
                    @foreach ($allRobot as $robot)
                        <option value="{{ $robot['name_seri'] }}">{{ $robot['name_seri'] }}</option>
                    @endforeach
                </select>
                <button
                    class="ml-2 text-xl md:text-3xl rounded-md px-4 py-2 bg-[#0f6cbd] text-[#fff] mx-2 btn send-btn">Send</button>
            </div>
        </div>
        <script type="module" src="/js/missions.js"></script>
        <script type="module" src="/js/missions/createMission/createMissions.js"></script>
    </div>
@endsection
