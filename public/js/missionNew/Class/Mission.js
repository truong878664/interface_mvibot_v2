export default class Mission {
    Normal({ data = "" }) {
        return {
            type: "normal",
            data: {
                normal: data.split("|").filter((i) => i) || [],
            },
        };
    }
    IfElse({ data = "" }) {
        const dataIfElse = data?.split("?");
        const condition = dataIfElse[0]?.split("|").filter((i) => i) || [];
        const if_ = dataIfElse[1]?.split("|").filter((i) => i) || [];
        const else_ = dataIfElse[2]?.split("|").filter((i) => i) || [];
        return {
            type: "ifelse",
            data: {
                condition,
                if_,
                else_,
            },
        };
    }
    Trycatch({ data = "" }) {
        const dataTryCatch = data?.split("?");
        const try_ = dataTryCatch[0]?.split("|").filter((i) => i) || [];
        const catch_ = dataTryCatch[1]?.split("|").filter((i) => i) || [];
        return {
            type: "trycatch",
            data: {
                try_,
                catch_,
            },
        };
    }
    While({ data = "" }) {
        const dataWhile = data?.split("?");
        const condition = dataWhile[0].split("|").filter((i) => i) || [];
        const do_ = dataWhile[1]?.split("|").filter((i) => i) || [];
        return {
            type: "while",
            data: {
                condition,
                do_,
            },
        };
    }
}
