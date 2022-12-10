@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="heading dashboard-heading">Dashboard</div>
    <div class="contents dashboard-content">
        <x-dashboard-item route='dashboard.missions.' icon='fa-solid fa-crosshairs' title='Missions'
            describe='assign tasks to robots' color="#0f6cbd" />

        <x-dashboard-item route='dashboard.map.map' icon='fa-solid fa-map-location-dot' title='Map'
            describe='View map, create map' color="#e62648" />

        <x-dashboard-item route='dashboard.status.status' icon='fa-solid fa-gauge-high' title='Status'
            describe='Status information of the robot' color="#f4ba23" />

        <x-dashboard-item route='dashboard.joystick.' icon='fa-solid fa-up-down-left-right' title='Joystick'
            describe='Move robot' color="#EB6440" />
        <x-dashboard-item route='dashboard.status.status' icon='fa-solid fa-gear' title='Setting'
            describe='Setting all robot' color="#10A19D" />
    </div>
@endsection
