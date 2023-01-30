<div class="setting-detail hidden">
    <div class="w-1/2 mx-auto mt-10">
        <table class="w-full border text-2xl" id="table-sound">
            <tr class="text-center">
                <th class="border border-solit border-[#ccc] py-2">STT</th>
                <th class="border border-solit border-[#ccc] py-2">Name</th>
                <th class="border border-solit border-[#ccc] py-2">Time</th>
                <th class="border border-solit border-[#ccc] py-2">Action</th>
            </tr>
        </table>

        @php
            function getSound()
            {
                $fileSound = json_encode(glob('sound/*'));
                echo $fileSound;
            }
            
        @endphp

        <input type="hidden" class="pathSound" value="">
        {{-- <button
            class="px-4 py-2 bg-blue-500 text-[#fff] text-[16px] btn rounded-md opacity-80 hover:opacity-100 float-right mt-2 add-sound">
            <span class="mr-2">Add sound</span>
        </button> --}}
        <script>
            function getPathSound() {
                const pathSound = '<?php getSound(); ?>';
                document.querySelector(".pathSound").value = pathSound;
            }
        </script>
    </div>
</div>
