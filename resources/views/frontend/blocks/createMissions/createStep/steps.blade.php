<link rel="stylesheet" href="/css/createMission/steps.css">
<div class="steps-wrapper">
    {{-- <div class="step-item step-footprint">GPIO</div>

    <div class="step-item-wrapper">
        <div class="arrow"></div>
        <div class="step-item">
            <div class="step-point">Point 1</div>
        </div>
    </div>
    <div class="step-item step-gpio">footprint</div>
    <div class="step-item step-marker">footprint</div>
    
    <div    class="step-item step-sound">footprint</div>
    <div class="step-item step-sleep">footprint</div> --}}
    {{-- <input type="text" value=""> --}}
    {{-- @foreach ($datas as $value)
        @php
        $item = substr($value, 0, strpos($value, '#'));
        @endphp
        <div class="step-item step-{{ $item }}">{{ $item }}</div>
        @endforeach --}}
</div>
@php
    $datas = explode('|', $itemRender->steps_mission_name);
    array_shift($datas);
    $datasJson = json_encode($datas);
    // dd($datas);
    echo "<input hidden class='data-steps' type='text' value='$datasJson'>";
@endphp

<script>
    const dataStepsJson = document.querySelector('.data-steps').value
    const dataSteps = JSON.parse(dataStepsJson)
    // console.log(dataSteps)
    const stepsWrapper = document.querySelector('.steps-wrapper')
    const htmlStep = []
    dataSteps.map(step => {
        const stepMode = step.slice(0, step.indexOf("#"))
        const stepName = step.slice(step.indexOf('#') + 1, step.length)
        console.log(step)
        return htmlStep.push(`<div class="step-item step-${stepMode}">${stepMode}:${stepName}</div>`)
    });

    stepsWrapper.innerHTML = htmlStep.join("")
    // console.log(htmlStep)
    // console.log($datas)
    // const datas = ["GPIO", "point", "Footpsdfsdfrint", "GPIggasdO", "point", "Footprint", "GPIO", "poiaasdnt",
    //     "Footprint", "GPIO",
    //     "point", "Footprasfint", "GasfPIO", "poiasfnt", "Footpasfrint", "GPIO", "point", "Footprint", "GPIO",
    //     "point",
    //     "Footpriasfnt", "GPIO", "point", "Footprint", "GPIO", "poinasft", "Footasdfprint", "GPIO", "point",
    //     "Footprint",
    //     "GPIO", "point", "Footpsafrint", "GPasdfIO", "point", "Footprint", "GPIO", "point", "Footprint", "GPIO",
    //     "point",
    //     "Footprint", "GPIO", "point", "Footprint", "GPIO", "point", "Footprint",
    // ]

    // renderSteps(datas)

    // function renderSteps(datas) {
    //     const stepWrappre = document.querySelector('.steps-wrapper')
    //     const html = []
    //     datas.map(item => {
    //         html.push(`<div class="step-item">${item}</div>`)
    //         return html
    //     })
    //     stepWrappre.innerHTML = html.join('')
    // }
</script>
