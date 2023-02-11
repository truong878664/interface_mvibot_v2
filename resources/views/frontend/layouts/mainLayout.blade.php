<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>MViBot</title>
    {{-- <link rel="stylesheet" href="/dist/css/app.css"> --}}
    <link rel="stylesheet" href="/css/main.css">
    <link rel="stylesheet" href="/build/assets/app.291d5839.css">
    {{-- 
        --}}
    {{-- <script src="https://cdn.tailwindcss.com"></script> --}}
    {{-- @vite('resources/css/app.css')  --}}
</head>

<body class="fixed top-0 left-0 right-0 bottom-0">


    {{-- @php
        $a = "&name>1/time_out>-1/mode>normal/data>%normal_step#--+/front/a/back/--+(name:new_variable|time_out:-1|mode:variable|data:~command_action=new~~name_variable=0~~focus_value=0~)(name:p|time_out:-1|mode:variable|data:~command_action=equal~~name_variable=a~~focus_value=0~)--+/front/a/back/--+(name:new_variable|time_out:-1|mode:variable|data:~command_action=new~~name_variable=b~~focus_value=0~)(name:3|time_out:-1|mode:variable|data:~command_action=equal_as~~name_variable=a~~focus_value=b~)--+/front/a/back/--+(name:1|time_out:-1|mode:variable|data:~command_action=equal~~name_variable=a~~focus_value=8~)--+/front/b/back/--+(name:2|time_out:-1|mode:variable|data:~command_action=equal~~name_variable=b~~focus_value=10~)--+/front/a/back/--+(name:new_variable|time_out:-1|mode:variable|data:~command_action=new~~name_variable=0~~focus_value=0~)(name:p|time_out:-1|mode:variable|data:~command_action=equal~~name_variable=a~~focus_value=0~)--+/front/a/back/--+(name:new_variable|time_out:-1|mode:variable|data:~command_action=new~~name_variable=b~~focus_value=0~)(name:3|time_out:-1|mode:variable|data:~command_action=equal_as~~name_variable=a~~focus_value=b~)--+/front/a/back/--+(name:1|time_out:-1|mode:variable|data:~command_action=equal~~name_variable=a~~focus_value=8~)--+/front/b/back/--+(name:2|time_out:-1|mode:variable|data:~command_action=equal~~name_variable=b~~focus_value=10~)--+/front/A/back/--+(name:12|time_out:-1|mode:variable|data:~command_action=equal~~name_variable=A~~focus_value=1~)--+/front/b/back/--+(name:1|time_out:-1|mode:variable|data:~command_action=equal~~name_variable=b~~focus_value=1~)%@&name>x/time_out>-1/mode>if_else/data>%condition#--+/front/A/back/--+(name:12|time_out:-1|mode:variable|data:~command_action=equal~~name_variable=A~~focus_value=1~)%%if_step#(name:F|time_out:-1|mode:sleep|data:~time_sleep=1~)%%else_step#--+/front/A/back/--+(name:12|time_out:-1|mode:variable|data:~command_action=equal~~name_variable=A~~focus_value=1~)%@";
        $b =implode('--+',array_unique(explode('--+', $a)));
        
        $c = str_replace("--+/front/", "(name:new_variable|time_out:-1|mode:variable|data:~command_action=new~~name_variable=", $b);
        // dd($c);
    @endphp --}}
    <style>
        .connection-failed {
            animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
    </style>
    <header class="main-header ajax">
        <div class="header-left-wrapper">
            <div class="connect-ros-btn connection-failed">
                <i class="fa-solid fa-satellite-dish"></i>
            </div>
            <div class="flex items-center">
                <h3 class="">Mvibot</h3>

            </div>
            <div class="message-map-wrapper">
            </div>
        </div>

        <div class="user-wrapper">
            <input type="hidden" class="type-user" value={{ session('TypeUser') }}>
            <input class="ml-10 mr-4 text-[16px] name-user w-[150px] border-0 bg-transparent text-right" readonly
                value="{{ session('UserName') }}" />
            <div class="avatar-user transparent flex justify-center items-center bg-avatar relative">
                <span class="text-[20px] font-[300] uppercase avatar-img-key"></span>
                @if (session('TypeUser') == 'admin')
                    <div class="absolute text-cyan-400 text-2xl -top-1 -right-2 bg-[#fff] rounded-full leading-[0px]">
                        <i class="fa-solid fa-circle-check"></i>
                    </div>
                @endif
            </div>
        </div>
    </header>
    <div class="h-full w-full flex flex-col">
        <section class="nav-bar">
            <ul class="">
                <div class="bar-item-top">
                </div>
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
        </section>

        <div class="container-conten w-[calc(100%_-_74px)] h-[calc(100%_-_44px)] mt-[44px] ml-[74px]">
            @yield('content')
        </div>
    </div>
    <div
        class="fixed top-[10px] right-4 z-[100] text-2xl bg-[#ffffff] ">
        {{-- <span class="text-[30px] w-[50px] h-[50px] border-[2px] border-green-400 rounded-md text-green-400 flex justify-center items-center">
            <i class="fa-solid fa-check"></i>
        </span> --}}
        <div class="">
            <div class="bg-green-400 px-[10px]">
                <span id="message-success" class=" w-full h-full text-[#fff]"></span>
            </div>
            <div class="bg-red-400 px-[10px]">
                <span id="message-error" class=" w-full h-full text-[#fff]"></span>
            </div>
        </div>

    </div>

    <div class="fixed bottom-10 left-10 z-10 flex">
        <button
            class="w-[40px] h-[40px] bg-[#fff] rounded-full border border-[#333] flex justify-center items-center hover:opacity-100 opacity-80 mr-4 btn back-history-btn"><i
                class="fa-solid fa-angle-left"></i></button>
        <button
            class="w-[40px] h-[40px] bg-[#fff] rounded-full border border-[#333] flex justify-center items-center hover:opacity-100 opacity-80 btn next-history-btn"><i
                class="fa-solid fa-angle-right"></i></button>
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
