# Поздравление для Альберта v4

Переделано именно приложение, не макет.

Что изменено:
- новый чистый японский cyber-anime дизайн;
- убран кислотный зеленый стиль;
- карточки и кнопки сделаны аккуратнее;
- фото Альберта обработано в assets/albert_anime_card.jpg;
- финальный экран использует отдельную карточку assets/final_card.jpg;
- добавлены достижения;
- добавлен секретный файл;
- архив воспоминаний открывается с увеличением пальцами;
- музыка лежит в assets/happy_birthday.mp3;
- текст от одного человека: "Желаю".

## GitHub Pages

Загрузи все файлы в корень репозитория.
Settings -> Pages -> Deploy from a branch -> main -> /root.

## Telegram

В боте укажи ссылку GitHub Pages как Web App.


v5 code fixed:
- screen "Альберт найден" now uses assets/albert_anime_card.png
- final congratulations screen now uses assets/final_card.png
- duplicate wishes under final image removed because the image already contains "Желаю тебе:"
- final image uses object-fit: contain so it does not crop the poster
