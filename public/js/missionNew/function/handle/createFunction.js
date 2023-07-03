const createFunctionBtn = document.querySelectorAll('.create-step-btn')
export default function createFunction() {
    createFunctionBtn.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const typeMission = btn.dataset.typeMission
        })
    })
}