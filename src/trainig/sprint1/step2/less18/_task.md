## Урок 18: PropTypes: проверка типов

<div class="paragraph">
  В этом задании снова вернёмся к разработке чата для соседей по подъезду. С
  помощью
  <code class="code-inline code-inline_theme_light">PropTypes</code>
  вам предстоит повысить надёжность кода, проверяя
  <code class="code-inline code-inline_theme_light">props</code>
  компонентов
  <code class="code-inline code-inline_theme_light">Message</code>
  ,
  <code class="code-inline code-inline_theme_light">RepliedMessage</code>
  и <code class="code-inline code-inline_theme_light">Chat</code>. Добавьте этим
  компонентам
  <code class="code-inline code-inline_theme_light">PropTypes</code>
  так, чтобы все
  <code class="code-inline code-inline_theme_light">props</code>
  соответствовали указанным типам.
</div>
<div class="paragraph">
  Мы подготовили константу
  <code class="code-inline code-inline_theme_light">messagePropTypes</code>,
  которая описывает тип сообщения. Этот объект потребуется для описания
  <code class="code-inline code-inline_theme_light">props</code> в компонентах
  <code class="code-inline code-inline_theme_light">Message</code>,
  <code class="code-inline code-inline_theme_light">RepliedMessage</code>
  и <code class="code-inline code-inline_theme_light">Chat</code>.
</div>
<div class="paragraph">
  Напомним список обязательных
  <code class="code-inline code-inline_theme_light">props</code>
  для каждого из компонентов:
</div>
<ul>
  <li>
    <code class="code-inline code-inline_theme_light">Message</code>
    :
    <code class="code-inline code-inline_theme_light">message</code>
    ;
  </li>
  <li>
    <code class="code-inline code-inline_theme_light">RepliedMessage</code>
    :
    <code class="code-inline code-inline_theme_light">message</code>
    ;
  </li>
  <li>
    <code class="code-inline code-inline_theme_light">Chat</code>
    :
    <code class="code-inline code-inline_theme_light">thread</code>
    .
  </li>
</ul>
<div class="paragraph">
  Все остальные
  <code class="code-inline code-inline_theme_light">props</code>
  необязательные.
</div>
