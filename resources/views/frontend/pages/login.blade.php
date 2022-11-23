<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Mvibot | login</title>
    <link rel="stylesheet" href="/css/main.css">
</head>

<body>
    <div class="login-wrapper">
        <div class="login-img-wrapper">
            <img class="login-img" src="/img/background_login_2.jpg" alt="">
            <div class="login-layer login-layer-1"></div>
            <div class="login-layer login-layer-2"></div>
            <div class="login-layer login-layer-3"></div>
        </div>
        <div class="login-from-wrapper">
            <div class="login-form">
                <div class="login-header">
                    <img class="robot-login-img" src="/img/robot_login.png" alt="">
                    <p class="login-heading">Login</p>
                </div>
                <input type="text" placeholder="Username" class="login-input username">
                <input type="text" placeholder="Password" class="login-input password">
                <div class="login-footer">
                    <div class="remember-wrapper">
                        <input type="checkbox" class="remember-checkbox" name="remember" id="remember">
                        <label for="remember">Remember me</label>
                    </div>
                    <div class="link-forgot">
                        <a href="">Forgot Password?</a>
                    </div>
                </div>
                <a href="{{ route('dashboard.') }}" class="login-btn"><i class="fa-solid fa-arrow-right-long"></i></a>
            </div>
        </div>
    </div>
</body>

</html>
