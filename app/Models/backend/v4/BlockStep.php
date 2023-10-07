<?php

namespace App\Models\backend\v4;

use App\Models\backend\v4\Step;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlockStep extends Model
{
    use HasFactory;
    public function translate($block, $html)
    {
        try {
            $type = $block->type;
            if ($html) {
                $mapping = [
                    'normal' => '<div class="bl-step-code"><span>{normal#</span><div class="bl-step-code"><span>normal_step{</span><div class="bl-step-code"><div class="bl-step-code">%s</div></div><span>}</span></div><span class="">}</span></div><br />',
                    'ifelse' => '<div class="bl-step-code"><span>{if_else#</span><div class="bl-step-code"><span>condition_step{</span><div class="bl-step-code"><div class="bl-step-code">%s</div></div><span>}</span></div><div class="bl-step-code"><span>if_step{</span><div class="bl-step-code"><div class="bl-step-code">%s</div></div><span>}</span></div><div class="bl-step-code"><span>else_step{</span><div class="bl-step-code"><div class="bl-step-code">%s</div></div><span>}</span></div><span>}</span></div><br />',
                    'trycatch' => '<div class="bl-step-code"><span>{try_catch#</span><div class="bl-step-code"><span>try_step{</span><div class="bl-step-code"><div class="bl-step-code">%s</div></div><span>}</span></div><div class="bl-step-code"><span>catch_step{</span><div class="bl-step-code"><div class="bl-step-code">%s</div></div><span>}</span></div><span>}</span></div>',
                    'while' => '<div class="bl-step-code"><span>{while#</span><div class="bl-step-code"><span>condition_step{</span><div class="bl-step-code"><div class="bl-step-code">%s</div></div><span>}</span></div><div class="bl-step-code"><span>do_step{</span><div class="bl-step-code"><div class="bl-step-code">%s</div></div><span>}</span></div><span>}</span></div><br />',
                    'logicAnd' => '<div class="bl-step-code"><span>{logic_and#</span><div class="bl-step-code"><span>logic_A{</span><div class="bl-step-code"><div class="bl-step-code">%s</div></div><span>}</span></div><div class="bl-step-code"><span>logic_B{</span><div class="bl-step-code"><div class="bl-step-code">%s</div></div><span>}</span></div><span>}</span></div><br />',
                    'logicOr' => '<div class="bl-step-code"><span>{logic_or#</span><div class="bl-step-code"><span>logic_A{</span><div class="bl-step-code"><div class="bl-step-code">%s</div></div><span>}</span></div><div class="bl-step-code"><span>logic_B{</span><div class="bl-step-code"><div class="bl-step-code">%s</div></div><span>}</span></div><span>}</span></div><br />',
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
                    $translatedData[$key] = $this->translateGroupStep($value, $html);
                }

                return vsprintf($format, $translatedData);
            }
            return "";
        } catch (\Throwable $th) {
            return "";
        }


        // return $arrayDataTranslate;
    }
    public function translateGroupStep($arrayStep, $html)
    {
        try {
            $Step = new Step();
            $arrayDataTranslate = array_map(function ($item) use ($Step, $html) {
                if (gettype($item) === "object") {
                    return "]" . $this->translate($item, $html) . "[";
                } else {
                    return $Step->translate($item);
                }
            }, $arrayStep);

            $KEY1 = "[";
            $KEY2 = "]";
            $stringData = $KEY1 . implode("", $arrayDataTranslate) . $KEY2;
            $data1 = str_replace($KEY1 . "}", "", $stringData);
            $data2 = str_replace("{" . $KEY2, "", $data1);
            $data3 = str_replace("$KEY1" . $KEY2, "", $data2);
            $data4 = str_replace("$KEY1", "{", $data3);
            $data5 = str_replace($KEY2, "}", $data4);
            $data = str_replace("", "", $data5);
            return $data;
        } catch (\Throwable $th) {
            //throw $th;
            return "";
        }
    }
}
