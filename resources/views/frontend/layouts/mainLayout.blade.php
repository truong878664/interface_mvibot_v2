<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>MViBot | {{ isset($title) ? $title : '' }}</title>
    {{-- <link rel="shortcut icon" href="/img/home/logo.png" type="image/x-icon"> --}}
    {{-- <link rel="stylesheet" href="/css/main.css"> --}}
    <link rel="stylesheet" href="/buildCss/style.css">
    <link rel="stylesheet" href="/build/assets/app-eff917a7.css">
    {{-- <script src="https://cdn.tailwindcss.com"></script> --}}
    {{-- @vite('resources/css/app.css') --}}
</head>
<body class="fixed top-0 left-0 right-0 bottom-0 min-h-[300px]">
    <style>
        .connection-failed {
            animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .text-clamp-2 {
            display: block;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            /* số dòng hiển thị */
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        </style>
    <header class="main-header">
        {{-- @php
            $a = "0";
            if(($a !== "0") && (int)$a === 0) {
                echo("create varialbe");
            } else {
                echo("dont create");
            }
        @endphp --}}
        <div class="header-left-wrapper">
            <div class="connect-ros-btn connection-failed">
                <i class="fa-solid fa-satellite-dish"></i>
            </div>
            <div class="flex items-center">
                <h3 class="font-bold">Mvibot</h3>
            </div>
            <div class="message-map-wrapper">
            </div>
            <div class="relative">
                <button data-bookmark="" class="btn text-yellow-400 bookmark-btn group/bookmark">
                    <div
                        class="icon-bookmark-btn active-bookmark pointer-events-none hidden group-data-[bookmark=active]/bookmark:block">
                        <i class="fa-solid  fa-bookmark"></i>
                    </div>
                    <div
                        class="icon-bookmark-btn unactive-bookmark pointer-events-none hidden group-data-[bookmark='']/bookmark:block">
                        <i class="fa-regular fa-bookmark"></i>
                    </div>
                </button>
                <div
                    class="absolute top-full w-[200px] bg-[#fff] shadow-sm shadow-[#ccc] text-[#000] text-2xl p-4 rounded-md hidden">
                    <span>Bookmark add</span>
                    <div class="flex my-2">
                        <label for="name-bookmark" class="mr-2">name</label>
                        <input id="name-bookmark" type="text" class="w-full px-2" value="Mvibot">
                    </div>
                    <div class="flex justify-end items-center">
                        <button class="btn float-right btn self-end px-4 py-1 rounded-full border mr-2">Remove</button>
                        <button
                            class="btn float-right btn bg-sky-400 text-[#fff] border self-end px-4 py-1 rounded-full">Done</button>
                    </div>
                </div>
            </div>
            @php
                $userName = session('UserName');
                $key = substr($userName, 0, 1);
                
                $colors = ['#FF7B54', '#D7E9B9', '#7B2869', '#B5D5C5', '#3C6255', '#579BB1', '#FF6E31', '#FFEBB7', '#AD8E70', '#B9FFF8', '#6FEDD6', '#FF9551', '#FF4A4A', '#FDFDBD', '#C8FFD4', '#B8E8FC', '#B1AFFF', '#FED049', '#CFFDE1', '#68B984', '#3D5656'];
                $color = $colors[strlen($userName)];
            @endphp

        </div>
        <div class="user-wrapper">
            <input type="hidden" class="type-user" value={{ session('TypeUser') }}>
            <input class="ml-10 mr-4 text-[16px] name-user w-[150px] border-0 bg-transparent text-right" readonly
                value="{{ session('UserName') }}" />
            <div data-user-name="{{ session('UserName') }}" key="{{ $key }}" style="background-color: {{$color}};"
                class="avatar-user transparent flex justify-center items-center bg-avatar relative after:content-[attr(key)] after:absolute after:text-[24px] after:font-bold after:uppercase">
                <span class="text-[20px] font-[300] uppercase avatar-img-key"></span>
                @if (session('TypeUser') == 'admin')
                    <div
                        class="absolute text-cyan-400 text-2xl -top-1 -right-2 bg-[#fff] rounded-full leading-[0px] z-10">
                        <i class="fa-solid fa-circle-check"></i>
                    </div>
                @endif
            </div>
        </div>
    </header>
    <div class="h-full w-full flex flex-col">
        <section class="nav-bar">
            <ul class="main-nav-bar">
                <div class="bar-item-top"></div>
                <li class="bar-item home">
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

                <li class="bar-item user">
                    <a href="{{ route('user') }} "class="flex justify-center">
                        <i class="fa-solid fa-user-gear"></i>
                        <span class="bar-item-title">User</span>
                    </a>
                </li>
            </ul>

            <hr>

            <ul class="flex-col items-center h-full overflow-x-hidden overflow-y-auto bookmark-wrapper hidden md:flex">

            </ul>
        </section>

        <div
            class="w-full h-[calc(100%_-_128px)] md:w-[calc(100%_-_74px)] md:h-[calc(100%_-_44px)] mt-[44px] md:ml-[74px]">
            @yield('content')
        </div>
    </div>

    <div class="fixed bottom-10 left-10 z-[21] flex">
        <button
            class="w-[40px] h-[40px] bg-[#fff] rounded-full border border-[#333] flex justify-center items-center hover:opacity-100 opacity-80 mr-4 btn back-history-btn"><i
                class="fa-solid fa-angle-left"></i></button>
        <button
            class="w-[40px] h-[40px] bg-[#fff] rounded-full border border-[#333] flex justify-center items-center hover:opacity-100 opacity-80 btn next-history-btn"><i
                class="fa-solid fa-angle-right"></i></button>

    </div>
    <input type="hidden" value="{{ $allRobots }}" id="all-my-robots">
    <script>
        const iconBookmark = document.querySelectorAll('.icon-bookmark')
        iconBookmark.forEach(element => {
            const color = ('#' + Math.floor(Math.random() * 16777215).toString(16))
            element.style.color = color
        });
    </script>

    @include('frontend.blocks.robots')
    @include('frontend.blocks.message')

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
