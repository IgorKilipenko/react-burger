
# Урок 17: Подъём состояния
<b>
<p>
В этой задаче вы окунётесь в мир IoT (Internet of things, англ.
«интернет вещей»). Перед вами панель управления климатом в
«умном» доме. Вам нужно написать методы, которые будут управлять
состоянием кондиционера.
</p> 
<p>
Передайте эти методы в качестве пропсов
дочерним компонентам. Вот список методов, которые нужно
реализовать:
</p>
</b>

<br/>

<ol start="1">
  <li>
    Метод
    <code class="code-inline code-inline_theme_light"
      >handlePowerSwitch</code
    >
    отвечает за включение и выключение кондиционера. Этот метод
    оперирует значением
    <code class="code-inline code-inline_theme_light"
      >this.state.enabled</code
    >: меняет его каждый раз на противоположное. Метод должен быть
    использован в компоненте
    <code class="code-inline code-inline_theme_light"
      >SwitchControl</code
    >.
  </li>
  <li>
    Метод
    <code class="code-inline code-inline_theme_light"
      >handleFlowSelect</code
    >
    управляет скоростью обдува. Используется в компоненте
    <code class="code-inline code-inline_theme_light"
      >FlowControl</code
    >: получает
    <code class="code-inline code-inline_theme_light">value</code>
    и на основе этого значения изменяет
    <code class="code-inline code-inline_theme_light"
      >this.state.flow</code
    >.
  </li>
  <li>
    Метод
    <code class="code-inline code-inline_theme_light"
      >handleTemperatureIncrease</code
    >
    повышает температуры. Этот метод влияет на
    <code class="code-inline code-inline_theme_light"
      >this.state.temperature</code
    >, увеличивая её на единицу, но не выше чем в константе
    <code class="code-inline code-inline_theme_light"
      >MAX_TEMPERATURE</code
    >. Используйте
    <code class="code-inline code-inline_theme_light"
      >MAX_TEMPERATURE</code
    >
    внутри метода, чтоб ограничить повышение температуры значением
    из этой константы. Метод передаётся в компонент
    <code class="code-inline code-inline_theme_light"
      >MainDashboard</code
    >
    в виде пропса
    <code class="code-inline code-inline_theme_light"
      >onIncreaseClick</code
    >.
  </li>
  <li>
    Метод
    <code class="code-inline code-inline_theme_light"
      >handleTemperatureDecrease</code
    >
    понижает температуру. Этот метод также влияет на
    <code class="code-inline code-inline_theme_light"
      >this.state.temperature</code
    >, уменьшая её на единицу, но не ниже чем в константе
    <code class="code-inline code-inline_theme_light"
      >MIN_TEMPERATURE</code
    >. Используйте
    <code class="code-inline code-inline_theme_light"
      >MIN_TEMPERATURE</code
    >
    внутри метода, чтоб ограничить понижение температуры значением
    из этой константы. Метод передаётся в компонент
    <code class="code-inline code-inline_theme_light"
      >MainDashboard</code
    >
    в виде пропса
    <code class="code-inline code-inline_theme_light"
      >onDecreaseClick</code
    >.
  </li>
</ol>
