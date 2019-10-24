<?php

namespace sergios\bugReport\module\controllers;

use sergios\bugReport\module\models\Issue;
use sergios\bugReport\module\adapters\IssueComment;
use Exception;
use sergios\worksectionApi\src\mappers\CommentMapper;
use sergios\worksectionApi\src\models\Comment;
use sergios\worksectionApi\src\models\User;
use Yii;
use yii\helpers\ArrayHelper;
use yii\web\BadRequestHttpException;
use yii\web\Controller;
use yii\web\UploadedFile;

class IssueController extends Controller
{
    public function actionIndex()
    {
        try {
            $params = Yii::$app->request->post();

            $issue = new Issue();
            $issue->setAttributes(['meta' => $params['meta'], 'description' => $params['description']]);
            if (!$issue->validate()) {
                throw new Exception('Ошибка в описании задачи или в работе приложения. Перезагрузите страницу и попробуйте снова.');
            }

            $task = $params['taskUrl'];
            if (empty($task)) {
                throw new Exception('Необходимо авторизоваться в системе.');
            }

            $comment = new Comment();
            $comment->setAttributes(IssueComment::issueToComment($issue));
            $comment->saveImage(UploadedFile::getInstanceByName('image'));

            $user = new User();
            $user->setAttributes(['email' => $params['user']['email']]);
            $comment->setUser($user);

            $errors = (ArrayHelper::keyExists('errors',$params) && !empty($params['errors'])) ? $params['errors'] : [];
            if (empty($errors)) {
                $comment->setTodo(0, 'Сделано!');
            } else {
                foreach ($errors as $error) {
                    $comment->setTodo($error['index'], $error['value']);
                }
            }

            $commentMapper = new CommentMapper($task);
            $createdComment = $commentMapper->create($comment);

            return json_encode($createdComment->getAttributes());
        } catch (Exception $exception) {
            throw new  BadRequestHttpException($exception->getMessage());
        }
    }

    public function actionView()
    {
        try {
            $filter = json_decode(Yii::$app->request->get()['filter'], true);
            $task = @$filter['issue'][0];
            if (empty($task)) {
                throw new Exception('Нужно авторизоваться перед запросом комментариев');
            }

            $mapper = new CommentMapper($task);
            $collection = $mapper->findAll();

            $commentsModals = array_filter($collection->getModels(), function (Comment $comment) {
                return substr($comment->text, 0, 2) === 'id';
            });

//            $commentsModals = array_map(function (Comment $comment) {
//                $issue = new Issue();
//                $issue->setAttributes(IssueComment::commentToIssue($comment));
//
//                return $issue;
//            }, $commentsModals);

            return json_encode($commentsModals);
        } catch (Exception $exception) {
            throw new BadRequestHttpException($exception->getMessage(), 500);
        }
    }
}
