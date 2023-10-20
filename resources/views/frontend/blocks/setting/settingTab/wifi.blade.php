<style>
    .active .show,
    .hide {
        display: none;
    }

    .active .hide,
    .show {
        display: block;
    }

    #medium .medium,
    #height .height,
    #low .low {
        fill: black
    }

    .loader-wifi {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        position: relative;
        border: 4px solid;
        border-color: rgba(128, 128, 128, 0.15) rgba(128, 128, 128, 0.25) rgba(128, 128, 128, 0.35) rgba(128, 128, 128, 0.5);
        box-sizing: border-box;
        animation: rotation 1.5s linear infinite;
    }

    @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
</style>

<div class="setting-detail flex flex-col hidden h-full">
    <div class="max-w-[700px] w-full h-full mx-auto overflow-auto">
        <div class="w-full h-[calc(100%_-_32px)] flex rounded-lg pr-4 overflow-auto text-2xl relative wifi-container group/wifi-container active"
            data-wifi-connect="wifi">
            <div class=" w-full max-w-[800px] h-[calc(100%_-_200px)] mx-auto mt-10 relative">
                <div class="w-full min-h-[80px] rounded-lg bg-[#F2EAE8] pl-[40px] pr-10 mb-[20px] py-[20px]">
                    <div class="flex justify-between mb-8">
                        <span class="font-bold">WI-FI</span>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="radio" name="wifi-type" class="sr-only peer/wifi" id="wifi-connect">
                            <div
                                class="w-[44px] h-[26px] bg-gray-200 rounded-full peer dark:bg-gray-300 peer-checked/wifi:after:translate-x-full peer-checked/wifi:after:border-white after:content-[''] after:absolute after:top-1/2 after:left-[2px] after:-translate-y-1/2 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[20px] after:w-[20px] after:transition-all dark:border-gray-300 peer-checked/wifi:bg-blue-600">
                            </div>
                        </label>
                    </div>

                    <div class="flex justify-between">
                        <span class="font-bold">HOTS-POT</span>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="radio" name="wifi-type" class="sr-only peer/hots-pot" id="hots-pot">
                            <div
                                class="w-[44px] h-[26px] bg-gray-200 rounded-full peer dark:bg-gray-300 peer-checked/hots-pot:after:translate-x-full peer-checked/hots-pot:after:border-white after:content-[''] after:absolute after:top-1/2 after:left-[2px] after:-translate-y-1/2 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[20px] after:w-[20px] after:transition-all dark:border-gray-300 peer-checked/hots-pot:bg-blue-600">
                            </div>
                        </label>
                    </div>
                </div>

                <div class="group-data-[wifi-connect=hots-pot]/wifi-container:hidden">
                    {{-- WIFI CONNECTED --}}
                    <div class="w-full h-[80px] rounded-lg bg-[#F2EAE8]  pl-[40px] pr-10 mb-[40px]">
                        <div class="flex justify-between items-center h-full wifi-connect-item hidden">
                            <div class="">
                                <label for="" class="text-sky-600"><i class="fa-solid fa-check"></i></label>
                                <span class="font-bold ml-4 wifi-connected text-2xl"></span>
                            </div>
                            <div class="">
                                <svg width="40" height="40" viewBox="0 0 40 20" fill="none"
                                    class="wifi-icon-connected" id="" xmlns="http://www.w3.org/2000/svg">
                                    <circle class="low medium height" fill="#9a9a9a" cx="19.9849" cy="16.9683"
                                        r="2.85505" />
                                    <path class="height medium" fill="#9a9a9a"
                                        d="M28.5102 12.3681C29.0941 11.8562 29.1572 10.9611 28.5843 10.437C27.5973 9.5341 26.4726 8.78972 25.2497 8.23339C23.5992 7.4825 21.8079 7.09138 19.9946 7.08599C18.1814 7.08061 16.3877 7.46109 14.7328 8.20216C13.5067 8.75121 12.3775 9.4889 11.3852 10.3859C10.8091 10.9067 10.8669 11.802 11.4478 12.3174V12.3174C12.0286 12.8329 12.9117 12.7708 13.5036 12.2681C14.2199 11.66 15.0203 11.1546 15.8821 10.7687C17.1729 10.1907 18.5719 9.89388 19.9863 9.89808C21.4006 9.90228 22.7978 10.2074 24.0852 10.793C24.9447 11.1841 25.7421 11.6942 26.4547 12.3066C27.0436 12.8127 27.9263 12.8801 28.5102 12.3681V12.3681Z" />
                                    <path class="height" fill="#9a9a9a"
                                        d="M33.7825 7.51599C34.3573 6.99541 34.4044 6.10346 33.8448 5.56666C32.171 3.96105 30.2278 2.65629 28.1007 1.71396C25.5448 0.58174 22.7801 -0.00213281 19.9847 5.85337e-06C17.1893 0.00214452 14.4255 0.590247 11.8714 1.72637C9.74564 2.67196 7.80452 3.97969 6.13312 5.58786C5.57433 6.12552 5.62286 7.01739 6.19839 7.5371V7.5371C6.77392 8.0568 7.65805 8.00678 8.22297 7.47557C9.62704 6.15529 11.2457 5.07815 13.0127 4.29213C15.2082 3.31552 17.584 2.80999 19.9868 2.80815C22.3897 2.80632 24.7663 3.30821 26.9633 4.28145C28.7315 5.06477 30.3518 6.13943 31.7578 7.45756C32.3236 7.98791 33.2078 8.03657 33.7825 7.51599V7.51599Z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-between">
                        <div class="flex items-center mb-4">
                            <span class="text-2xl block font-bold">Network available</span>
                            <span class="loader-wifi hidden ml-4"></span>
                        </div>
                        <button class="btn reset-wifi-btn">Reset</button>
                    </div>

                    {{-- NETWORK ABAILABLE --}}
                    <div
                        class="w-full min-h-[0px] max-h-full rounded-lg bg-[#F2EAE8] pl-[40px] relative overflow-auto flex flex-col justify-between">
                        <div class="wifi-wrapper">
                            <div class="w-full h-[60px] border-b border-[rgba(67,67,67,0.1)] flex justify-between items-center hover:bg-[#cccccc39] cursor-pointer wifi-item hidden"
                                name-wifi="${item.ssid}">
                                <span class="font-bold ml-4"></span>

                                <div class="text-2xl flex items-center pr-4">
                                    <div class="">
                                        <i class="fa-solid fa-lock"></i>
                                    </div>
                                    <div class="">
                                        <svg width="40" height="40" viewBox="0 0 40 20" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <circle class="low medium height" fill="#9a9a9a" cx="19.9849"
                                                cy="16.9683" r="2.85505" />
                                            <path class="height medium" fill="#9a9a9a"
                                                d="M28.5102 12.3681C29.0941 11.8562 29.1572 10.9611 28.5843 10.437C27.5973 9.5341 26.4726 8.78972 25.2497 8.23339C23.5992 7.4825 21.8079 7.09138 19.9946 7.08599C18.1814 7.08061 16.3877 7.46109 14.7328 8.20216C13.5067 8.75121 12.3775 9.4889 11.3852 10.3859C10.8091 10.9067 10.8669 11.802 11.4478 12.3174V12.3174C12.0286 12.8329 12.9117 12.7708 13.5036 12.2681C14.2199 11.66 15.0203 11.1546 15.8821 10.7687C17.1729 10.1907 18.5719 9.89388 19.9863 9.89808C21.4006 9.90228 22.7978 10.2074 24.0852 10.793C24.9447 11.1841 25.7421 11.6942 26.4547 12.3066C27.0436 12.8127 27.9263 12.8801 28.5102 12.3681V12.3681Z" />
                                            <path class="height" fill="#9a9a9a"
                                                d="M33.7825 7.51599C34.3573 6.99541 34.4044 6.10346 33.8448 5.56666C32.171 3.96105 30.2278 2.65629 28.1007 1.71396C25.5448 0.58174 22.7801 -0.00213281 19.9847 5.85337e-06C17.1893 0.00214452 14.4255 0.590247 11.8714 1.72637C9.74564 2.67196 7.80452 3.97969 6.13312 5.58786C5.57433 6.12552 5.62286 7.01739 6.19839 7.5371V7.5371C6.77392 8.0568 7.65805 8.00678 8.22297 7.47557C9.62704 6.15529 11.2457 5.07815 13.0127 4.29213C15.2082 3.31552 17.584 2.80999 19.9868 2.80815C22.3897 2.80632 24.7663 3.30821 26.9633 4.28145C28.7315 5.06477 30.3518 6.13943 31.7578 7.45756C32.3236 7.98791 33.2078 8.03657 33.7825 7.51599V7.51599Z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {{-- OTHER WIFI --}}
                        <div
                            class="w-full h-[60px] flex justify-between items-center hover:bg-[#cccccc39] cursor-pointer other-wifi-btn">
                            <span class="font-bold ml-4">Other . . .</span>
                        </div>
                        {{-- END OTHER WIFI --}}
                    </div>
                </div>
                {{-- OVERLAY CONECT --}}
                <div class="overlay-wifi fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.2)] z-20 hidden">
                    {{-- FORM CONNECT --}}
                    <div
                        class="absolute w-full max-w-[600px] bg-[#FFF] top-16 left-1/2 -translate-x-1/2 Z-[21] rounded-2xl shadow-lg p-10 hidden form-enter-password z-[100]">
                        <div class="flex justify-between">
                            <button class="mt-2 btn cancel-wifi-btn font-bold">Cancel</button>
                            <label class="font-bold text-[16px]">Enter password <span class="label-wifi"></span></label>
                            <button class="mt-2 btn connect-wifi-btn disabled:opacity-50 font-bold"
                                disabled>Connect</button>
                        </div>

                        <div
                            class="w-full h-[60px] rounded-xl bg-[#e6e6e6] mt-7 flex items-center px-10 name-wifi-wrapper hidden">
                            <span class="font-bold mr-4">Name</span>
                            <input
                                class="flex-1 text-[16px] bg-transparent border-none outline-none tracking-[2px] py-4"
                                type="text" name="" id="name-wifi">
                        </div>

                        <div data-status="pending"
                            class="w-full h-[60px] rounded-xl bg-[#e6e6e6] mt-7 flex items-center px-10">
                            <span class="font-bold mr-4">Password</span>
                            <input
                                class="flex-1 text-[16px] bg-transparent border-none outline-none tracking-[2px] py-4"
                                type="password" name="" id="password-wifi">
                            <button class="show-password-btn outline-none">
                                <i class="fa-regular fa-eye show"></i>
                                <i class="fa-regular fa-eye-slash hide"></i>
                            </button>
                        </div>

                        {{-- SET IP --}}

                        <div class="w-full flex text-2xl px-8 py-4 mt-8  peer/wifi-type type-wifi-wrapper"
                            data-is-manual="false">
                            <span class="font-bold min-w-[70px]">WI-FI type</span>
                            <div class="ml-8">
                                <div class="flex items-center mb-7">
                                    <input type="radio" name="wifi_type" id="wifi-auto" value="auto" checked>
                                    <label for="wifi-auto" class="ml-2">auto</label>
                                </div>
                                <div class="flex items-center">
                                    <input type="radio" name="wifi_type" id="wifi-manual" value="manual">
                                    <label for="wifi-manual" class="ml-2">manual</label>
                                </div>
                            </div>
                        </div>

                        {{-- === IP WRAPPPER === --}}
                        <div class="peer-data-[is-manual=false]/wifi-type:hidden">
                            {{-- LAN IPV4 --}}
                            <div class="mx-8 my-6 flex justify-between text-2xl">
                                <span class="font-bold">Ip v4</span>
                                <div class="border inline-block py-2 px-1 rounded-md bg-gray-200">
                                    <input class="w-[50px] text-center border-none bg-transparent wifi_ipv4"
                                        type="number">
                                    <span>.</span>
                                    <input class="w-[50px] text-center border-none bg-transparent wifi_ipv4"
                                        type="number">
                                    <span>.</span>
                                    <input class="w-[50px] text-center border-none bg-transparent wifi_ipv4"
                                        type="number">
                                    <span>.</span>
                                    <input class="w-[50px] text-center border-none bg-transparent wifi_ipv4"
                                        type="number">
                                </div>
                            </div>
                            {{-- LAN IPV4 GATEWAY --}}
                            <div class="mx-8 my-6 flex justify-between text-2xl">
                                <span class="font-bold">Ip v4 gateway</span>
                                <div class="border inline-block py-2 px-1 rounded-md bg-gray-200">
                                    <input class="w-[50px] text-center border-none bg-transparent wifi_ipv4_gateway"
                                        type="number">
                                    <span>.</span>
                                    <input class="w-[50px] text-center border-none bg-transparent wifi_ipv4_gateway"
                                        type="number">
                                    <span>.</span>
                                    <input class="w-[50px] text-center border-none bg-transparent wifi_ipv4_gateway"
                                        type="number">
                                    <span>.</span>
                                    <input class="w-[50px] text-center border-none bg-transparent wifi_ipv4_gateway"
                                        type="number">
                                </div>
                            </div>
                            {{-- LAN IPV4 DNS --}}
                            <div class="mx-8 my-6 flex justify-between text-2xl">
                                <span class="font-bold">Ip v4 DNS</span>
                                <input type="text"
                                    class="h-[32px] w-[275px] px-4 text-right rounded-md border-none bg-gray-200 wifi_ipv4_dns">
                            </div>
                            {{-- END IP V4 DNS --}}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>

<script>
    const wifiTypes = document.getElementsByName('wifi_type')
    wifiTypes.forEach(wifiType => {
        wifiType.onchange = e => {
            const isManual = e.target.value === 'manual' ? true : false;
            document.querySelector('.type-wifi-wrapper').dataset.isManual = isManual
        }
    });
</script>
