<?php

namespace App\Models\backend\v4;

use App\Models\backend\v4\Step;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlockStep extends Model
{
    use HasFactory;
    public function translate($block, $isHtml= true)
    {

        try {
            $type = $block->type;
            if($isHtml) {
                $mapping = [
                    'normal' => "<div class='pl-10'>{normal#<div class='pl-10'>normal_step{<div class='pl-10'>%s</div>}</div>}</div><br>",
                    'ifelse' => `<div class='pl-10'>{if_else#
                                    <div class='pl-10'>condition_step{
                                        <div class='pl-10'>%s</div>
                                    }
                                        if_step{%s}else_step{%s}}</div>
                                    </div>
                                </div>  
                                <br>
                                    `,
                    'trycatch' => "<div class='pl-10'>{try_catch#try_step{%s}catch_step{%s}}</div><br>",
                    'while' => "<div class='pl-10'>{while#condition_step{%s}do_step{%s}}</div><br>",
                    'logicAnd' => "<div class='pl-10'>{logic_and#logic_A{%s}logic_B{%s}}</div><br>",
                    'logicOr' => "<div class='pl-10'>{logic_or#logic_A{%s}logic_B{%s}}</div><br>",
                ];
            } else {
                $mapping = [
                    'normal' => "{normal#normal_step{%s}}",
                    'ifelse' => "{if_else#condition_step{%s}if_step{%s}else_step{%s}}",
                    'trycatch' => "{try_catch#try_step{%s}catch_step{%s}}",
                    'while' => "{while#condition_step{%s}do_step{%s}}",
                    'logicAnd' => "{logic_and#logic_A{%s}logic_B{%s}}",
                    'logicOr' => "{logic_or#logic_A{%s}logic_B{%s}}",
                ];
            }
    
            if (isset($mapping[$type])) {
                $data = $block->data;
                $format = $mapping[$type];
                $translatedData = [];
                foreach ($data as $key => $value) {
                    $translatedData[$key] = $this->translateGroupStep($value);
                }
    
                return vsprintf($format, $translatedData);
            }
            return "";
        } catch (\Throwable $th) {
            return "";
        }


        // return $arrayDataTranslate;
    }
    public function translateGroupStep($arrayStep)
    {
        try {
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
        } catch (\Throwable $th) {
            //throw $th;
            return "";
        }
    }
}
