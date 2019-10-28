<?php
/**
 * Created by PhpStorm.
 * User: Дмитрий
 * Date: 03.01.2019
 * Time: 7:28
 */

namespace sergios\bugReport\widgets\bugReportWidget;

use yii\base\Widget;
use yii\helpers\Url;
use Yii;

class BugReportWidget extends Widget
{
    public function init()
    {
        Yii::$app->view->registerJsVar('defaultConfig', [
            'controller' => 'bugReport',
            'sufix' => (string)Yii::$app->urlManager->suffix,
        ]);
        parent::init();
    }

    public function run()
    {
        $user_ip = $_SERVER['REMOTE_ADDR'];

        $ip_list = [];
        if (isset(Yii::$app->params['bugReport']['ipList'])) {
            $ip_list = Yii::$app->params['bugReport']['ipList'];
        }

        if (YII_DEBUG || in_array($user_ip, $ip_list)) {
            return $this->render('index');
        }

        return '';
    }
}
