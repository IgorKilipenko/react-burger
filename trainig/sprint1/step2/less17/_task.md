## Урок 17: Подъём состояния

<div>
В этой задаче вы окунётесь в мир <i>IoT (Internet of things, англ. «интернет вещей»)</i>. Перед вами панель управления климатом в
«умном» доме. Вам нужно написать методы, которые будут управлять
состоянием кондиционера.
</div> 
<div>
Передайте эти методы в качестве пропсов
дочерним компонентам. Вот список методов, которые нужно
реализовать:
</div>

<br/>

<ol start="1">
  <li>
    Метод
    <code>handlePowerSwitch</code>
    отвечает за включение и выключение кондиционера. Этот метод
    оперирует значением
    <code>this.state.enabled</code>: меняет его каждый раз на противоположное. Метод должен быть
    использован в компоненте
    <code>SwitchControl</code>.
  </li>
  <li>
    Метод
    <code>handleFlowSelect</code>
    управляет скоростью обдува. Используется в компоненте
    <code>FlowControl</code>: получает
    <code>value</code>
    и на основе этого значения изменяет
    <code>this.state.flow</code
    >.
  </li>
  <li>
    Метод
    <code>handleTemperatureIncrease</code> повышает температуры. Этот метод влияет на
    <code>this.state.temperature</code>, увеличивая её на единицу, но не выше чем в константе
    <code>MAX_TEMPERATURE</code>. Используйте
    <code>MAX_TEMPERATURE</code> внутри метода, чтоб ограничить повышение температуры значением
    из этой константы. Метод передаётся в компонент
    <code>MainDashboard</code>в виде пропса
    <code>onIncreaseClick</code>.
  </li>
  <li>
    Метод
    <code>handleTemperatureDecrease</code>
    понижает температуру. Этот метод также влияет на
    <code>this.state.temperature</code>, уменьшая её на единицу, но не ниже чем в константе
    <code>MIN_TEMPERATURE</code>. Используйте
    <code>MIN_TEMPERATURE</code>
    внутри метода, чтоб ограничить понижение температуры значением
    из этой константы. Метод передаётся в компонент
    <code>MainDashboard</code>
    в виде пропса
    <code>onDecreaseClick</code>.
  </li>
</ol>
