@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="heading missions-heading">Mission</div>
    <div class="contents">

        <div class="connect-ros-btn connection-failed">
            <i class="fa-solid fa-tower-broadcast"></i>
        </div>

        <div class="contents missions-content">
            @include('frontend.blocks.navbarmissions')

            <div id="create-point" class="missions-wrapper-create-point nav-content">
                @include('frontend.blocks.createPoint.index')
            </div>

            <script type="module" src="/js/missions.js"></script>
        </div>
    </div>
    <script>
        document.title = 'Create Point | Mvibot'
    </script>
@endsection
