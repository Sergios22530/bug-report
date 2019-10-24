<?php

namespace sergios\bugReport\module\adapters;

use sergios\bugReport\module\models\Issue;
use sergios\worksectionApi\src\models\Comment;

class IssueComment
{
    public static function issueToComment(Issue $issue)
    {
        return ['text' => $issue->getCommentMessage()];
    }

    public static function commentToIssue(Comment $comment)
    {
        $text = $comment->text;
        $text = str_replace('----------------------------------', '', $text);
        $properties = explode(";", $text);
        $attributes = [
            'photo' => $comment->fileUrl
        ];

        foreach ($properties as $property) {
            $splited = explode(':', $property);
            $label = str_replace(['\n', '\r'], '', trim($splited[0]));
            $value = trim($splited[1]);

            switch ($label) {
                case 'id':
                    $attributes['id'] = (int)$value;
                    break;
                case 'Текст ошибки':
                    $attributes['description'] = $value;
                    break;
                case 'Ошибка на странице':
                    $href = explode(':', $property);
                    array_shift($href);
                    $href = implode(':', $href);
                    $attributes['meta']['href'] = trim($href);
                    break;
                case 'Размер экрана (WxY)':
                    $coords = explode("x", $value);
                    $attributes['meta']['viewportWidth'] = (int)$coords[0];
                    $attributes['meta']['viewportHeight'] = (int)$coords[1];
                    break;
                case 'Позиция по скролу (XxY)':
                    $coords = explode("x", $value);
                    $attributes['meta']['scrollX'] = (int)$coords[0];
                    $attributes['meta']['scrollY'] = (int)$coords[1];
                    break;
                case 'Операционная система':
                    $attributes['meta']['os'] = $value;
                    break;
                case 'Данные о браузере':
                    $coords = explode(",", $value);
                    $attributes['meta']['browser'] = $coords[0];
                    $attributes['meta']['browserVersion'] = trim($coords[1]);
                    break;
                case 'Мета':
                    $attributes['meta']['source'] = $value;
                    break;
            }
        }

        return $attributes;
    }
}
