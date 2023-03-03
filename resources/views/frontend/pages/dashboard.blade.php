@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="heading dashboard-heading">Dashboard</div>
    <ul class="dashboard-content w-[calc(100%_-_10px)] h-[calc(100%_-_24px)] m-2 overflow-auto">
        <x-dashboard-item route='dashboard.missions.select' icon='fa-solid fa-crosshairs' title='Create missions'
            describe='Assign tasks to robots' color="#0f6cbd" />

        <x-dashboard-item route='dashboard.missions.tracking-mission' icon='fa-solid fa-circle-right' title='Tracking Missions'
            describe='Follow the robot on the mission' color="#FF0032" />

        <x-dashboard-item route='dashboard.map.map' icon='fa-solid fa-map-location-dot' title='Map'
            describe='Choose map active, create layer' color="#82CD47" />

        <x-dashboard-item route='dashboard.status.status' icon='fa-solid fa-gauge-high' title='Status'
            describe='Status information of the robot' color="#f4ba23" />

        <x-dashboard-item route='dashboard.battery' icon='fa-solid fa-signal' title='Status details' describe='All status'
            color="#03C988" />

        <x-dashboard-item route='dashboard.joystick.' icon='fa-solid fa-up-down-left-right' title='Joystick'
            describe='Move robot' color="#EB6440" />

        <x-dashboard-item route='dashboard.mapping.' icon='fa-solid fa-map' title='Maping' describe='Learning map'
            color="#e62648" />

        <x-dashboard-item route='dashboard.location.' icon='fa-solid fa-location-dot' title='localization'
            describe='Set localization for robot' color="#B01E68" />

        <x-dashboard-item route='dashboard.gpio.' icon='fa-solid fa-toggle-on' title='Gpio' describe='Set & reset Gpio'
            color="#4E6C50" />

        <x-dashboard-item route='dashboard.sound.' icon='fa-solid fa-volume-high' title='Sound'
            describe='Set sound for robot' color="#F48484" />

        <x-dashboard-item route='dashboard.setting.' icon='fa-solid fa-gear' title='Setting' describe='Setting all robot'
            color="#10A19D" />
    </ul>

@endsection
