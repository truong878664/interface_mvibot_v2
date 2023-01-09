@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="heading missions-heading">Mission</div>

    <div class=" missions-content">
        @include('frontend.blocks.mission.navbarmissions')
        <div id="create-mission" class="missions-wrapper-create-missions nav-content content-missions">
            <div class="">
                @include('frontend.blocks.mission.createMissions.index')
            </div>
            <div class="fixed bottom-10 right-10 flex">
                <button class=" btn bg-sky-400 text-[#fff] self-end px-4 py-2 rounded-md mr-4 select-btn">Select</button>
                <div class="flex hidden action-select">
                    <button class=" btn bg-red-500 text-[#fff] self-end px-4 py-2 rounded-md mr-4 delete-btn">Delete</button>
                    <button class=" btn bg-[#0f6cbd] text-[#fff] self-end px-4 py-2 rounded-md mr-4 send-btn">
                        <span>Send</span>
                        <i class="fa-regular fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
        <script type="module" src="/js/missions.js"></script>
        <script type="module" src="/js/missions/createMissions.js"></script>
    </div>

    <script>
        document.title = 'Create Mission | Mvibot'
    </script>
@endsection
