@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="w-full h-full p-1 pr-0 rounded-lg overflow-y-auto overflow-x-hidden">
        <div class="w-full h-full bg-cover flex relative items-end" style="background-image: url(/img/home2/bg.jpg)">
            <span class="absolute top-0 left-4 text-orange-400 ">website: maruei-robots.com</span>
            <span class="absolute top-0 right-4 ">Version: {{ $version }}</span>
            <div class="absolute top-[20%] left-1/2 -translate-x-1/2 flex flex-col items-center text-[#fff]">
                <h1>
                    <div class="animation-text text-[100px] font-bold">
                        <div class="animation-text-left"><span>MViBot</span></div>
                        <div class="animation-text-right"><span>MViBot</span></div>
                    </div>
                </h1>
                </h1>
                <span class="text-[30px] text-[#0f6cbd]">Ready for the future</span>
            </div>
            <div class='light x1'></div>
            <div class='light x2'></div>
            <div class='light x3'></div>
            <div class='light x4'></div>
            <div class='light x5'></div>
            <div class='light x6'></div>
            <div class='light x7'></div>
            <div class='light x8'></div>
            <div class='light x9'></div>

            <div class="h-3/4 w-full flex">
                <div class="w-1/3 h-full bg-contain bg-center bg-no-repeat hover:scale-110 transition-all"
                    style="background-image: url(/img/home2/robot1.png)"></div>
                <div class="w-1/3 h-full bg-contain bg-center bg-no-repeat hover:scale-110 transition-all"
                    style="background-image: url(/img/home2/robot2.png)"></div>
                <div class="w-1/3 h-full bg-contain bg-center bg-no-repeat hover:scale-110 transition-all"
                    style="background-image: url(/img/home2/robot3.png)"></div>
            </div>
            <div class="absolute left-1/2 bottom-10 text-[#0f6cbd] text-[30px] animate-bounce">
                <i class="fa-solid fa-angles-down"></i>
            </div>
        </div>

        <div class="w-full h-full bg-white flex mt-8 items-center">
            <div class="w-1/2 flex justify-center">
                <div class="w-2/3">
                    <h1 class="uppercase font-bold text-[30px] mb-4">About us</h1>
                    <p class="">Established in 2001, Maruei Vietnam Precision Co., Ltd., a 100% Japanese-owned
                        company, specializes in precision mechanical components with over 99% of its products serving the
                        automotive industry. With over 16 years of presence in Vietnam, Maruei Vietnam has continuously
                        developed and become the largest manufacturing base within the Maruei Industrial Group (Japan). With
                        over 1,500 dedicated and responsible employees, MVP takes pride in delivering high-quality products,
                        competitive prices, and timely delivery (Q-C-D) to customers, always meeting their expectations.</p>
                </div>
            </div>

            <div class="h-full w-1/2" style="clip-path: polygon(15% 0, 100% 0%, 100% 100%, 0% 100%);">
                <div style="background-image: url(/img/mvp_1.jpeg);" class="h-1/2 w-full bg-cover bg-bottom"></div>
                <div style="background-image: url(/img/background_7.jpg);" class="h-1/2 w-full bg-cover"></div>
            </div>
        </div>

        @php
            $maruei = [
                [
                    'className' => 'hidden',
                    'title' => 'MARUEI INDUSTRIES CO., LTD.',
                    'description' => 'Sản xuất và bán phụ tùng ô tô',
                ],
                [
                    'className' => '',
                    'title' => 'MARUEI MIYAZAKI CO., LTD.',
                    'description' =>
                        'Located in Sadowara Town, Miyazaki Prefecture, we supply cold forged materials to our domestic and overseas production bases. Maruei Miyazaki has four bases: the Head Office Factory, which is a forging processing factory, the TRP Factory, which specializes in precision cutting, the MTV Factory, and the Innovation Center, which is a development center. We have created an environment where everything from development to cutting can be carried out in Miyazaki.',
                ],
                [
                    'className' => 'hidden',
                    'title' => 'MARUEI TECHNOS CO., LTD.',
                    'description' => 'Maruei Technos chủ yếu sản xuất các sản phẩm bằng máy móc.',
                ],
                [
                    'className' => 'hidden',
                    'title' => 'MARLEY PRECISION INC.',
                    'description' =>
                        'Marley Precision tham gia vào kinh doanh và sản xuất gia công, nhắm mục tiêu các khu vực Bắc Mỹ.',
                ],
                [
                    'className' => '',
                    'title' => 'Maruei De Mexico SA.DE.CV.',
                    'description' =>
                        'Maruei De MEXICO was established in neighboring Mexico to cover demand in the United States and to meet the needs of customers in Mexico. We operate as a low-volume, high-mix production factory, taking advantage of our labor-intensive line structure.',
                ],
                [
                    'className' => '',
                    'title' => 'MARUEI VIETNAM PRECISION',
                    'description' =>
                        "Maruei Vietnam is our largest production factory, and was established in 2001 to provide our products at low prices to users from all over the ASEAN region as well as from domestic companies. Maruei Vietnam's products, which have a large number of hard-working and talented staff, have received high praise from many users for both price and quality.",
                ],
                [
                    'className' => '',
                    'title' => 'MARUEI NEW WAVE CO., LTD.',
                    'description' =>
                        'We handle general domestic and international logistics operations such as automobile parts transportation, equipment transportation, and overseas moving, as well as warehousing operations.',
                ],
                [
                    'className' => '',
                    'title' => 'MARUEI TOYOTA CO., LTD.',
                    'description' =>
                        'Maruei Toyota Co., Ltd., which was spun off as an independent company in April 2014, assembles and produces electronic parts such as switch parts for automobile steering wheels and parking brake switches. We carry out efficient production using the Toyota Kanban system so that we can quickly respond to daily changing demand.',
                ],
                ['className' => '', 'title' => 'MIYAZAKI TECHNOVILLAGE CO., LTD.', 'description' => ''],
            ];

        @endphp
        <div class="w-full h-full">
            <header class="text-center text-[30px] font-bold mt-8 text-[#0f6cbd]">The Maruei Group</header>
            <section class="w-full max-w-[1000px] mx-auto">
                <ul class="w-full grid grid-cols-1 gap-4 md:grid-cols-2">

                    @foreach ($maruei as $index => $item)
                        <li class="border rounded-md p-2 {{ $item['className'] }}">
                            <div class="w-full h-[320px] bg-slate-500 bg-cover rounded-md hover:scale-105 origin-center transition-all"
                                style="background-image: url(/img/home2/{{ $index + 1 }}.jpg)"></div>
                            <span class="font-bold">{{ $item['title'] }}</span>
                            <span>{{ $item['description'] }}</span>
                        </li>
                    @endforeach
                </ul>
            </section>

        </div>
        <script type="module" src="/js/home/home.js"></script>
        <style>
            .animation-text {
                position: relative;
                width: 100%;
                color: var(--main-color);
            }

            .animation-text div {
                overflow: hidden;
                width: 50%;
                height: 100%;
                transform: skewX(-20deg);
            }

            .animation-text div::before {
                content: "";
                position: absolute;
                width: 0%;
                height: 4px;
                background: var(--main-color);
            }

            .animation-text span {
                padding: 0 10px;
            }

            .animation-text-left::before {
                left: 0;
                animation: widthLineLeft 1.2s 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.1) forwards;
            }

            .animation-text-left span {
                display: block;
                animation: slideLeft 1.2s 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.1) forwards;
                transform: translateX(200px) skewX(20deg);
            }

            .animation-text-right {
                position: absolute;
                right: 0;
                top: 0;
            }

            .animation-text-right:before {
                bottom: 0;
                right: 0;
                animation: widthLineRight 1.2s 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.1) forwards;
            }

            .animation-text-right span {
                position: absolute;
                width: 100%;
                left: -100%;
                transform: translateX(-200px) skewX(20deg);
                animation: slideRight 1.2s 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.1) forwards;
            }

            @keyframes slideLeft {
                from {
                    transform: translateX(200px) skewX(20deg);
                }

                to {
                    transform: translateX(0%) skewX(20deg);
                }
            }

            @keyframes slideRight {
                from {
                    transform: translateX(-200px) skewX(20deg);
                }

                to {
                    transform: translateX(0%) skewX(20deg);
                }
            }

            @keyframes widthLineLeft {
                0% {
                    width: 0%;
                    left: 0%;
                }

                50% {
                    width: 100%;
                    left: 0%;
                }

                100% {
                    width: 0%;
                    left: 100%;
                }
            }

            @keyframes widthLineRight {
                0% {
                    width: 0%;
                    right: 0%;
                }

                50% {
                    width: 100%;
                    right: 0%;
                }

                100% {
                    width: 0%;
                    right: 100%;
                }
            }
        </style>
        <style>
            body {
                margin: 0;
                height: 100vh;
                font-weight: 100;
                background: radial-gradient(#a23982, #1f1013);
                -webkit-overflow-Y: hidden;
                -moz-overflow-Y: hidden;
                -o-overflow-Y: hidden;
                overflow-y: hidden;
                -webkit-animation: fadeIn 1 1s ease-out;
                -moz-animation: fadeIn 1 1s ease-out;
                -o-animation: fadeIn 1 1s ease-out;
                animation: fadeIn 1 1s ease-out;
            }

            .light {
                position: absolute;
                width: 0px;
                opacity: .75;
                background-color: white;
                box-shadow: #e9f1f1 0px 0px 20px 2px;
                opacity: 0;
                top: 100vh;
                bottom: 0px;
                left: 0px;
                right: 0px;
                margin: auto;
            }

            .x1 {
                -webkit-animation: floatUp 4s infinite linear;
                -moz-animation: floatUp 4s infinite linear;
                -o-animation: floatUp 4s infinite linear;
                animation: floatUp 4s infinite linear;
                -webkit-transform: scale(1.0);
                -moz-transform: scale(1.0);
                -o-transform: scale(1.0);
                transform: scale(1.0);
            }

            .x2 {
                -webkit-animation: floatUp 7s infinite linear;
                -moz-animation: floatUp 7s infinite linear;
                -o-animation: floatUp 7s infinite linear;
                animation: floatUp 7s infinite linear;
                -webkit-transform: scale(1.6);
                -moz-transform: scale(1.6);
                -o-transform: scale(1.6);
                transform: scale(1.6);
                left: 15%;
            }

            .x3 {
                -webkit-animation: floatUp 2.5s infinite linear;
                -moz-animation: floatUp 2.5s infinite linear;
                -o-animation: floatUp 2.5s infinite linear;
                animation: floatUp 2.5s infinite linear;
                -webkit-transform: scale(.5);
                -moz-transform: scale(.5);
                -o-transform: scale(.5);
                transform: scale(.5);
                left: -15%;
            }

            .x4 {
                -webkit-animation: floatUp 4.5s infinite linear;
                -moz-animation: floatUp 4.5s infinite linear;
                -o-animation: floatUp 4.5s infinite linear;
                animation: floatUp 4.5s infinite linear;
                -webkit-transform: scale(1.2);
                -moz-transform: scale(1.2);
                -o-transform: scale(1.2);
                transform: scale(1.2);
                left: -34%;
            }

            .x5 {
                -webkit-animation: floatUp 8s infinite linear;
                -moz-animation: floatUp 8s infinite linear;
                -o-animation: floatUp 8s infinite linear;
                animation: floatUp 8s infinite linear;
                -webkit-transform: scale(2.2);
                -moz-transform: scale(2.2);
                -o-transform: scale(2.2);
                transform: scale(2.2);
                left: -57%;
            }

            .x6 {
                -webkit-animation: floatUp 3s infinite linear;
                -moz-animation: floatUp 3s infinite linear;
                -o-animation: floatUp 3s infinite linear;
                animation: floatUp 3s infinite linear;
                -webkit-transform: scale(.8);
                -moz-transform: scale(.8);
                -o-transform: scale(.8);
                transform: scale(.8);
                left: -81%;
            }

            .x7 {
                -webkit-animation: floatUp 5.3s infinite linear;
                -moz-animation: floatUp 5.3s infinite linear;
                -o-animation: floatUp 5.3s infinite linear;
                animation: floatUp 5.3s infinite linear;
                -webkit-transform: scale(3.2);
                -moz-transform: scale(3.2);
                -o-transform: scale(3.2);
                transform: scale(3.2);
                left: 37%;
            }

            .x8 {
                -webkit-animation: floatUp 4.7s infinite linear;
                -moz-animation: floatUp 4.7s infinite linear;
                -o-animation: floatUp 4.7s infinite linear;
                animation: floatUp 4.7s infinite linear;
                -webkit-transform: scale(1.7);
                -moz-transform: scale(1.7);
                -o-transform: scale(1.7);
                transform: scale(1.7);
                left: 62%;
            }

            .x9 {
                -webkit-animation: floatUp 4.1s infinite linear;
                -moz-animation: floatUp 4.1s infinite linear;
                -o-animation: floatUp 4.1s infinite linear;
                animation: floatUp 4.1s infinite linear;
                -webkit-transform: scale(0.9);
                -moz-transform: scale(0.9);
                -o-transform: scale(0.9);
                transform: scale(0.9);
                left: 85%;
            }

            @-webkit-keyframes floatUp {
                0% {
                    top: 100vh;
                    opacity: 0;
                }

                25% {
                    opacity: 1;
                }

                50% {
                    top: 0vh;
                    opacity: .8;
                }

                75% {
                    opacity: 1;
                }

                100% {
                    top: -100vh;
                    opacity: 0;
                }
            }

            @-moz-keyframes floatUp {
                0% {
                    top: 100vh;
                    opacity: 0;
                }

                25% {
                    opacity: 1;
                }

                50% {
                    top: 0vh;
                    opacity: .8;
                }

                75% {
                    opacity: 1;
                }

                100% {
                    top: -100vh;
                    opacity: 0;
                }
            }

            @-o-keyframes floatUp {
                0% {
                    top: 100vh;
                    opacity: 0;
                }

                25% {
                    opacity: 1;
                }

                50% {
                    top: 0vh;
                    opacity: .8;
                }

                75% {
                    opacity: 1;
                }

                100% {
                    top: -100vh;
                    opacity: 0;
                }
            }

            @keyframes floatUp {
                0% {
                    top: 100vh;
                    opacity: 0;
                }

                25% {
                    opacity: 1;
                }

                50% {
                    top: 0vh;
                    opacity: .8;
                }

                75% {
                    opacity: 1;
                }

                100% {
                    top: -100vh;
                    opacity: 0;
                }
            }

            @-webkit-keyframes fadeIn {
                from {
                    opacity: 0;
                }

                to {
                    opacity: 1;
                }
            }

            @-moz-keyframes fadeIn {
                from {
                    opacity: 0;
                }

                to {
                    opacity: 1;
                }
            }

            @-o-keyframes fadeIn {
                from {
                    opacity: 0;
                }

                to {
                    opacity: 1;
                }
            }

            @keyframes fadeIn {
                from {
                    opacity: 0;
                }

                to {
                    opacity: 1;
                }
            }

            @-webkit-keyframes fadeOut {
                0% {
                    opacity: 0;
                }

                30% {
                    opacity: 1;
                }

                80% {
                    opacity: .9;
                }

                100% {
                    opacity: 0;
                }
            }

            @-moz-keyframes fadeOut {
                0% {
                    opacity: 0;
                }

                30% {
                    opacity: 1;
                }

                80% {
                    opacity: .9;
                }

                100% {
                    opacity: 0;
                }
            }

            @-o-keyframes fadeOut {
                0% {
                    opacity: 0;
                }

                30% {
                    opacity: 1;
                }

                80% {
                    opacity: .9;
                }

                100% {
                    opacity: 0;
                }
            }

            @keyframes fadeOut {
                0% {
                    opacity: 0;
                }

                30% {
                    opacity: 1;
                }

                80% {
                    opacity: .9;
                }

                100% {
                    opacity: 0;
                }
            }

            @-webkit-keyframes finalFade {
                0% {
                    opacity: 0;
                }

                30% {
                    opacity: 1;
                }

                80% {
                    opacity: .9;
                }

                100% {
                    opacity: 1;
                }
            }

            @-moz-keyframes finalFade {
                0% {
                    opacity: 0;
                }

                30% {
                    opacity: 1;
                }

                80% {
                    opacity: .9;
                }

                100% {
                    opacity: 1;
                }
            }

            @-o-keyframes finalFade {
                0% {
                    opacity: 0;
                }

                30% {
                    opacity: 1;
                }

                80% {
                    opacity: .9;
                }

                100% {
                    opacity: 1;
                }
            }

            @keyframes finalFade {
                0% {
                    opacity: 0;
                }

                30% {
                    opacity: 1;
                }

                80% {
                    opacity: .9;
                }

                100% {
                    opacity: 1;
                }
            }
        </style>
    </div>
@endsection
