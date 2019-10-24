<?php

namespace sergios\bugReport\module\models;

use DateTime;
use sergios\bugReport\module\helpers\ImageHelper;
use Exception;
use Yii;
use yii\base\Model;

class Issue extends Model
{
    public $id;
    public $description;
    public $meta;
    public $photo;

    public function rules()
    {
        return [
            [['description'], 'string'],
            [['meta', 'id', 'photo'], 'safe'],
        ];
    }

    public function getCommentMessage(): string
    {
        $datetime = new DateTime();
        $timestamp = $datetime->getTimestamp();
        $description = $this->description ? trim($this->description) : ' - ';

        return implode(' <br>', [
            "id: " . $timestamp . ";",
            "----------------------------------",
            "Текст ошибки: {$description};",
            "----------------------------------",
            "Ошибка на странице: {$this->meta['href']};",
            "Размер экрана (WxY): {$this->meta['viewportWidth']}x{$this->meta['viewportHeight']};",
            "Позиция по скролу (XxY): {$this->meta['scrollX']}x{$this->meta['scrollY']};",
            "Операционная система: {$this->meta['os']};",
            "Данные о браузере: {$this->meta['browser']}, {$this->meta['browserVersion']};",
            "Мета: {$this->meta['source']};"
        ]);
    }
}
