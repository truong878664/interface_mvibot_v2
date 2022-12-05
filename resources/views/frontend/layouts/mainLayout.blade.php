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
            <div class="name-user">admin</div>
            <img class="avatar-user"
                src="https://images.unsplash.com/photo-1599817977364-b6f59e547258?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" />
        </div>

    </header>
    <div class="nav-bar">
        <ul>
            <div class="bar-item-top">
            </div>
            <li class="bar-item home ">
                <a href="{{ route('home') }}">
                    <i class="fa-solid fa-house"></i>
                </a>
                <span class="bar-item-title">Home</span>
            </li>
            <li class="bar-item active dashboard">
                <a href="{{ route('dashboard.') }}"><i class="fa-solid fa-gamepad"></i></a>
                <span class="bar-item-title">Dashboard</span>
            </li>
            <li class="bar-item user"><i class="fa-solid fa-user"></i><span class="bar-item-title">User</span></li>
        </ul>


        <button class="logout">
            <a href="{{ route('logout') }}">
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
            </a>
        </button>
    </div>
    <div class="container">
        @yield('content')
    </div>
    <script type="module" src="/js/mainLayout.js"></script>
    <script src="/js/library/roslib.min.js"></script>
    <script src="/js/library/ros3d.min.js"></script>
    <script type="module" src="/js/main.js"></script>
    <script>
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function() {

            if (this.responseText === "no map") {
                document.querySelector('.message-map-wrapper').innerHTML =
                    `<div class = "message-map-none" >
                        <i class = "fa-solid fa-triangle-exclamation" ></i>
                        <span> no active map </span>
                    </div>`
            }
        }
        xhttp.open("GET", "/dashboard/map/map-active", true);
        xhttp.send();
    </script>
</body>

</html>
