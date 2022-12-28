@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="heading dashboard-heading">Home</div>
    <div class="contents">
        <h1>home page</h1>
        <a href="{{ route('dashboard.') }}">go to dashboard</a>
    </div>
    <div class="">
        <input type="text" class="input-test">
        <span class="validate-text">123</span>
        <div class="flex justify-center items-center w-full h-full overflow-hidden">
            <svg width="100%" height="100%" viewBox="0 0 2100 1200" fill="none" xmlns="http://www.w3.org/2000/svg">
                @include('frontend.blocks.imgGpio')
            </svg>
        </div>
    </div>
    <script>
        let isNumber = false
        validateNumber('.input-test')

        function validateNumber(element) {
            const input = document.querySelector(element)
            input.oninput = (e) => {
                if (!isNaN(Number(e.target.value))) {
                    input.nextElementSibling.innerText = ''
                    return isNumber = true
                } else {
                    input.nextElementSibling.innerText = 'this is have to number'
                    return isNumber = false
                }
            }
        }
    </script>
    <style>
        #gpio-input-2 {
            fill: #f90909;
        }
    </style>
@endsection
