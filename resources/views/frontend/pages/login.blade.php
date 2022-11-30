<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Mvibot – Login</title>
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
                <button class="login-btn"><i class="fa-solid fa-arrow-right-long"></i></button>
                @csrf
            </form>
        </div>
    </div>
</body>
<style>
    .login-input::placeholder {
        font-size: 1.6rem;
    }

    .password-wrapper {
        position: relative;
    }

    .show-password {
        position: absolute;
        right: 10px;
        top: 50%;
        font-size: 1.5rem;
        transform: translateY(-50%);
        cursor: pointer;
        display: none
    }
</style>
<script>
    const showPassBtn = document.querySelector('.show-password')
    const iconShow = '<i class="fa-regular fa-eye"></i>'
    const iconHide = '<i class="fa-regular fa-eye-slash"></i>'
    const passwordEle = document.querySelector('.password')

    passwordEle.oninput = (e) => {
        e.target.value.length > 0 ? showPassBtn.style.display = 'block' : showPassBtn.style.display = 'none'

    }
    showPassBtn.onclick = () => {
        showPassBtn.innerHTML == iconShow ? showPassBtn.innerHTML = iconHide : showPassBtn.innerHTML = iconShow
        passwordEle.type === 'password' ? passwordEle.type = 'text' : passwordEle.type = 'password'
    }
</script>

</html>
