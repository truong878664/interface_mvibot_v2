<div class="setting-detail hidden">
    <div class="w-1/2 mx-auto mt-10 py-10 px-5 border-stone-300 border bg-stone-200">
        <table class="w-full border text-2xl bg-white" id="table-sound">
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
        {{-- <form action=""> 
            <label for="dropzone-file"
                class="px-4 py-2 bg-[#0f6cbd] text-[#fff] text-[16px] btn rounded-md opacity-80 hover:opacity-100 float-right mt-2 add-sound">
                <i class="fa-solid fa-upload"></i>
                <span class="mr-2">Add sound</span>
                <input id="dropzone-file" type="file" class="hidden" />
            </label>
            <input type="submit" value="df">
        </form> --}}

        <script>
            function getPathSound() {
                const pathSound = '<?php getSound(); ?>';
                document.querySelector(".pathSound").value = pathSound;
            }

        </script>
    </div>
</div>
