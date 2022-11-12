@extends('frontend.layouts.mainLayout')
@section('content')
    <link rel="stylesheet" href="/css/missions.css">
    <div class="heading missions-heading">Mission</div>

    <div class="connect-ros-btn connection-failed">
        <i class="fa-solid fa-tower-broadcast"></i>
    </div>
    
    <div class="contents missions-content">
        <ul class="nav-tab">
            <li class="navtab-item create-point active"><a href="#create-point">Create point</a></li>
            <li class="navtab-item create-missions"><a href="#create-mission">Create missions</a></li>
            <li class="navtab-item tracking-mission"><a href="#tracking-mission">Tracking mission</a></li>
        </ul>

        <div  id="create-point" class="missions-wrapper-create-point nav-content content-missions show">
            @include('frontend.blocks.createPoint.index')
        </div>

        <div id="create-mission"  class="missions-wrapper-create-missions nav-content content-missions">
            @include('frontend.blocks.createMissions.index')
        </div>

        <div id="tracking-mission" class="missions-wrapper-tracking-missions nav-content content-missions">
            @include('frontend.blocks.trackingMissions.index')
        </div>

        <script type="module" src="/js/main.js"></script>
        <script type="module" src="/js/missions.js"></script>
    </div>
    @endsection
    