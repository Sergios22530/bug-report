<?php

namespace sergios\bugReport\module;

use yii\base\BootstrapInterface;
use yii\base\Module;
use yii\web\GroupUrlRule;

class Handler extends Module implements BootstrapInterface
{
    public $controllerNamespace = 'doris\bugReport\module\controllers';

    public function init()
    {
        parent::init();
    }

    public function bootstrap($app)
    {
        $app->getUrlManager()->addRules([
            [
                'class' => 'yii\web\UrlRule',
                'pattern' => $this->id . '/<controller:[\w-]+>',
                'suffix' => '/',
                'verb' => 'POST',
                'route' => $this->id . '/<controller>/index',
            ],
            [
                'class' => 'yii\web\UrlRule',
                'pattern' => $this->id . '/<controller:[\w-]+>',
                'suffix' => '/',
                'verb' => 'GET',
                'route' => $this->id . '/<controller>/view',
            ]
        ], false);
    }
}
