@extends('frontend.layouts.mainLayout')
@section('content')
    <link rel="stylesheet" href="/css/missions.css">
    <div class="heading missions-heading">Mission</div>

    <div class="connect-ros-btn connection-failed">
        <i class="fa-solid fa-tower-broadcast"></i>
    </div>

    <div class="contents missions-content">
        @include('frontend.blocks.navbarmissions')

        <div id="create-mission" class="missions-wrapper-create-missions nav-content content-missions">
            @include('frontend.blocks.createMissions.createStep')
            <link rel="stylesheet" href="/css/createMission/createStep.css">
            <div class="create-mission-header">
                <a href="{{ route('dashboard.missions.createmissions') }}" class="back-btn"><i
                        class="fa-solid fa-angle-left"></i></a>
                <div class="create-mission-heading">{{ $itemRender->name_mission }}</div>
            </div>
            <div class="create-mission-wrapper">
                <div class="missison-point mission-step-item">
                    <div class="mission-step-item-heading">Point</div>
                    <div class="missison-point-content">

                        @foreach ($allPoints as $point)
                            <div class="point-item point-id-{{ $point->id }}">
                                <div class="point-item-content">
                                    <p class="name-point">{{ $point->name_position }}</p>
                                    <p class="create-at">create at: {{ $point->created_at }}</p>
                                </div>
                                <div class="point-item-action">
                                    <button class="show-point-map action-point-btn"><i class="fa-solid fa-eye"></i></button>
                                    <button class="add-point action-point-btn"><i class="fa-solid fa-plus"></i></button>
                                    <div class="show-point" id="{{ $point->id }}" x="{{ $point->x }}"
                                        y="{{ $point->y }}" z="{{ $point->z }}" w="{{ $point->w }}"
                                        color_position="{{ $point->color_position }}">
                                    </div>
                                </div>

                            </div>
                        @endforeach

                    </div>
                </div>

                <div class="misison-footprint mission-step-item">
                    <div class="mission-step-item-heading">Function</div>
                </div>
                <div class="mission-gpio mission-step-item">
                    <div class="mission-step-item-heading">Action</div>
                </div>
            </div>

            {{-- <div class="">{{ $allPoints }}</div> --}}
        </div>
        <script type="module" src="/js/main.js"></script>
        <script type="module" src="/js/missions.js"></script>
        <script type="module" src="/js/missions/createStepMission.js"></script>


    </div>
@endsection
