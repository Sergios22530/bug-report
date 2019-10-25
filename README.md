# Установка и настройка
<code>composer require sergios/bug-report "*"</code>

В параметраы <code>frontend/config/params</code> необходимо положить следующие настройки:<br>
<pre>
'bugReport' => [
    'ipList' => "Список ip адрессов которым на лайве будет виден виджет"
]
</pre>

Так же в файле <code>frontend/config/main</code> необходимо подключить модуль:
<pre>
'bootstrap' => ['bugReport'],
'modules' => [
	'bugReport' => 'sergios\bugReport\module\Handler',
],
</pre>

В лаяуте необходимо подключить виджет, он же и будет выводить на страницу необзодимую
форму, попап, скрипты, стили и т.д:<br>

<pre>
use sergios\bugReport\widgets\bugReportWidget\BugReportWidget;

BugReportWidget::widget();
</pre>

# Использование
Для начала в системе нужно авторизоваться. Это можно сделать либо через иконку сверху, либо через <code>Q + W + E</code>.
В появившемся поле нужно указать email с которого зарегистрирован на worksection и ссылку на задачу (всю ссылку).

Для формирования отчета нужно той же комбинацией <code>Q + W + E</code> (или нажав на иконку сверху) вызвать попап окно, вставить фото (загрузить с утройства, сделать скрин с помощью html2canvas или просто вставить картинку из буфера) и заполнить соответствующие поля.

Для пометки проблемных участвок можно использовать кисть или прямоугольники. Если спользовать последние тогда в форме появятся дополнительные поля для заполнения.
