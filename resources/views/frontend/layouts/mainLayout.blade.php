<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width= , initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>MViBot | Dashboard</title>
    <link rel="stylesheet" href="/css/main.css">
    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="/css/mainLayout.css">
    <link rel="stylesheet" href="/fonts/fontawesome-free-6.2.0-web/css/all.min.css">
    <link rel="stylesheet" href="/css/reponsive.css">
</head>

<body>
    <div class="nav-bar">
        <button class="hine-nav-bar"><i class="fa-solid fa-minus"></i></button>
        <ul>
            <li class="bar-item ">
                <a>
                    <i class="fa-solid fa-house"></i>
                </a>
            </li>

            <li class="bar-item active">
                <a href="{{route('dashboard.')}}">
                    <i class="fa-solid fa-table-columns"></i>

                </a>
            </li>

            <li class="bar-item">
                <i class="fa-solid fa-user"></i>
            </li>

            <li class="bar-item">
                <i class="fa-solid fa-gear"></i>
            </li>

        </ul>

        <button class="logout"><i class="fa-solid fa-arrow-right-from-bracket"></i></button>
    </div>

    <div class="user">
        <div class="name-user">tran_quoc_truong</div>
        <img class="avatar-user"
            src="https://images.unsplash.com/photo-1599817977364-b6f59e547258?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" />
    </div>

    <button class="show-nav-bar hide"><i class="fa-solid fa-o"></i></button>
    <div class="container">
        @yield('content')
    </div>
    <script src="/js/mainLayout.js"></script>
</body>

</html>
