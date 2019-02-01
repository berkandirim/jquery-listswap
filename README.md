jQuery listSwap
===============

This is a more modern fork of [listSwap plugin](https://github.com/phedde/listSwap) by @phedde

Note: this version is still in development.

ListSwap is a jQuery plugin that allows you to swap (add/remove) items between two drop-down lists.

- jQuery suppport: 1.3+
- Browser support: All major browsers, IE8+

### [Demo](https://berkandirim.github.io/jquery-listswap/)

Install with Bower
------------------
`$ bower install jquery.listswap`

Usage
-----
`$('#source, #destination').listSwap();`

Define search with `data-search="placeholder"` on list elements.

Default Options
---------------
```js
truncate : false, // Set to true to disable word wrap
height : null,  // Set custom height
labelAdd : '', // Set add label (Empty by default)
labelRemove : '', // Set remove label (Empty by default)
customClass : '', // Custom class for styling	
srcTitle: null, // Titles for boxes
destTitle: null	 // Both are required
```

Roadmap
-------
- Add destroy method
- Add update method
- Add RTL support
