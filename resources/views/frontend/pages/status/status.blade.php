@extends('frontend.layouts.mainLayout')
@section('content')
    <link rel="stylesheet" href="/css/main.css">
    <link rel="stylesheet" href="/css/status.css">
    <div class="heading status-heading">Status</div>

    <div class="contents">
        <div class="wrapper-status-content">
            <x-status-item nameRobot="robot zxy" statusStatusRobot="navigation" batteryPercent='20%' batteryTemperValue='8°C'
                batteryA='27A' batteryVoltValue='0.7' accessotyItemStatus='active' accessotyItemType='camera' />

            <x-status-item nameRobot="robot 123" statusStatusRobot="navigation" batteryPercent='70%'
                batteryTemperValue='13°C' batteryA='27A' batteryVoltValue='0.5' accessotyItemStatus='active'
                accessotyItemType='camera' />

            <x-status-item nameRobot="robot abd" statusStatusRobot="mapping" batteryPercent='10%' batteryTemperValue='40°C'
                batteryA='27A' batteryVoltValue='0.9' accessotyItemStatus='active' accessotyItemType='camera' />
        </div>
    </div>

    <script>
        document.title = 'Status Robot | Mvibot'
        const $ = document.querySelector.bind(document)
        const $$ = document.querySelectorAll.bind(document)


        const outerCircles = $$('.outer-circle')
        const batteryTempers = $$('.battery-temper')

        outerCircles.forEach(outerCircle => {
            const batteryPercent = parseFloat(outerCircle.parentElement.querySelector('.battery-percent')
                .innerText) / 100
            const batteryPercentToDeg = batteryPercent * 265

            let color = '#54B435';
            if (batteryPercent <= 0.1) {
                color = '#FF1E00'
            } else if (batteryPercent <= 0.2) {
                color = '#F57328'
            }

            outerCircle.style.background =
                `conic-gradient(${color} ${batteryPercentToDeg}deg, #ccc ${batteryPercentToDeg}deg)`

        });

        batteryTempers.forEach(batteryTemper => {
            const temperIcon = batteryTemper.querySelector('.temper-icon')
            const temperValue = batteryTemper.querySelector('.battery-temper-value').innerText

            if (parseInt(temperValue) < 40) {
                temperIcon.style.color = 'blue'
            } else {
                temperIcon.style.color = 'red'

            }

        })
    </script>
@endsection
