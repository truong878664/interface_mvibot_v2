<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="/css/main.css">
</head>

<body>
    <style>

    </style>
    <div class="map-joystick-wrapper">
        <div class="header-joystick">
            <select class="list-robot" id="list-robot">
                <option value="">Chose robot</option>
                @foreach ($allRobot as $robot)
                    <option value="{{ $robot['name_seri'] }}">{{ $robot['name_seri'] }}</option>
                @endforeach
            </select>
        </div>
        <a class="close-page-joystick" href="{{ route('dashboard.') }}">close</a>
        <div class="map-page_joystick" id="map"></div>
        <div class="joystick-container">
            <div class="joystick-wrapper">
                <div id="zone_joystick"></div>
            </div>
            <div class="position-icon up"><i class="fa-solid fa-caret-up"></i></div>
            <div class="position-icon left"><i class="fa-solid fa-caret-left"></i></div>
            <div class="position-icon right"><i class="fa-solid fa-caret-right"></i></div>
            <div class="position-icon down"><i class="fa-solid fa-caret-down"></i></div>
        </div>
    </div>
    <script src="/js/library/nipplejs.js"></script>
    <script src="/js/library/roslib.min.js"></script>
    <script src="/js/library/ros3d.min.js"></script>
    <script type="module" src="/js/main.js"></script>
    <script type="module" src="/js/joystick.js"></script>
</body>

</html>
