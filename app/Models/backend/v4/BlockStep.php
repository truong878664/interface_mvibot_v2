<?php

namespace App\Models\backend\v4;

use App\Models\backend\v4\Step;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlockStep extends Model
{
    use HasFactory;
    public function translate($block)
    {
        try {
            $type = $block->type;
            // $arrayDataTranslate = [];
            $Step = new Step();

            switch ($type) {
                case $type === 'normal':
                    $data = $block->data->normal;
                    $DataTranslate =  $this->translateGroupStep($data);
                    $formatDataNormal = "{normal#normal_step{" . $DataTranslate . "}}";
                    return $formatDataNormal;
                case $type === "ifelse":
                    $condition = $block->data->condition;
                    $if = $block->data->if_;
                    $else = $block->data->else_;
                    $DataConditionTranslate = $this->translateGroupStep($condition);
                    $DataIfTranslate = $this->translateGroupStep($if);
                    $DataElseTranslate = $this->translateGroupStep($else);

                    $formatIfElse = "{if_else#condition_step{" . $DataConditionTranslate . "}if_step{" . $DataIfTranslate . "}else_step{" . $DataElseTranslate . "}}";
                    return $formatIfElse;
                case $type === "trycatch":
                    $try = $block->data->try_;
                    $catch = $block->data->catch_;
                    $DataTryTranslate = $this->translateGroupStep($try);
                    $DataCatchTranslate = $this->translateGroupStep($catch);
                    $formatTryCatch = "{try_catch#try_step{" . $DataTryTranslate . "}catch_step{" . $DataCatchTranslate . "}}";
                    return $formatTryCatch;
                case $type === "while":
                    $condition = $block->data->condition;
                    $do = $block->data->do_;
                    $DataConditionTranslate = $this->translateGroupStep($condition);
                    $DataDoTranslate = $this->translateGroupStep($do);
                    $formatWhile = "{while#condition_step{" . $DataConditionTranslate . "}do_step{" . $DataDoTranslate . "}}";
                    return $formatWhile;

                case $type === "logicAnd":
                    $logicA = $block->data->logicA;
                    $logicB = $block->data->logicB;
                    $DataLogicATranslate = $this->translateGroupStep($logicA);
                    $DataLogicBTranslate = $this->translateGroupStep($logicB);
                    $formatLogicAnd = "{logic_and#logic_A{" . $DataLogicATranslate . "}logic_B{" . $DataLogicBTranslate . "}}";
                    return $formatLogicAnd;
                case $type === "logicOr":
                    $logicA = $block->data->logicA;
                    $logicB = $block->data->logicB;
                    $DataLogicATranslate = $this->translateGroupStep($logicA);
                    $DataLogicBTranslate = $this->translateGroupStep($logicB);
                    $formatLogicOr = "{logic_or#logic_A{" . $DataLogicATranslate . "}logic_B{" . $DataLogicBTranslate . "}}";
                    return $formatLogicOr;
            }
        } catch (\Throwable $th) {
            return "(ERR!)" . $th;
        }


        // return $arrayDataTranslate;
    }
    public function translateGroupStep($arrayStep)
    {
        $Step = new Step();
        $arrayDataTranslate = array_map(function ($item) use ($Step) {
            if (gettype($item) === "object") {
                return "}" . $this->translate($item) . "{";
            } else {
                return $Step->translate($item);
            }
        }, $arrayStep);

        $stringData = "{" . implode("", $arrayDataTranslate) . "}";
        return str_replace("{}", "", $stringData);
    }
}
