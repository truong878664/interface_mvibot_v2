<p class="heading-form-mission">GPIO</p>
<form method="POST" action="/dashboard/missions/create-gpio" class="gpio_form">
    <div class="name-gpio">
        <label for="name-gpio">Name</label>
        <input required name="name_gpio" id="name_gpio" type="text">
    </div>
    <div class="time-out">
        <label for="time-out"> Time out</label>
        <input name="time_out" id="time_out" type="number">
    </div>
    <div class="data-gpio">
        <div class="data-gpio-wrapper">
            <div class="data-gpio-item">
                <label for="out_set">out_set</label>
                <input type="text" hidden name="out_set" id="out_set">
                <button class="create-gpio"><i class="fa-solid fa-plus-minus"></i></button>

                <div class="show-gpio-wrapper"></div>

                @include('frontend.blocks.createMissions.createStep.function.checkboxGpio')
            </div>
            <div class="data-gpio-item">
                <label for="out_reset">out_reset</label>
                <input type="text" hidden name="out_reset" id="out_reset" />
                <button class="create-gpio"><i class="fa-solid fa-plus-minus"></i></button>
                <div class="show-gpio-wrapper"></div>


                @include('frontend.blocks.createMissions.createStep.function.checkboxGpio')
            </div>
            <div class="data-gpio-item">
                <label for="in_on">in_on</label>
                <input type="text" hidden name="in_on" id="in_on" />
                <button class="create-gpio"><i class="fa-solid fa-plus-minus"></i></button>
                <div class="show-gpio-wrapper"></div>


                @include('frontend.blocks.createMissions.createStep.function.checkboxGpio')
            </div>
        </div>
        <div class="data-gpio-wrapper">
            <div class="data-gpio-item">
                <label for="in_off">in_off</label>
                <input type="text" hidden name="in_off" id="in_off" />
                <button class="create-gpio"><i class="fa-solid fa-plus-minus"></i></button>
                <div class="show-gpio-wrapper"></div>


                @include('frontend.blocks.createMissions.createStep.function.checkboxGpio')
            </div>

            <div class="data-gpio-item">
                <label for="in_pullup">in_pullup</label>
                <input type="text" hidden name="in_pullup" id="in_pullup" />
                <button class="create-gpio"><i class="fa-solid fa-plus-minus"></i></button>
                <div class="show-gpio-wrapper"></div>


                @include('frontend.blocks.createMissions.createStep.function.checkboxGpio')
            </div>


            <div class="data-gpio-item">
                <label for="in_pulldown">in_pulldown</label>
                <input type="text" name="in_pulldown" id="in_pulldown" hidden>
                <button class="create-gpio"><i class="fa-solid fa-plus-minus"></i></button>
                <div class="show-gpio-wrapper"></div>

                @include('frontend.blocks.createMissions.createStep.function.checkboxGpio')
            </div>
        </div>
    </div>

    @include('frontend.blocks.createMissions.createStep.function.idMission')
    <x-button tag="button" title="Add" class="add-btn" attribute=""></x-button>
    @csrf
</form>
<style>
    .create-gpio {
        width: 20px;
        height: 20px;
        border: none;
        background: rgba(204, 204, 204, 0.295);
        color: rgba(51, 51, 51, 0.548);
    }

    .item-gpio {
        width: 20px;
        height: 20px;
        border: none;
        background: rgba(204, 204, 204, 0.295);
        font-size: 1.4rem;
        text-align: center;
        line-height: 20px;
        margin: 0 4px;
    }

    .data-gpio-item.show .form-gpio-item {
        display: flex;
    }

    .form-gpio-item {
        flex-wrap: wrap;
        position: absolute;
        bottom: 120%;
        left: 10%;
        background: #fff;
        box-shadow: 2px 2px 10px #ccc;
        padding: 6px 0;
        display: none;

    }

    .data-gpio {
        display: flex;
    }

    .data-gpio-item {
        /* width: calc(50% - 12px); */
        display: flex;
        flex-wrap: wrap;
        margin: 6px;
        position: relative;
    }

    .data-gpio-wrapper {
        width: 50%;

    }


    .checkbox-wrapper {
        display: flex;
        font-size: 1.4rem;
        margin: 2px 4px;
        background: rgba(204, 204, 204, 0.479);
        padding: 2px 4px;
        border-radius: 4px;
        cursor: pointer;
    }

    .checkbox-wrapper label {
        margin-left: 6px;
        margin-right: 4px;
        user-select: none;
        cursor: pointer;

    }

    .create-gpio {
        margin: 0 4px;
    }

    .show-gpio-wrapper {
        display: flex;
        flex-wrap: wrap;
    }

    .item-gpio {}

    .hidden-form-gpio-item {
        position: absolute;
        top: 0;
        right: 0;
        background: transparent;
        border: none;
        padding: 4px;
        cursor: pointer;
    }

    .checkbox-gpio {}
</style>
<script>
    const $ = document.querySelector.bind(document)
    const $$ = document.querySelectorAll.bind(document)


    showFormGpio()
    hiddeFormGpio()
    addIdInputCheckbox()

    function showFormGpio() {
        const allCreateGpioBtn = $$('.create-gpio')
        allCreateGpioBtn.forEach(element => {
            element.onclick = (e) => {
                e.preventDefault()
                $('.data-gpio-item.show')?.classList.remove('show')
                element.parentElement.classList.add('show')
                getValueCheckbox(element.parentElement)
            }
        });

    }

    function hiddeFormGpio() {
        $$('.hidden-form-gpio-item').forEach((element) => {
            element.onclick = (e) => {
                e.preventDefault()
                $('.data-gpio-item.show').classList.remove('show')
            }
        })
    }
    const valueGpio = {
        out_set: [],
        out_reset: [],
        in_on: [],
        in_off: [],
        in_pullup: [],
        in_pulldown: [],
    }

    function getValueCheckbox(element) {
        const allCheckBox = element.querySelectorAll("input[type='checkbox']")

        Array.prototype.map.call(allCheckBox, (item) => {
            item.onchange = () => {
                const inputGpio = item.closest('.data-gpio-item').querySelector('input')
                const typeGpio = inputGpio.getAttribute('name')
                if (item.checked) {
                    valueGpio[`${typeGpio}`].push(item.defaultValue)
                } else {
                    valueGpio[`${typeGpio}`].splice(valueGpio[`${typeGpio}`].indexOf(item.defaultValue), 1)
                }
                const html = []
                valueGpio[`${typeGpio}`].map(item => {
                    html.push(`<div class="item-gpio">${item}</div>`)
                })
                element.querySelector('.show-gpio-wrapper').innerHTML = html.join("")
                inputGpio.value = valueGpio[`${typeGpio}`].toString()

            }
        })
    }


    function addIdInputCheckbox() {
        const allLabel = $$('.label-for-checkbox-gpio')
        $$('.checkbox-gpio').forEach((element, index) => {
            element.setAttribute('id', index)
            allLabel[index].setAttribute('for', index)
            console.log(allLabel[index])
        })
    }
</script>
