<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Mvibot – Login</title>
    @vite('resources/css/app.css')
</head>
<style>

</style>

<body>
    <div class="login-wrapper">
        <div class="login-img-wrapper">
            <img class="login-img object-right" src="/img/background_7.jpg" alt="">
            <div class="login-layer login-layer-1"></div>
            <div class="login-layer login-layer-2"></div>
            <div class="login-layer login-layer-3"></div>
        </div>
        <div class="login-from-wrapper">
            <form method="POST" action="{{ route('check') }}" class="login-form">
                <div class="login-header">
                    <img class="robot-login-img" src="/img/robot_login.png" alt="">
                    <p class="text-main ml-40 ">Login</p>
                </div>

                <div class="username-wrapper">
                    <input type="text" placeholder="Username" name="username"
                        class="bg-transparent text-main rounded-md border-transparent border-t-0 border-l-0 border-r-0 border-b-2 border-b-stone-300 px-2 py-1 focus:ring-0 username"
                        value="{{ old('username') }}">

                    <span class="text-red-500">
                        @error('username')
                            {{ $message }}
                        @enderror
                    </span>
                </div>
                <div class="password-wrapper">
                    <span class="show-password cursor-pointer absolute right-3 top-1/2 -translate-y-1/2"><i
                            class="fa-regular fa-eye"></i></span>
                    <input type="password" placeholder="Password" name="password"
                        class="bg-transparent text-main rounded-md border-transparent border-t-0 border-l-0 border-r-0 border-b-2 border-b-stone-300 px-2 py-1 focus:ring-0 password [&[type='text']]:text-red-500">
                    <span class="text-red-500">
                        @error('password')
                            {{ $message }}
                        @enderror
                    </span>

                </div>

                <div class="login-footer">
                    <div class="remember-wrapper flex items-center">
                        <input type="checkbox"
                            class="remember-checkbox w-4 h-4 rounded text-orange-400 focus:outline-orange-500"
                            name="remember" id="remember">
                        <label for="remember">Remember me</label>
                    </div>
                    <div class="link-forgot opacity-50  cursor-not-allowed">
                        <a href="" class="pointer-events-none">Forgot Password?</a>
                    </div>
                </div>
                @if (Session::get('fail'))
                    <span class="text-fail">
                        <i class="fa-solid fa-triangle-exclamation"></i>
                        {{ Session::get('fail') }}
                    </span>
                @endif
                <button
                    class="login-bt inline-block w-20 h-20 aspect-square user-select-none bg-[#d13639] self-center text-2xl shadow-sm text-white rounded-[40%] btn hover:shadow-lg hover:ring-4 group/login hover:ring-red-500/30 transition-all">
                    <i class="fa-solid fa-arrow-right-long"></i>
                </button>
                @csrf
            </form>
        </div>
    </div>
    <script src="/js/login.js"></script>
</body>

</html>
{{-- .login-btn {
    align-self: center;
    background-color: #d13639;
    border: none;
    border-radius: 40%;
    box-shadow: 0 0 7px #ccc;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-size: 3rem;
    height: 80px;
    line-height: 80px;
    text-align: center;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    width: 80px;
} --}}
