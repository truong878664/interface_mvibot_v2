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


<style>
    body {
        display: grid;
        width: 100%;
        height: 100%;
        grid-template-areas:
            "header header"
            "navbar  content"
            "navbar  content";
        grid-template-rows: 50px 1fr;
        grid-template-columns: 74px 1fr;
    }

    .header-main {
        grid-area: header;
    }

    .navbar-main {
        grid-area: navbar;

    }

    .content-main {
        grid-area: content;

    }
</style>

<body>
    {{-- <body class="fixed top-0 left-0 right-0 bottom-0 min-h-[667px] min-w-[320px]"> --}}
    @include('components.header')
    {{-- <nav class="navbar-main bg-blue-300">navbar</nav> --}}
    @include('components.navbar')
    <main class="content overflow-y-auto relative">
        @yield('content')
    </main>

    {{-- <main class="content-main bg-green-300">content main</main> --}}
    {{-- @include('components.header')
    <div class="flex h-full w-full flex-col">
        @include('components.navbar')
        <div
            class="mt-11 h-[calc(100%_-_64px_-_44px)] w-full md:ml-[74px] md:h-[calc(100%_-_44px)] md:w-[calc(100%_-_74px)] bg-red-300 mb-10">
            @yield('content')
        </div>
    </div> --}}
    @if (Session::has('error'))
        @include('components.messageSession', ['status' => 'error', 'message' => Session::get('error')])
    @elseif(Session::has('success'))
        @include('components.messageSession', [
            'status' => 'success',
            'message' => Session::get('success'),
        ])
    @endif

    <div class="sr-only fixed bottom-10 left-10 z-[21] flex">
        <button
            class="btn back-history-btn mr-4 flex h-10 w-10 items-center justify-center rounded-full border border-gray-600 bg-white opacity-80 hover:opacity-100">
            <i class="fa-solid fa-angle-left"></i>
        </button>

        <button
            class="btn next-history-btn mr-4 flex h-10 w-10 items-center justify-center rounded-full border border-gray-600 bg-white opacity-80 hover:opacity-100">
            <i class="fa-solid fa-angle-right"></i>
        </button>
    </div>
    <input type="hidden" value="{{ $allRobots }}" id="all-my-robots" />
    <script>
        const iconBookmark = document.querySelectorAll(".icon-bookmark");
        iconBookmark.forEach((element) => {
            const color =
                "#" + Math.floor(Math.random() * 16777215).toString(16);
            element.style.color = color;
        });
    </script>

    @include('frontend.blocks.robots')
    @include('frontend.blocks.message')
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
        <script type="text/javascript" src="/js/library/ros2d.min.js"></script>
        <script src="/js/library/three.js"></script>
        <script src="/js/library/STLLoader.js"></script>
        <script src="/js/library/eventemitter2.js"></script>
        <script src="/js/library/ColladaLoader.js"></script>
        <script src="/js/library/roslib.js"></script>
        <script src="/js/library/ros3d.js"></script>
        --}}

    <script type="text/javascript" src="/js/library/roslib.min.js"></script>
    <script type="text/javascript" src="/js/library/ros3d.min.js"></script>
    <script type="text/javascript" src="/js/library/nipplejs.js"></script>
    <script type="text/javascript" src="/js/library/dragDropMobile.js"></script>

    <script type="module" src="/js/mainLayout.js"></script>
    <script type="module" src="/js/main.js"></script>
</body>

</html>
