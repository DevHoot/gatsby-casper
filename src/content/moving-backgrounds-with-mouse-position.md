---
layout: post
title: 'Moving Backgrounds With Mouse Position'
author: Imran Khan
tags: ['CSS']
image: img/mousePosition.jpeg
date: '2018-10-08T15:11:55.000Z'
draft: false
---

Let's say you wanted to move the background-position on an element as you mouse over it to give the design a little pizzazz.

```html
<div class="module" id="module"></div>
```

<p>And you toss a background on it:</p>

```css
.module {
  background-image: url(big-image.jpg);
}
```

<p>You can adjust the <code>background-position</code> in JavaScript like this:</p>

```js
const el = document.querySelector('#module');

el.addEventListener('mousemove', (e) => {
  el.style.backgroundPositionX = -e.offsetX + 'px';
  el.style.backgroundPositionY = -e.offsetY + 'px';
});
```

<div class="cp_embed_wrapper resizable" style="height: 533px;"><iframe id="cp_embed_qMwJyQ" src="//codepen.io/chriscoyier/embed/qMwJyQ?height=533&amp;theme-id=1&amp;slug-hash=qMwJyQ&amp;default-tab=js%2Cresult&amp;user=chriscoyier&amp;pen-title=Move%20a%20background%20with%20mouse" scrolling="no" frameborder="0" height="533" allowtransparency="true" allowfullscreen="true" allowpaymentrequest="true" name="CodePen Embed" title="Move a background with mouse" class="cp_embed_iframe " style="width: 100%; overflow: hidden; height: 100%;"></iframe><div class="win-size-grip" style="touch-action: none;"></div></div>
<p>Or, you could update CSS custom properties in the JavaScript instead:</p>

```js
const el = document.querySelector('#module');

el.addEventListener('mousemove', (e) => {
  el.style.setProperty('--x', -e.offsetX + 'px');
  el.style.setProperty('--y', -e.offsetY + 'px');
});
```

```css
.module {
  --x: 0px;
  --y: 0px;
  background-image: url(large-image.jpg);
  background-position: var(--x) var(--y);
}
```

<div class="cp_embed_wrapper resizable" style="height: 510px;"><iframe id="cp_embed_bxJmOw" src="//codepen.io/chriscoyier/embed/bxJmOw?height=510&amp;theme-id=1&amp;slug-hash=bxJmOw&amp;default-tab=js%2Cresult&amp;user=chriscoyier&amp;pen-title=Move%20a%20background%20with%20mouse" scrolling="no" frameborder="0" height="510" allowtransparency="true" allowfullscreen="true" allowpaymentrequest="true" name="CodePen Embed" title="Move a background with mouse" class="cp_embed_iframe " style="width: 100%; overflow: hidden; height: 100%;"></iframe><div class="win-size-grip" style="touch-action: none;"></div></div>
<p>Here's an example that moves the background directly in JavaScript, but with a transition applied so it slides to the new position rather than jerking around the first time you enter:</p>

<div class="cp_embed_wrapper resizable" style="height: 539px;"><iframe id="cp_embed_YOMJoK" src="//codepen.io/chriscoyier/embed/YOMJoK?height=539&amp;theme-id=1&amp;slug-hash=YOMJoK&amp;default-tab=js%2Cresult&amp;user=chriscoyier&amp;pen-title=Movable%20Background%20Ad" scrolling="no" frameborder="0" height="539" allowtransparency="true" allowfullscreen="true" allowpaymentrequest="true" name="CodePen Embed" title="Movable Background Ad" class="cp_embed_iframe " style="width: 100%; overflow: hidden; height: 100%;"></iframe><div class="win-size-grip" style="touch-action: none;"></div></div>

<p>Or, you could move an actual element instead (rather than the <code>background-position</code>). You'd do this if there is some kind of content or interactivity on the sliding element. Here's an example of that, which sets CSS custom properties again, but then actually moves the element via a CSS <code>translate()</code> and a <code>calc()</code> to temper the speed. </p>
<div class="cp_embed_wrapper resizable" style="height: 551px;"><iframe id="cp_embed_PdgyMN" src="//codepen.io/chriscoyier/embed/PdgyMN?height=551&amp;theme-id=1&amp;slug-hash=PdgyMN&amp;default-tab=js%2Cresult&amp;user=chriscoyier&amp;pen-title=Hotjar%20Moving%20Heatmap%20Ad" scrolling="no" frameborder="0" height="551" allowtransparency="true" allowfullscreen="true" allowpaymentrequest="true" name="CodePen Embed" title="Hotjar Moving Heatmap Ad" class="cp_embed_iframe " style="width: 100%; overflow: hidden; height: 100%;"></iframe><div class="win-size-grip" style="touch-action: none;"></div></div>
<p>I'm sure there are loads of other ways to do this — a moving SVG viewBox, scripts controlling a canvas, webGL... who knows! If you have some fancier ways to handle this, link 'em up in the comments. </p>
