<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>MViBot</title>
    <link rel="stylesheet" href="/css/main.css">
    {{-- <link rel="stylesheet" href="/dist/css/app.css"> --}}
    <link rel="stylesheet" href="/build/assets/app.8f811565.css">
    {{-- @vite('resources/css/app.css') --}}
</head>

<body>
    <header class="main-header">
        <div class="header-left-wrapper">
            <div class="connect-ros-btn connection-failed">
                <i class="fa-solid fa-satellite-dish"></i>
            </div>
            <h3 class="">Mvibot</h3>
            <div class="message-map-wrapper">
            </div>
        </div>

        <div class="user-wrapper">
            <input type="hidden" class="type-user" value={{ session('TypeUser') }}>
            <input class="ml-10 text-[16px] name-user w-[150px] border-0 bg-transparent text-right" readonly
                value="" />
            <div class="avatar-user transparent flex justify-center items-center bg-avatar relative">
                <span class="text-[20px] font-[300] uppercase avatar-img-key"></span>

                @if (session('TypeUser') == 'admin')
                    <div class="absolute text-cyan-400 text-2xl -top-1 -right-2 bg-[#fff] rounded-full leading-[0px]"><i
                            class="fa-solid fa-circle-check"></i>
                    </div>
                @endif

            </div>
        </div>
    </header>

    <section class="nav-bar">
        <ul class="">
            <div class="bar-item-top">
            </div>
            <li class="bar-item home ">
                <a href="{{ route('home') }}" class="flex justify-center">
                    <i class="fa-solid fa-house"></i>
                    <span class="bar-item-title">Home</span>
                </a>
            </li>
            <li class="bar-item active dashboard">
                <a href="{{ route('dashboard.') }} "class="flex justify-center">
                    <i class="fa-solid fa-gamepad"></i>
                    <span class="bar-item-title">Dashboard</span>
                </a>
            </li>
        </ul>
    </section>

    <div class="container-content">
        @yield('content')
    </div>

    <div class="fixed top-[80px] right-4 z-[1000] text-2xl">
        <div class="bg-green-400 px-[10px]">
            <span id="message-success" class=" w-full h-full text-[#fff]"></span>
        </div>
        <div class="bg-red-400 px-[10px]">
            <span id="message-error" class=" w-full h-full text-[#fff]"></span>
        </div>
    </div>

    {{-- <script src="/js/library/jquery.min.js"></script>
    <script type="text/javascript" src="/js/library/three.min.js"></script>
    <script type="text/javascript" src="/js/library/eventemitter2.min.js"></script> 
    <script type="text/javascript" src="/js/library/easeljs.min.js"></script>
    <script type="text/javascript" src="/js/library/ros2d.min.js"></script>
    <script src="/js/library/three.js"></script>
    <script src="/js/library/STLLoader.js"></script>
    <script src="/js/library/eventemitter2.js"></script>
    <script src="/js/library/ColladaLoader.js"></script> 
    <script src="/js/library/roslib.js"></script>
    <script src="/js/library/ros3d.js"></script> --}}

    <script type="text/javascript" src="/js/library/roslib.min.js"></script>
    <script type="text/javascript" src="/js/library/ros3d.min.js"></script>
    <script type="text/javascript" src="/js/library/nipplejs.js"></script>

    <script type="module" src="/js/mainLayout.js"></script>
    <script type="module" src="/js/main.js"></script>
</body>

</html>
