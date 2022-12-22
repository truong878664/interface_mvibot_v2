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
@endsection
