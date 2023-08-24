<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Mvibot – Login</title>
    <link rel="stylesheet" href="/build/assets/app-87bf25f2.css">
</head>
<style>

</style>

<body>
    <div class="login-wrapper">
        <div class="login-img-wrapper">
            <img class="login-img" src="/img/background_login_2.jpg" alt="">
            <div class="login-layer login-layer-1"></div>
            <div class="login-layer login-layer-2"></div>
            <div class="login-layer login-layer-3"></div>
        </div>
        <div class="login-from-wrapper">
            <form method="POST" action="{{ route('check') }}" class="login-form">
                <div class="login-header">
                    <img class="robot-login-img" src="/img/robot_login.png" alt="">
                    <p class="login-heading">Login</p>
                </div>

                <div class="username-wrapper">
                    <input type="text" placeholder="Username" name="username" class="login-input username"
                        value="{{ old('username') }}">

                    <span class="input-fail">
                        @error('username')
                            {{ $message }}
                        @enderror
                    </span>

                </div>
                <div class="password-wrapper">
                    <input type="password" placeholder="Password" name="password" class="login-input password">
                    <span class="show-password"><i class="fa-regular fa-eye"></i></span>
                    <span class="input-fail">
                        @error('password')
                            {{ $message }}
                        @enderror
                    </span>

                </div>

                <div class="login-footer">
                    <div class="remember-wrapper">
                        <input type="checkbox" class="remember-checkbox" name="remember" id="remember">
                        <label for="remember">Remember me</label>
                    </div>
                    <div class="link-forgot">
                        <a href="">Forgot Password?</a>
                    </div>
                </div>
                @if (Session::get('fail'))
                    <span class="text-fail">
                        <i class="fa-solid fa-triangle-exclamation"></i>
                        {{ Session::get('fail') }}
                    </span>
                @endif
                <button class="login-btn btn"><i class="fa-solid fa-arrow-right-long"></i></button>
                @csrf
            </form>
        </div>
    </div>
    <script src="/js/login.js"></script>
</body>

</html>
