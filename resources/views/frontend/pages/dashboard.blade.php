@extends('frontend.layouts.mainLayout')
@section('content')
    <ul
        class="dashboard-content w-[calc(100%_-_10px)] h-[calc(100%_-_24px)] m-2 overflow-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        <x-dashboard-item route='dashboard.start-robot' icon='fa-solid fa-bullseye' title='Create missions'
            describe='Assign tasks to robots' color="#0f6cbd" />

        <x-dashboard-item route='dashboard.missions.v3.select' icon='fa-solid fa-bullseye' title='Create missions'
            describe='Assign tasks to robots' color="#0f6cbd" />

        <x-dashboard-item route='dashboard.missions.v4.select' icon='fa-solid fa-bullseye' title='Create missions V4'
            describe='Assign tasks to robots (new version)' color="#898121" />

        <x-dashboard-item route='dashboard.tracking-mission' icon='fa-solid fa-arrows-split-up-and-left'
            title='Tracking Missions' describe='Follow the robot on the mission' color="#FF0032" />

        <x-dashboard-item route='dashboard.map.map' icon='fa-solid fa-map-location-dot' title='Map'
            describe='Choose map active, create layer' color="#82CD47" />

        <x-dashboard-item route='dashboard.status.status' icon='fa-solid fa-gauge-high' title='Status'
            describe='Status information of the robot' color="#f4ba23" />

        <x-dashboard-item route='dashboard.battery' icon='fa-solid fa-microchip' title='Status details'
            describe='All status' color="#03C988" />

        <x-dashboard-item route='dashboard.hook' icon='fa-solid fa-shuffle' title='Hook status' describe='Hook status'
            color="#B46060" />

        <x-dashboard-item route='dashboard.joystick.' icon='fa-solid fa-gamepad' title='Joystick' describe='Move robot'
            color="#EB6440" />

        <x-dashboard-item route='dashboard.mapping.' icon='fa-solid fa-map' title='Maping' describe='Learning map'
            color="#e62648" />

        <x-dashboard-item route='dashboard.location.' icon='fa-solid fa-location-dot' title='Localization'
            describe='Set localization for robot' color="#B01E68" />

        <x-dashboard-item route='dashboard.gpio.' icon='fa-solid fa-lightbulb' title='Gpio' describe='Set & reset Gpio'
            color="#4E6C50" />

        <x-dashboard-item route='dashboard.sound.' icon='fa-solid fa-volume-high' title='Sound'
            describe='Set sound for robot' color="#F48484" />

        <x-dashboard-item route='dashboard.setting.' icon='fa-solid fa-gears' title='Setting' describe='Setting all robot'
            color="#10A19D" />

        <x-dashboard-item route='dashboard.history' icon='fa-solid fa-clock-rotate-left' title='History'
            describe='Operation history of all robots' color="#0A4D68" />

        <x-dashboard-item route='dashboard.history' icon='fa-solid fa-rotate' title='Update' describe='Update system'
            color="#F0DE36" />
    </ul>

    <script type="module" src="/js/functionHandle/createIdBrowser.js"></script>
@endsection
