# Практична робота №4

## Блокування кнопки: Зробіть кнопку "Додати" неактивною (disabled), якщо форма містить помилки або обов'язкові поля не заповнені.

```jsx
const isFormValid =
      formData.name.trim() &&
      formData.score !== "" &&
      Object.keys(errors).length === 0;
  
    return (
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Прізвище та ім'я:"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Введіть Прізвище та Ім'я"
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}
  
        <Input
          label="Бал студента:"
          name="score"
          type="number"
          value={formData.score}
          onChange={handleChange}
          placeholder="0-100"
          min={0}
          max={100}
        />
        {errors.score && <p className={styles.error}>{errors.score}</p>}
  
        <Button type="submit" className={styles.button} disabled={!isFormValid}>
          Додати студента
        </Button>
      </form>
    );

```

## Типізація вводу: Додайте перевірку на тип даних (наприклад, щоб у поле "Бал" не можна було ввести літери чи символи).

``` jsx
<Input
    label="Прізвище та ім'я:"
    name="name"
    value={formData.name}
    onChange={handleChange}
    placeholder="Введіть Прізвище та Ім'я"
/>
{errors.name && <p className={styles.error}>{errors.name}</p>}
  
<Input
    label="Бал студента:"
    name="score"
    type="number"
    value={formData.score}
    onChange={handleChange}
    placeholder="0-100"
    min={0}
    max={100}
/>
{errors.score && <p className={styles.error}>{errors.score}</p>}

```
## Контрольні запитання

**1. У чому головна різниця між керованими (_controlled_) та некерованими (_uncontrolled_) компонентами?**

Головна різниця між керованими (controlled) та некерованими (uncontrolled) компонентами полягає в тому, що у керованих компонентах значення форми зберігається і керується в стані React, що дає змогу повністю контролювати поведінку і дані інпутів через пропси та обробники подій. У некерованих компонентах значення зберігається безпосередньо в DOM, а доступ до них здійснюється через посилання (ref), що підходить для простих випадків, коли не потрібно активно відслідковувати стан форми в React.

**2. Навіщо використовувати `useRef` при роботі з формами і в яких випадках це виправдано?**

Використання useRef при роботі з формами виправдане, коли потрібно напряму звертатись до DOM-елементів, наприклад, для встановлення фокусу, вибору тексту або інтеграції зі сторонніми бібліотеками, які не керуються React. Крім того, useRef корисний, коли потрібно зберігати значення або змінні, які не повинні викликати повторний рендер компоненту, наприклад, таймери або лічильники.
   
**3. Чому важливо викликати `event.preventDefault()` при обробці події `submit`?**

Викликати event.preventDefault() при обробці події submit важливо, бо за замовчуванням відправка форми викликає перезавантаження сторінки. Ця функція зупиняє стандартну поведінку браузера, дозволяючи обробити форму на стороні клієнта, наприклад, зберегти дані у стані, виконати валідацію або надіслати запит на сервер асинхронно, що покращує взаємодію користувача з додатком.
