<div class="setting-detail flex flex-col hidden h-full">
    <div class="max-w-[700px] w-full h-full mx-auto overflow-auto">
        <div class="max-w-[700px] w-full mx-auto overflow-auto bg-[#F2EAE8] rounded-md">
            @include('frontend.blocks.setting.settingTab.saveButton', ['setting' => 'ethernet'])

            {{-- LAN TYPE --}}
            <div class="w-full flex  px-8 py-4 peer/lan-type type-lan-wrapper" data-is-manual="false">
                <span class="font-bold min-w-[70px]">LAN type</span>
                <div class="ml-8">
                    <div class="flex items-center mb-3">
                        <input type="radio" name="lan_type" id="lan-auto" value="auto" checked>
                        <label for="lan-auto" class="ml-2">auto</label>
                    </div>
                    <div class="flex items-center">
                        <input type="radio" name="lan_type" id="lan-manual" value="manual">
                        <label for="lan-manual" class="ml-2">manual</label>
                    </div>
                </div>
            </div>

            <div class="peer-data-[is-manual=false]/lan-type:hidden">
                {{-- LAN IPV4 --}}
                <div class="mx-8 my-6 flex justify-between text-2xl">
                    <span class="font-bold">Ip v4</span>
                    <div class="border inline-block py-2 px-1 rounded-md bg-gray-200">
                        <input class="w-[50px] text-center border-none bg-transparent" data-ip="lan_ipv4"
                            type="number">
                        <span>.</span>
                        <input class="w-[50px] text-center border-none bg-transparent" data-ip="lan_ipv4"
                            type="number">
                        <span>.</span>
                        <input class="w-[50px] text-center border-none bg-transparent" data-ip="lan_ipv4"
                            type="number">
                        <span>.</span>
                        <input class="w-[50px] text-center border-none bg-transparent" data-ip="lan_ipv4"
                            type="number">
                    </div>
                </div>
                {{-- LAN IPV4 GATEWAY --}}
                <div class="mx-8 my-6 flex justify-between text-2xl">
                    <span class="font-bold">Ip v4 gateway</span>
                    <div class="border inline-block py-2 px-1 rounded-md bg-gray-200">
                        <input class="w-[50px] text-center border-none bg-transparent" data-ip="lan_ipv4_gateway"
                            type="number">
                        <span>.</span>
                        <input class="w-[50px] text-center border-none bg-transparent" data-ip="lan_ipv4_gateway"
                            type="number">
                        <span>.</span>
                        <input class="w-[50px] text-center border-none bg-transparent" data-ip="lan_ipv4_gateway"
                            type="number">
                        <span>.</span>
                        <input class="w-[50px] text-center border-none bg-transparent" data-ip="lan_ipv4_gateway"
                            type="number">
                    </div>
                </div>
                {{-- LAN IPV4 DNS --}}
                <div class="mx-8 my-6 flex justify-between text-2xl">
                    <span class="font-bold">Ip v4 DNS</span>
                    <input type="text" class="h-[32px] w-[275px] px-4 text-right rounded-md border-none bg-gray-200"
                        data-ip="lan_ipv4_dns">
                </div>
                {{-- END IPV4 DNS --}}
            </div>
        </div>
    </div>
</div>
<script>
    const lanTypes = document.getElementsByName('lan_type')
    lanTypes.forEach(lanType => {
        lanType.onchange = e => {
            const isManual = e.target.value === 'manual' ? true : false;
            document.querySelector('.type-lan-wrapper').dataset.isManual = isManual
        }
    });
</script>
