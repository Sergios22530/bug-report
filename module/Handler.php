<?php

namespace sergios\bugReport\module;

use yii\base\BootstrapInterface;
use yii\base\Module;
use yii\helpers\VarDumper;
use yii\web\GroupUrlRule;
use Yii;
use function GuzzleHttp\Psr7\str;

class Handler extends Module implements BootstrapInterface
{
    public $controllerNamespace = 'sergios\bugReport\module\controllers'; 


    public function bootstrap($app)
    {
        $suffix = (string)Yii::$app->getUrlManager()->suffix;
        $urlRules = [
            'rules' => [
                [
                    'class' => 'yii\web\UrlRule',
                    'pattern' => $this->id . '/<controller:[\w-]+>',
                    'suffix' => $suffix,
                    'verb' => 'POST',
                    'route' => $this->id . '/<controller>/index',
                ],
                [
                    'class' => 'yii\web\UrlRule',
                    'pattern' => $this->id . '/<controller:[\w-]+>',
                    'suffix' => $suffix,
                    'verb' => 'GET',
                    'route' => $this->id . '/<controller>/view',
                ]
            ],
        ];
        $app->get('urlManager')->rules[] = new GroupUrlRule($urlRules);
    }
}
