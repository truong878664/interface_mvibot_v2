<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>MViBot | {{ isset($title) ? $title : '' }}</title>
    @vite('resources/css/app.css')
    {{-- <script src="https://cdn.tailwindcss.com"></script> --}}
</head>


<body
    class="w-full h-full grid grid-areas-slim grid-cols-slim grid-rows-slim sm:grid-areas-wide sm:grid-cols-wide sm:grid-rows-wide">
    @include('components.header')

    @include('components.navbar')
    <main class="grid-in-content overflow-y-auto relative">
        @yield('content')
    </main>
    @if (Session::has('error'))
        @include('components.messageSession', ['status' => 'error', 'message' => Session::get('error')])
    @elseif(Session::has('success'))
        @include('components.messageSession', [
            'status' => 'success',
            'message' => Session::get('success'),
        ])
    @endif
    <div>
        <input type="hidden" value="{{ $allRobots }}" id="all-my-robots" />
    </div>
    <script>
        const iconBookmark = document.querySelectorAll(".icon-bookmark");
        iconBookmark.forEach((element) => {
            const color =
                "#" + Math.floor(Math.random() * 16777215).toString(16);
            element.style.color = color;
        });
    </script>

    @include('frontend.blocks.robots')
    {{-- @include('frontend.blocks.message') --}}
    {{--
        <script src="/js/library/jquery.min.js"></script>
        <script type="text/javascript" src="/js/library/three.min.js"></script>
        <script
            type="text/javascript"
            src="/js/library/eventemitter2.min.js"
        ></script>
        <script
            type="text/javascript"
            src="/js/library/easeljs.min.js"
        ></script>
        <script src="/js/library/three.js"></script>
        <script type="text/javascript" src="/js/library/ros2d.min.js"></script>
        <script src="/js/library/STLLoader.js"></script>
        <script src="/js/library/eventemitter2.js"></script>
        <script src="/js/library/ColladaLoader.js"></script>
        <script src="/js/library/roslib.js"></script>
        --}}
    <script src="/js/library/ros3d.js"></script>

    <script type="text/javascript" src="/js/library/roslib.min.js"></script>
    <script type="text/javascript" src="/js/library/ros3dnew.min.js"></script>
    {{-- <script type="text/javascript" src="/js/library/ros3d.js"></script> --}}
    <script type="text/javascript" src="/js/library/nipplejs.js"></script>
    <script type="text/javascript" src="/js/library/dragDropMobile.js"></script>

    <script type="module" src="/js/mainLayout.js"></script>
    <script type="module" src="/js/main.js"></script>
</body>

</html>
