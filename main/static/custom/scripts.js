// Получаю объект navbar в header для работы с DOM
const navbarToggle = document.getElementById('navbarToggleExternalContent')
setTimeout(() =>{
    //С помощью bootstrap меня видимимость через 1сек после открытия страницы.
    //Реализация спорная, но коли работет - не трожь.
    let nT = new bootstrap.Collapse(navbarToggle, {
      toggle: true
    })
}, 2000)

//Получаю "hub" внутри которого будет слайдер.
const crg_menu = document.getElementById("crg_hub")

// Функция очистки и сброса "hub". Используется для настройки видимости текста и переключения режима показа + удаляет "in_progress" класс
function clearAndResetHub() {
    crg_menu.classList.add("in_progress")
    document.getElementById("text_in_hub").classList.add("text_to_show_mode")
    document.getElementById("text_in_hub").classList.remove("text_to_hide_mode")
    setTimeout(() => {
        crg_menu.classList.remove("in_progress")
        document.getElementById("text_in_hub").classList.remove("text_to_show_mode")
    }, 1500)
}

//Добовляю событие к меню, которое обрабатывает наведение мыши
crg_menu.addEventListener("mousemove", (event) =>{

    // Считываю координаты мыши внутри блока по формуле = кординаты мыши пользователь внутри окна - расстояние слева от блока.
    // Использую Math.round(), потому как размер окна может быть не целым значением
    let x = event.clientX - Math.round(crg_menu.getBoundingClientRect().x)
    let y =  event.clientY - Math.round(crg_menu.getBoundingClientRect().y)
    // Проверка нахождения курсора в левом верхнем углу, наличие класса флажка акивированности данного действия (если есть - false), наличия прогресса и активности другого
    if (x + y <= 220 && crg_menu.classList.contains("to_coin") === false && crg_menu.classList.contains("in_progress") === false  && crg_menu.classList.contains("to_mess") === false){
        // Добовляю класс "to_coin" который реализует анимацию смещения background(чек файла с css файлами)
        crg_menu.classList.add("to_coin")
        // Добавляю скрытие блока с текстом.
        document.getElementById("text_in_hub").classList.add("text_to_hide_mode")
    }
    // Аналогичная проверка, только на наличие курсора в правом нижнем углу блока.
    if (x + y >= 880 && x > 510 && crg_menu.classList.contains("to_mess") === false && crg_menu.classList.contains("in_progress") === false && crg_menu.classList.contains("to_coin") === false){
        // Добовляю класс "to_mess" который реализует анимацию смещения background(чек файла с css файлами)
        crg_menu.classList.add("to_mess")
        // Добавляю скрытие блока с текстом.
        document.getElementById("text_in_hub").classList.add("text_to_hide_mode")
    }
   // Действие, вызывающееся при необходимости скрыть окна. Выполняется в случае, если сначала навели на левый верхний угол, а затем в правый нижний.
    if (x + y >= 900 && crg_menu.classList.contains("to_coin") === true){
        crg_menu.classList.remove("to_coin")
        clearAndResetHub()
    }
    // Взаимообратен высше представленному блоку.
    if (x + y <= 200 && crg_menu.classList.contains("to_mess") === true){
        crg_menu.classList.remove("to_mess")
        clearAndResetHub()
    }
})