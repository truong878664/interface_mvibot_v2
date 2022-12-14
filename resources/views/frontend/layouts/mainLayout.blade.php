<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>MViBot</title>
    <link rel="stylesheet" href="/css/main.css">
    {{-- <link rel="stylesheet" href="/dist/css/app.css"> --}}
    @vite('resources/css/app.css')
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
        <ul class="">
            <div class="bar-item-top">
            </div>
            <li class="bar-item home ">
                <a href="{{ route('home') }}" class="flex justify-center">
                    <svg width="40" height="40" viewBox="0 0 677 677" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path class="icon"
                            d="M605.446 336.799L605.352 337.651V338.508C605.352 347.441 597.778 354.606 589.404 354.606H557.957H542.39L542.458 370.174L543.145 527.803C543.145 527.813 543.145 527.823 543.145 527.833C543.144 529.734 543.002 531.78 542.748 534.068L542.654 534.92V535.777V551.625C542.654 564.844 531.978 575.5 518.845 575.5H503.121C501.925 575.5 501.548 575.489 501.284 575.465L500.029 575.351L498.772 575.441C498.041 575.493 497.218 575.5 495.751 575.5H463.813H440.227C427.094 575.5 416.418 564.844 416.418 551.625V528V465C416.418 439.041 395.45 418 369.471 418H306.577C280.598 418 259.63 439.041 259.63 465V528V551.625C259.63 564.844 248.954 575.5 235.821 575.5H212.236H180.887C180.016 575.5 179.059 575.442 177.497 575.338L176.335 575.26L175.175 575.357C173.886 575.464 173.352 575.5 172.927 575.5H157.203C144.07 575.5 133.394 564.844 133.394 551.625V441.375C133.394 440.901 133.395 440.635 133.401 440.404C133.403 440.327 133.405 440.277 133.407 440.25L133.493 439.476V438.619V370.106V354.606H117.993H86.4471C77.3748 354.606 70.5 347.821 70.5 338.508C70.5 333.738 71.8472 329.933 75.469 326.168L326.992 106.551L327.392 106.202L327.767 105.826C329.256 104.334 330.65 103.624 332.068 103.198C333.674 102.715 335.643 102.5 338.417 102.5C342.678 102.5 346.612 103.763 349.002 105.691L599.799 326.516L599.812 326.528L599.825 326.539C605.133 331.191 605.708 334.434 605.446 336.799Z"
                            stroke="black" stroke-width="31" />
                    </svg>
                    <span class="bar-item-title">Home</span>
                </a>
            </li>
            <li class="bar-item active dashboard">
                <a href="{{ route('dashboard.') }} "class="flex justify-center">
                    <svg width="40" height="40" viewBox="0 0 677 677" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <mask id="path-1-inside-1_38_70" fill="white">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M27 336C27 237.141 107.141 157 206 157H473.78C572.639 157 652.78 237.141 652.78 336C652.78 434.859 572.639 515 473.78 515H206C107.141 515 27 434.859 27 336ZM242.952 322.083C250.903 322.083 257.348 328.529 257.348 336.48C257.348 344.431 250.903 350.877 242.952 350.877H203.121V390.708C203.121 398.659 196.675 405.105 188.724 405.105C180.773 405.105 174.327 398.659 174.327 390.708V350.877H134.496C126.545 350.877 120.099 344.431 120.099 336.48C120.099 328.529 126.545 322.083 134.496 322.083H174.327V282.252C174.327 274.301 180.773 267.855 188.724 267.855C196.675 267.855 203.121 274.301 203.121 282.252V322.083H242.952ZM535.686 281.292C535.686 295.339 524.299 306.726 510.252 306.726C496.205 306.726 484.818 295.339 484.818 281.292C484.818 267.245 496.205 255.858 510.252 255.858C524.299 255.858 535.686 267.245 535.686 281.292ZM459.383 399.826C473.43 399.826 484.818 388.438 484.818 374.391C484.818 360.344 473.43 348.957 459.383 348.957C445.336 348.957 433.949 360.344 433.949 374.391C433.949 388.438 445.336 399.826 459.383 399.826Z" />
                        </mask>
                        <path class="icon" fill-rule="evenodd" clip-rule="evenodd"
                            d="M27 336C27 237.141 107.141 157 206 157H473.78C572.639 157 652.78 237.141 652.78 336C652.78 434.859 572.639 515 473.78 515H206C107.141 515 27 434.859 27 336ZM242.952 322.083C250.903 322.083 257.348 328.529 257.348 336.48C257.348 344.431 250.903 350.877 242.952 350.877H203.121V390.708C203.121 398.659 196.675 405.105 188.724 405.105C180.773 405.105 174.327 398.659 174.327 390.708V350.877H134.496C126.545 350.877 120.099 344.431 120.099 336.48C120.099 328.529 126.545 322.083 134.496 322.083H174.327V282.252C174.327 274.301 180.773 267.855 188.724 267.855C196.675 267.855 203.121 274.301 203.121 282.252V322.083H242.952ZM535.686 281.292C535.686 295.339 524.299 306.726 510.252 306.726C496.205 306.726 484.818 295.339 484.818 281.292C484.818 267.245 496.205 255.858 510.252 255.858C524.299 255.858 535.686 267.245 535.686 281.292ZM459.383 399.826C473.43 399.826 484.818 388.438 484.818 374.391C484.818 360.344 473.43 348.957 459.383 348.957C445.336 348.957 433.949 360.344 433.949 374.391C433.949 388.438 445.336 399.826 459.383 399.826Z"
                            fill="white" />
                        <path class="dashboard-strock"
                            d="M203.121 350.877V320.877H173.121V350.877H203.121ZM174.327 350.877H204.327V320.877H174.327V350.877ZM174.327 322.083V352.083H204.327V322.083H174.327ZM203.121 322.083H173.121V352.083H203.121V322.083ZM206 127C90.5725 127 -3 220.572 -3 336H57C57 253.71 123.71 187 206 187V127ZM473.78 127H206V187H473.78V127ZM682.78 336C682.78 220.572 589.208 127 473.78 127V187C556.071 187 622.78 253.71 622.78 336H682.78ZM473.78 545C589.208 545 682.78 451.428 682.78 336H622.78C622.78 418.29 556.071 485 473.78 485V545ZM206 545H473.78V485H206V545ZM-3 336C-3 451.428 90.5727 545 206 545V485C123.71 485 57 418.29 57 336H-3ZM287.348 336.48C287.348 311.96 267.471 292.083 242.952 292.083V352.083C234.334 352.083 227.348 345.097 227.348 336.48H287.348ZM242.952 380.877C267.471 380.877 287.348 360.999 287.348 336.48H227.348C227.348 327.862 234.334 320.877 242.952 320.877V380.877ZM203.121 380.877H242.952V320.877H203.121V380.877ZM233.121 390.708V350.877H173.121V390.708H233.121ZM188.724 435.105C213.244 435.105 233.121 415.228 233.121 390.708H173.121C173.121 382.09 180.107 375.105 188.724 375.105V435.105ZM144.327 390.708C144.327 415.227 164.204 435.105 188.724 435.105V375.105C197.341 375.105 204.327 382.09 204.327 390.708H144.327ZM144.327 350.877V390.708H204.327V350.877H144.327ZM134.496 380.877H174.327V320.877H134.496V380.877ZM90.0992 336.48C90.0992 360.999 109.976 380.877 134.496 380.877V320.877C143.113 320.877 150.099 327.862 150.099 336.48H90.0992ZM134.496 292.083C109.976 292.083 90.0992 311.96 90.0992 336.48H150.099C150.099 345.097 143.113 352.083 134.496 352.083V292.083ZM174.327 292.083H134.496V352.083H174.327V292.083ZM144.327 282.252V322.083H204.327V282.252H144.327ZM188.724 237.855C164.204 237.855 144.327 257.732 144.327 282.252H204.327C204.327 290.87 197.341 297.855 188.724 297.855V237.855ZM233.121 282.252C233.121 257.732 213.244 237.855 188.724 237.855V297.855C180.106 297.855 173.121 290.87 173.121 282.252H233.121ZM233.121 322.083V282.252H173.121V322.083H233.121ZM242.952 292.083H203.121V352.083H242.952V292.083ZM510.252 336.726C540.868 336.726 565.686 311.908 565.686 281.292H505.686C505.686 278.771 507.731 276.726 510.252 276.726V336.726ZM454.818 281.292C454.818 311.908 479.637 336.726 510.252 336.726V276.726C512.774 276.726 514.818 278.771 514.818 281.292H454.818ZM510.252 225.858C479.637 225.858 454.818 250.677 454.818 281.292H514.818C514.818 283.814 512.774 285.858 510.252 285.858V225.858ZM565.686 281.292C565.686 250.677 540.868 225.858 510.252 225.858V285.858C507.73 285.858 505.686 283.814 505.686 281.292H565.686ZM454.818 374.391C454.818 371.87 456.862 369.826 459.383 369.826V429.826C489.999 429.826 514.818 405.007 514.818 374.391H454.818ZM459.383 378.957C456.862 378.957 454.818 376.913 454.818 374.391H514.818C514.818 343.776 489.999 318.957 459.383 318.957V378.957ZM463.949 374.391C463.949 376.913 461.905 378.957 459.383 378.957V318.957C428.768 318.957 403.949 343.776 403.949 374.391H463.949ZM459.383 369.826C461.905 369.826 463.949 371.87 463.949 374.391H403.949C403.949 405.007 428.768 429.826 459.383 429.826V369.826Z"
                            fill="black" mask="url(#path-1-inside-1_38_70)" />
                    </svg>
                    {{-- <i class="fa-solid fa-gamepad"></i> --}}
                    <span class="bar-item-title">Dashboard</span>
                </a>
            </li>
            <li class="bar-item user">
                <a href="#" class="flex justify-center">

                    <svg width="40" height="40" viewBox="0 0 677 677" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path class="icon"
                            d="M270.245 408H405.755C484.315 408 548 471.685 548 550.245C548 558.946 540.946 566 532.245 566H143.755C135.054 566 128 558.946 128 550.245C128 471.685 191.685 408 270.245 408Z"
                            fill="white" stroke="black" stroke-width="30" />
                        <circle class="icon" cx="337.5" cy="226.5" r="115" fill="white"
                            stroke="black" stroke-width="31" />
                    </svg>
                    <span class="bar-item-title">User</span>
                </a>
            </li>
        </ul>

        <button class="logout">
            <a href="{{ route('logout') }}">
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
            </a>
        </button>
    </div>
    <div class="container-content">
        @yield('content')
    </div>
    <style>
        .active .icon {
            fill: var(--main-color);
            stroke: var(--main-color);
        }

        .active .dashboard-strock {
            fill: var(--main-color);
        }

        .bar-item svg {
            margin-top: 12px;
            /* display: flex;
            flex-direction: column;
            justify-content: center; */
        }

        .nav-bar-icon {
            width: 40px;
        }

        .container-content {
            height: 100vh;
        }
    </style>


    <script src="/js/library/jquery.min.js"></script>
    <script type="text/javascript" src="/js/library/three.min.js"></script>
    <script type="text/javascript" src="/js/library/eventemitter2.min.js"></script>
    <script type="text/javascript" src="/js/library/roslib.min.js"></script>
    <script type="text/javascript" src="/js/library/ros3d.min.js"></script>
    <script type="text/javascript" src="/js/library/nipplejs.js"></script>
    <script type="text/javascript" src="/js/library/easeljs.min.js"></script>
    <script type="text/javascript" src="/js/library/ros2d.min.js"></script>

    <script src="/js/library/three.js"></script>
    <script src="/js/library/STLLoader.js"></script>
    <script src="/js/library/eventemitter2.js"></script>
    <script src="/js/library/ColladaLoader.js"></script>

    <script src="/js/library/roslib.js"></script>
    <script src="/js/library/ros3d.js"></script>

    <script type="module" src="/js/mainLayout.js"></script>
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

        const logoutBtn = document.querySelector('.logout')
        logoutBtn.onclick = () => {
            deleteCookie('username')
            deleteCookie('password')
        }
        const deleteCookie = function(cname) {
            document.cookie = cname + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        };
    </script>
</body>

</html>
