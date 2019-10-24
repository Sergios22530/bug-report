<?php

namespace sergios\bugReport\module\controllers;

use Exception;
use sergios\worksectionApi\src\mappers\UserMapper;
use Yii;
use yii\web\BadRequestHttpException;
use yii\web\Controller;

class UserController extends Controller
{

    public function actionView()
    {       
        try {
            $filter = $params = Yii::$app->request->get()['filter'];

            if (!$filter) {
                throw new Exception('Email is required');
            }

            $filter = json_decode($filter, true);
            if (!$filter['email']) {
                throw new Exception('Email is required');
            }

            $userMapper = new UserMapper();
            $userCollection = $userMapper->findByAttributes([
                'email' => $filter['email'],
            ]);
            $users = $userCollection->getModels();

            return json_encode([array_pop($users)]);
        } catch (Exception $exception) {
            throw new  BadRequestHttpException($exception->getMessage());
        }
    }
}
