<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>

</body>

</html>


@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="heading dashboard-heading">Home</div>

    <div class="contents">
        <h1>home page</h1>
        <a href="{{ route('dashboard.') }}">go to dashboard</a>
    </div>
@endsection
