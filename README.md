"# test_dnevnik"
Test task for the Dnevnik.ru company

Сверстаны календарь и 4 попапа из предоставленного макета.

####**Учтено следующее:**

**1.**	В макете изображены зеленые плашки - уроки. Их высота зависит от длительности урока, а расположение относительно сетки таблицы - от даты проведения (координаты по оси x) и времени начала (координаты по оси y). Один час на сетке календаря имеет фиксированную высоту = 91px.
Высота урока: урок длительностью 40 мин имеет высоту 40/60 * 91, урок длительностью 100 мин: 100/60 * 91 и т.д.
Расположение урока: урок, начинающийся в 05 минут, имеет отступ сверху 5/60 * 91 и т.д.
В макете разная высота у уроков (например: урок в среду 8:30 - 9:10 имеет высоту 67px, а следующий за ним урок 9:15 - 9:55 имеет высоту 62px), сделала по расчетным данным по приведенным выше формулам.
Отмененный урок в субботу так же не вписывается по высоте в формулу, поэтому, чтобы урок не вылезал из блока, обрезала название.
**2.**	В виде за неделю попапы располагаются относительно уроков так, что находятся внутри области календаря (не вылезают за его рамки). Сверстаны попапы для последнего урока в понедельник, для первого урока во вторник, для измененного и отмененного уроков.
**3.**	В блоке перехода на другой день дата "29 декабря 2016 - 5 января 2016" должна отображаться корректно.
**4.**	В виде за неделю стобец сегодняшнего дня может совпадать со столбцом "Праздничные дни" (вид такого столбца: розовый фон, голубая обводка, текст "праздничный день").

####**Выполненные требования:**

*	Необходимо сверстать вид "за неделю" и 4 попапа из макета с попапами;
*	Верстка должна быть выполнена БЭМ методологии;
*	Верстка фиксированная, без Bootstrap;
*	Для CSS необходимо использовать препроцессор (на свой выбор) - **использован less**;
*	Используйте возможности css-препроцессора по максимуму;
*	Как можно реже использовать абсолютное позиционирование (чем его меньше, тем чище ваша карма) - **абсолют использован для размещения только двух уроков**;
*	Необходимо соблюдать пропорции, отступы и рамки, нарисованные в макете. Верстка должна выглядеть так, как в макете, и никак иначе.

####**Доп. требования:**

*	~~Использование html шаблонизатора~~
*	~~Js код для переключения даты и вида календаря,~~
*	js для появления попапа при клике на урок (и его корректного отображения)
*	~~Сверстанный "вид за месяц"~~
