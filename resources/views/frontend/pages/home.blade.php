@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="heading dashboard-heading">Home</div>

    <div class="contents">
        <h1>home page</h1>
        <a href="{{ route('dashboard.') }}">go to dashboard</a>
    </div>
@endsection
