<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>MViBot</title>
    <link rel="stylesheet" href="/css/main.css">
</head>

<body>
    <div class="nav-bar">
        <ul>
            <li class="connect-ros-btn connection-failed">
                <i class="fa-solid fa-satellite-dish"></i>
            </li>

            <li class="bar-item home ">
                <a href="{{ route('home') }}">
                    <i class="fa-solid fa-house"></i>
                </a>
                <span class="bar-item-title">Home</span>
            </li>
            <li class="bar-item active dashboard">
                <a href="{{ route('dashboard.') }}"><i class="fa-solid fa-table-columns"></i></a>
                <span class="bar-item-title">Dashboard</span>
            </li>
            <li class="bar-item user"><i class="fa-solid fa-user"></i><span class="bar-item-title">User</span></li>
            <li class="bar-item setting"><i class="fa-solid fa-gear"></i><span class="bar-item-title">seting</span></li>
        </ul>


        <button class="logout">
            <a href="{{ route('logout') }}">
                <i class="fa-solid fa-arrow-right-from-bracket"></i></button>
        </a>
    </div>

    <div class="user-wrapper">
        <div class="name-user">admin</div>
        <img class="avatar-user"
            src="https://images.unsplash.com/photo-1599817977364-b6f59e547258?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" />
    </div>


    <button class="show-nav-bar hide"><i class="fa-solid fa-o"></i></button>

    <div class="container">
        @yield('content')
    </div>
    <script type="module" src="/js/mainLayout.js"></script>
    <script src="/js/library/roslib.min.js"></script>
    <script src="/js/library/ros3d.min.js"></script>
    <script type="module" src="/js/main.js"></script>
    <script>
        const $ = document.querySelector.bind(document)
        const $$ = document.querySelectorAll.bind(document)
        activeNabBar()


        function activeNabBar() {
            const currentPathname = window.location.pathname.replace('/', '')
            let currentPage
            if (currentPathname.indexOf('dashboard') != -1) {
                currentPage = 'dashboard'

            } else if (currentPathname.indexOf('user') != -1) {
                currentPage = 'user'

            } else if (currentPathname.indexOf('setting') != -1) {
                currentPage = 'setting'

            } else {
                currentPage = 'home'
            }
            $(`.bar-item.active`).classList.remove('active')
            $(`.${currentPage}`).classList.add('active')
            document.title = `Mvibot | ${currentPage}`

        }
    </script>
</body>

</html>
