@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="w-[calc(100%_-_10px)] h-[calc(100%_-_10px)] m-2 rounded-lg overflow-hidden">
        <div class="w-full h-[calc(50%_-_4px)] mb-1 bg-cover bg-no-repeat px-4 flex"
            style="background-image:url('/img/home/background1.png');">
            <div class="w-1/2 h-full">
                <h3 class="text-[#fff] text-[40px] font-bold">First 4.0 product MVP</h3>
                <div class="w-full h-[calc(100%_-_60px)] bg-no-repeat bg-contain hidden"
                    style="background-image:url('/img/home/robotimg.png');">
                </div>
            </div>
            <div class="w-1/2 text-[#fff]">
                <h3 class="text-[40px] font-bold text-right">Website application to control robot "MViBot"</h3>
                <h6 class="text-right text-[25px]">Create missions, learn maps, control robots, and more...</h6>
            </div>
        </div>
        <div class="w-full h-1/2 flex">
            <div class="w-1/2 h-full bg-cover bg-no-repeat flex flex-col justify-center items-center"
                style="background-image:url('/img/home/background2.png');">
                <div class="w-[250px] h-[250px] bg-contain bg-center bg-no-repeat"
                    style="background-image:url('/img/home/logo.png');">
                </div>
                <h4 class="text-[30px] font-bold text-[#fff] text-center">READY FOR THE FUTURE</h4>
            </div>
            <div class="w-1/2 h-full ml-1 bg-cover bg-no-repeat flex flex-col justify-center items-end text-[30px] text-[#fff] "
                style="background-image:url('/img/home/background3.png');">
                <h4 class=" mr-4"><span class="font-bold">Easy </span>to use</h4>
                <h4 class=" mr-4"><span class="font-bold">Friendly</span> with user</h4>
                <h4 class=" mr-4"><span class="font-bold">Simple </span>robot control </h4>
            </div>
        </div>
        
    </div>
@endsection
