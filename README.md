# Tabby

A simple JS standalone library to make tabs with a simple markup

## Live demo

You can play with a live demo at [https://codepen.io/eternalsunshineofspotlessmind/pen/dyzbXYY?editors=0010](https://codepen.io/eternalsunshineofspotlessmind/pen/dyzbXYY?editors=0010).

## Basic usage

This is the basic markup to copy-paste to make it work.

```html
<!-- This is the markup of -->
<div class="tab-wrapper-1" style="margin-bottom: 1rem;">

  <!-- Tab labels -->
  <div class="tabby-labels">
    <label class="tabby-label">First tab</label>
    <label class="tabby-label">Second tab</label>
  </div>
  <div class="tabby-separator"></div>

  <!-- Tabs -->
  <div class="tabby-contents">
    <div class="tabby-content">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis quos velit repellat sapiente voluptate ratione pariatur.</p>
    </div>
    <div class="tabby-content">
      <p>Reiciendis architecto qui modi aspernatur quaerat cum sint consectetur suscipit dolor veritatis enim ipsa corporis?</p>
    </div>
  </div>
  
</div>
```

To make it work just pass the wrapper selector to the Tabby constructor, like follows:

```js
new Tabby(".tab-wrapper-1");
```

## Advanced usage

Tab changes can be listened and color scheme can be customized.

```html
<div class="tab-wrapper-2">

  <!-- Tab labels -->
  <div class="tabby-labels">
    <label class="tabby-label">Touch me</label>
    <label class="tabby-label">Touch me</label>
  </div>
  <div class="tabby-separator"></div>

  <!-- Tabs -->
  <div class="tabby-contents">
    <div class="tabby-content">
      <p>Reiciendis architecto qui modi aspernatur quaerat cum sint consectetur suscipit dolor veritatis enim ipsa corporis?</p>
    </div>
    <div class="tabby-content">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis quos velit repellat sapiente voluptate ratione pariatur.</p>
    </div>
  </div>
  
</div>
```

Attach listeners with onTabChange({{ your listener here }}) and customize the color scheme.

```js
let secondTabby = new Tabby(".tab-wrapper-2", {
  activeTabColor: "#111",
  activeTabBG: "#bada55",
  tabsColor: "#ddd",
  tabsBG: "#bd55"
});

secondTabby.onTabChange(index => alert("You've touched tab #" + index));
```