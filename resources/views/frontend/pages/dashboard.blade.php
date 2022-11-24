@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="heading dashboard-heading">Dashboard</div>

    <div class="contents dashboard-content">
        <x-dashboard-item route='dashboard.missions.' icon='fa-solid fa-crosshairs' title='Missions'
            describe='assign tasks to robots' color="#0c0c0c" />

        <x-dashboard-item route='dashboard.map.' icon='fa-solid fa-map-location-dot' title='Map'
            describe='View map, create map' color="#e62648" />

        <x-dashboard-item route='dashboard.status.' icon='fa-solid fa-gauge-high' title='Status'
            describe='Status information of the robot' color="#f4ba23" />
    </div>
@endsection
