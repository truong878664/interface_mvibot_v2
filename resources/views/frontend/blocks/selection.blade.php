<style>
    .dropdown {
        position: relative;
        width: 200px;
        height: 30px;
        color: #fff;
    }

    .dropdown.active::before {
        top: 22px;
        transform: rotate(-225deg);
    }

    .dropdown input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
        border: none;
        outline: none;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
        padding: 12px 20px;
        border-radius: 4px;
    }

    .dropdown input::placeholder {
        font-weight: bold;
        color: #000;
    }

    .dropdown .options {
        position: absolute;
        top: 40px;
        width: 100%;
        background: #fff;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
        border-radius: 10px;
        overflow: hidden;
        display: none;
        z-index: 1;
        max-height: 400px;
        overflow: auto;
    }

    .dropdown.active .options {
        display: block;
    }

    .dropdown .options div {
        padding: 12px 20px;
        cursor: pointer;
        color: #000;
    }

    .dropdown .options div:hover {
        background: #62baea;
        color: #fff;
    }

    .dropdown .options div ion-icon {
        position: relative;
        top: 4px;
        margin-right: 10px;
    }
</style>

<div class="text-2xl">
    <div class="group/dropdown dropdown">
        <div class="">
            <input class="text-box bg-[#fff] text-[#000] shadow-md" type="text" placeholder="Select map"
                id="{{ $id }}" readonly>
            <div
                class="absolute top-0 right-[10px] text-3xl text-[#0f6cbd] h-full flex items-center group-[.active]/dropdown:rotate-180 transition-all duration-500">
                <i class="fa-solid fa-caret-down"></i>
            </div>
        </div>
        <div class="options">
            @foreach ($datas as $data)
                <div class="{{ $id . '-item' }}" data-map="{{ $data[$nameArray] }}"
                    onclick="show('{{ $data[$nameArray] }}', this)"><i
                        class="fa-solid fa-caret-right mr-4 text-[#0f6cbd]"></i>{{ $data[$nameArray] }}</div>
            @endforeach
            <div onclick="show('', this)"> - {{ $title }} - </div>
        </div>
    </div>
</div>
<script>
    function show(value, element) {
        const inputSelect = element.closest('.dropdown').querySelector('.text-box')
        inputSelect.value = value;
        inputSelect.dispatchEvent(new Event('change'));
    }

    document.querySelectorAll(".dropdown").forEach(dropdown => {
        dropdown.onclick = function() {
            dropdown.classList.toggle("active")
        }
    });
</script>
