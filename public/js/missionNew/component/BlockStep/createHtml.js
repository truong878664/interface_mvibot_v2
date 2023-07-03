const buttonAddStep = `
        <button
            class="btn w-[25px] h-[20px] relative flex justify-center text-[16px] rounded-md mb-2 ml-2  items-center text-sky-500 bg-sky-100 self-center">
                <i class="fa-solid fa-plus"></i>
        </button>
`;
const createHtml = {
    htmlBlock: {
        normal: `
        <div data-block-wrapper="normal" class="flex w-full shadow-block bg-white p-4 rounded-lg my-4">
            <span class="text-red-400 mr-3 w-[20px] h-[20px] flex justify-center items-center">
                <i class="fa-solid fa-bullseye"></i>
            </span>
            <div class="flex-1 flex flex-wrap" data-data-block="normal">
                {{data}}
                ${buttonAddStep}
            </div>
        </div>
        `,
        ifelse: `
        <div data-block-wrapper="ifelse" class="flex w-full shadow-block bg-white p-4 rounded-lg my-4">
        <span class="text-green-400 mr-3 rotate-90 w-[20px] h-[20px] flex justify-center items-center">
            <i class="fa-solid fa-code-fork"></i>
        </span>
        <div class="flex-1 text-[16px]">
            <div class="bg-stone-100 p-4 rounded-lg flex mb-3">
                <span class="font-bold mr-3 text-red-600">If</span>
                <div class="flex-1 flex flex-wrap" data-data-block="condition">
                    {{condition}}
                    ${buttonAddStep}
                </div>
            </div>
            <div class="bg-stone-100 p-4 rounded-lg flex mb-3">
                <span class="font-bold mr-3 text-red-700">Then</span>
                <div class="flex-1 flex flex-wrap" data-data-block="if">
                   {{if_}}
                    ${buttonAddStep}
                </div>
            </div>
            <div class="bg-stone-100 p-4 rounded-lg flex mb-3">
                <span class="font-bold mr-3 text-red-700">Else</span>
                <div class="flex-1 flex flex-wrap" data-data-block="else">
                    {{else_}}
                    ${buttonAddStep}
                </div>
            </div>
        </div>
    </div>
        
        `,
        trycatch: `
        <div data-block-wrapper="trycatch" class="flex w-full shadow-block bg-white p-4 rounded-lg my-4">
            <span class="text-yellow-500 mr-3 w-[20px] h-[20px] flex justify-center items-center">
                <i class="fa-solid fa-triangle-exclamation"></i>
            </span>
            <div class="flex-1 text-[16px]">
                <div class="bg-stone-100 p-4 rounded-lg flex mb-3">
                    <span class="font-bold mr-3 text-red-700">Try</span>
                    <div class="flex-1 flex flex-wrap" data-data-block="try">
                        {{try_}}
                        ${buttonAddStep}
                    </div>
                </div>
                <div class="bg-stone-100 p-4 rounded-lg flex mb-3">
                    <span class="font-bold mr-3 text-red-700">Catch</span>
                    <div class="flex-1 flex flex-wrap" data-data-block="catch">
                        {{catch_}}
                        ${buttonAddStep}
                    </div>
                </div>
            </div>
        </div>
        `,
        while: `
        <div data-block-wrapper="while" class="flex w-full shadow-block bg-white p-4 rounded-lg my-4">
            <span class="text-sky-400 mr-3 rotate-90 w-[20px] h-[20px] flex justify-center items-center">
                <i class="fa-solid fa-arrows-spin"></i>
            </span>
            <div class="flex-1 text-[16px]">
                <div class="bg-stone-100 p-4 rounded-lg flex mb-3">
                    <span class="font-bold mr-3 text-red-700">While</span>
                    <div class="flex-1 flex flex-wrap" data-data-block="condition">
                        {{condition}}
                        ${buttonAddStep}
                    </div>
                </div>
                <div class="bg-stone-100 p-4 rounded-lg flex mb-3">
                    <span class="font-bold mr-3 text-red-700">Do</span>
                    <div class="flex-1 flex flex-wrap" data-data-block="do">
                        {{do_}}
                        ${buttonAddStep}
                    </div>
                </div>
            </div>
        </div>
        `,
        logicAnd: `
        <div data-block-wrapper="logic_and" class="inline-flex shadow-block bg-white p-4 rounded-lg my-4 mr-4">
            <div class="flex-1 text-[16px] flex">
                <div class="bg-stone-100 p-4 rounded-lg flex mb-3">
                    <div class="flex-1 flex flex-wrap" data-data-block="logicA">
                        {{logicA}}
                        ${buttonAddStep}
                    </div>
                </div>
                <span class="px-4 font-bold text-red-700">AND</span>
                <div class="bg-stone-100 p-4 rounded-lg flex mb-3">
                    <div class="flex-1 flex flex-wrap" data-data-block="logicB">
                        {{logicB}}
                        ${buttonAddStep}
                    </div>
                </div>
            </div>
        </div>
        `,
        logicOr: `
        <div data-block-wrapper="logic_or" class="inline-flex shadow-block bg-white p-4 rounded-lg my-4 mr-4">
            <div class="flex-1 text-[16px] flex">
                <div class="bg-stone-100 p-4 rounded-lg flex mb-3">
                    <div class="flex-1 flex flex-wrap" data-data-block="logicA">
                        {{logicA}}
                        ${buttonAddStep}
                    </div>
                </div>
                <span class="px-4 font-bold text-red-700">OR</span>
                <div class="bg-stone-100 p-4 rounded-lg flex mb-3">
                    <div class="flex-1 flex flex-wrap" data-data-block="logicB">
                        {{logicB}}
                        ${buttonAddStep}
                    </div>
                </div>
            </div>
        </div>
        `,
    },
    normal({ normal }) {
        return this.htmlBlock.normal.replace("{{data}}", normal.join(""));
    },
    ifelse({ condition, if_, else_ }) {
        return this.htmlBlock.ifelse
            .replace("{{condition}}", condition.join(""))
            .replace("{{if_}}", if_.join(""))
            .replace("{{else_}}", else_.join(""));
    },
    trycatch({ try_, catch_ }) {
        return this.htmlBlock.trycatch
            .replace("{{try_}}", try_.join(""))
            .replace("{{catch_}}", catch_.join(""));
    },
    while({ condition, do_ }) {
        return this.htmlBlock.while
            .replace("{{condition}}", condition.join(""))
            .replace("{{do_}}", do_.join(""));
    },

    logicAnd({ logicA, logicB }) {
        return this.htmlBlock.logicAnd
            .replace("{{logicA}}", logicA.join(""))
            .replace("{{logicB}}", logicB.join(""));
    },
    logicOr({ logicA, logicB }) {
        return this.htmlBlock.logicOr
            .replace("{{logicA}}", logicA.join(""))
            .replace("{{logicB}}", logicB.join(""));
    },
};

export default createHtml;
