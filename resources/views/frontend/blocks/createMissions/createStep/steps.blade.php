<link rel="stylesheet" href="/css/createMission/steps.css">
<div class="steps-wrapper">
    <div class="step-item step-gpio">
        <button class="move-btn move-left"><i class="fa-solid fa-angle-left"></i></button>
        <div>gpio:123</div>
        <button class="delete-step" id-delete="1"><i class="fa-solid fa-xmark"></i></button>
        <button class="move-btn move-right"><i class="fa-solid fa-angle-right"></i></button>
    </div>
</div>
<div class="submit-btn-wrapper">
    <form class="form-submit-steps" action="/dashboard/missions/update-step-missions-name" method="POST">
        <input type="text" value="{{ $itemRender->id }}" name="id_mission" hidden>
        <input id="input-steps-name-submit" type="text" value="" name="steps_mission_name" hidden>
        <button class="submit-btn step-submit-btn">Save</button>
        @csrf
    </form>
    <br>
    <form class="form-submit-steps" action="">
        <input id="input-steps-name-submit" type="text" value="" name="" hidden>
        <button class="submit-btn step-submit-btn"><i class="fa-regular fa-paper-plane"></i></button>
    </form>
</div>
@php
    $datas = explode('|', $itemRender->steps_mission_name);
    array_shift($datas);
    $datasJson = json_encode($datas);
    echo "<input hidden class='data-steps' type='text' value='$datasJson'>";
@endphp

<script>
    const dataStepsJson = document.querySelector('.data-steps').value
    let dataSteps = JSON.parse(dataStepsJson)

    stepsNameSubmit(dataSteps)
    renderStep(dataSteps)

    function stepsNameSubmit(dataSteps) {
        const stepsNameSubmitEle = document.querySelector('#input-steps-name-submit')
        stepsNameSubmitEle.value = `|${dataSteps.join('|')}`
    }

    function renderStep(data) {
        const stepsWrapper = document.querySelector('.steps-wrapper')
        const htmlStep = []
        data.map((step, index) => {
            const stepMode = step.slice(0, step.indexOf("#"))
            const stepName = step.slice(step.indexOf('#') + 1, step.length)
            return htmlStep.push(
                `<div class="step-item step-${stepMode}">
                    <button id-move="${index}" class="move-btn move-left"><i class="fa-solid fa-angle-left"></i></button>
                    <div>${stepMode}:${stepName}</div>
                    <button class="delete-step" id-delete="${index}"><i class="fa-solid fa-xmark"></i></button>
                    <button id-move="${index}" class="move-btn move-right"><i class="fa-solid fa-angle-right"></i></button>
                </div>`
            )
        })
        stepsWrapper.innerHTML = htmlStep.join("")
        deleteStep(data)
        moveStepLeft(data)
        moveStepRight(data)
        stepsNameSubmit(data)
    }

    function deleteStep(data) {
        const allDeleteBtn = document.querySelectorAll('.delete-step')
        allDeleteBtn.forEach(deleteBtn => {
            deleteBtn.addEventListener('click', (e) => {
                indexDelete = e.target.getAttribute('id-delete')
                data.splice(indexDelete, 1)
                renderStep(data)
                dataSteps = data
            })
        });
    }

    function moveStepLeft(data) {
        const allMoveBtnLeft = document.querySelectorAll('.move-left')
        allMoveBtnLeft.forEach(moveLeftBtn => {
            moveLeftBtn.addEventListener('click', (e) => {
                const indexMove = Number(e.target.getAttribute('id-move'))
                const itemMove = data.splice(indexMove, 1)
                data.splice(indexMove - 1, '', ...itemMove)
                dataSteps = data

                renderStep(data)
            })
        })
    }

    function moveStepRight(data) {
        const allMoveBtnRight = document.querySelectorAll('.move-right')
        allMoveBtnRight.forEach(moveRightBtn => {
            moveRightBtn.addEventListener('click', (e) => {
                const indexMove = Number(e.target.getAttribute('id-move'))
                const itemMove = data.splice(indexMove, 1)
                data.splice(indexMove + 1, '', ...itemMove)
                dataSteps = data
                renderStep(data)
            })
        })
    }
</script>
