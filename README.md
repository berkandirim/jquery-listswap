jQuery listSwap
===============

This is a more modern fork of [listSwap plugin](https://github.com/phedde/listSwap) by @phedde

Note: this version is still in development.

ListSwap is a jQuery plugin that allows you to swap (add/remove) items between two drop-down lists.

- jQuery suppport: 1.3+
- Browser support: All major browsers, IE8+

Install with Bower
------------------
`$ bower install jquery.listswap`

Usage
-----
`$('#source, #destination').listSwap();`

Default Options
---------------
```
truncate : false, // Set to true to disable word wrap
height : null,  // Set custom height
labelAdd : '', // Set add label (Empty by default)
labelRemove : '', // Set remove label (Empty by default)
customClass : '' // Custom class for styling	
```

**[Demo](http://dirim.co/jquery-listswap)**

Roadmap
-------
- Add destroy method
- Add update method
- Add RTL support