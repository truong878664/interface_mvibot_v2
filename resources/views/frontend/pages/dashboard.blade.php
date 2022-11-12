@extends('frontend.layouts.mainLayout')
<link rel="stylesheet" href="/css/dashboard.css">
@section('content')
    <div class="heading dashboard-heading">Dashboard</div>
    <div class="contents dashboard-content">
        <a class="dashboard-content-item blue" href="{{route('dashboard.missions')}}">
            <div class="dashboard-content-item-icon"><i class="fa-solid fa-circle-chevron-right"></i></div>
            <div class="dashboard-content-item-wrapper">
                <h3 class="dashboard-content-item-heading">Missions</h3>
                <p class="dashboard-content-item-describe">assign tasks to robots</p>
            </div>
        </a>

        <a class="dashboard-content-item orange" href="{{route('dashboard.missions')}}">
            <div class="dashboard-content-item-icon"><i class="fa-solid fa-map-location-dot"></i></div>
            <div class="dashboard-content-item-wrapper">
                <h3 class="dashboard-content-item-heading">Map</h3>
                <p class="dashboard-content-item-describe">View map, create map</p>
            </div>
        </a>

        <a class="dashboard-content-item green" href="{{route('dashboard.missions')}}">
            <div class="dashboard-content-item-icon"><i class="fa-solid fa-clipboard-list"></i></div>
            <div class="dashboard-content-item-wrapper">
                <h3 class="dashboard-content-item-heading">Status</h3>
                <p class="dashboard-content-item-describe">Status information of the robot</p>
            </div>
        </a>
    </div>
@endsection
