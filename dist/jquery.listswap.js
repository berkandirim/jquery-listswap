/*!
 * jQuery Listswap Plugin
 * Original author: @phedde
 * Changes: @berkandirim
 * Licensed under the MIT license
 */

;(function($, window, document, undefined) {
    
    'use strict';

    var pluginName = "listSwap",
        defaults = {
            truncate: false,
            height: null,
            isScroll: false,
            labelAdd: 'Add',
            labelRemove: 'Remove',
            addClass: null,
            rtl: false
        },
        prefix = pluginName.toLowerCase(),
        classes = {
            ready: prefix + '-ready',
            wrap: prefix + '-wrap',
            hidden: prefix + '-hidden',
            list: prefix + '-list',
            selected: prefix + '-selected',
            controls: prefix + '-controls',
            add: prefix + '-add',
            remove: prefix + '-remove',
            option: prefix + '-option',
            search: prefix + '-search'
        },
        events = {
            ready: 'ready.' + pluginName,
            click: 'click.' + pluginName,
            select: 'select.' + pluginName
        },
        parent = null,
        instance = 1
        ;

    // The actual plugin constructor
    function ListSwap(element, options) {
        this.element = element;

        // jQuery has an extend method that merges the
        // contents of two or more objects, storing the
        // result in the first object. The first object
        // is generally empty because we don't want to alter
        // the default options for future instances of the plugin
        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    ListSwap.prototype = {

        init: function() {
            var source = this.element[0],
                destination = this.element[1],
                wrap = prefix + '_' + instance;

            this.setLayout(this.element, source, destination, this.options);
            this.bindUIActions(this.element, source, destination, wrap);

            instance++;
        },

        setLayout: function(el, src, dest, options) {
            el.wrapAll('<div id="' + prefix + '_' + instance + '" class="' + classes.wrap + '">');
            el.addClass(classes.hidden);
            $('#' + prefix + '_' + instance).append('' +
                '<ul id="src_list_' + instance + '" class="' + classes.list + '" data-instance="' + instance + '"></ul>' +
                '<ul id="' + prefix + '_' + instance + '_controls' + '" class="' + classes.controls + '" data-instance="' + instance + '">' +
                '   <li class="' + classes.add + '">' +
                '       <span class="arrow"></span>' +
                '       <span class="label">' + options.labelAdd + '</span>' +
                '   </li>' +
                '   <li class="' + classes.remove + '">' +
                '       <span class="arrow"></span>' +
                '       <span class="label">' + options.labelRemove + '</span>' +
                '   </li>' +
                '</ul>' +
                '<ul id="dest_list_' + instance + '" class="' + classes.list + '" data-instance="' + instance + '"></ul>'
            );
            this.createList(src, $('#src_list_' + instance));
            this.createList(dest, $('#dest_list_' + instance));
            this.setSearch(src, $('#src_list_' + instance));
            this.setSearch(dest, $('#dest_list_' + instance));
            this.searchFilter('#src_list_' + instance);
            this.searchFilter('#dest_list_' + instance);
        },

        bindUIActions: function(el, src, dest, wrap) {
            var _this = this,
                $wrap = $('#' + wrap),
                listOption = '.' + classes.option,
                $button = $wrap.find('.' + classes.controls + ' li');
            $wrap.on(events.click, listOption, function() {
                $(this).toggleClass(classes.selected);
            });
            $button.on(events.click, function() {
                _this.moveOption(el, src, dest, wrap, this);
            });
        },

        createList: function(select, list) {
            $(select).find('option').each(function() {
                var value = $(this).attr('value');
                var text = $(this).text();
                list.append('<li class="' + classes.option + '" data-value="' + value + '">' + text + '</li>');
            });
        },

        moveOption: function(el, src, dest, wrap, button) {
            var _this = this;
            var currentInstance = $(button).closest('ul').attr('data-instance');
            var from = '#src_list_',
                to = '#dest_list_',
                select = dest;
            if ($(button).hasClass(classes.remove)) {
                to = [from, from = to][0];
                select = src;
            }
            $(from + currentInstance + ' .' + classes.selected).each(function() {
                $(this).remove();
                $(to + currentInstance).append($(this).removeClass(classes.selected));
                var $option = $('option[value="' + $(this).attr('data-value') + '"]');
                $option.remove();
                $(select).append($option);
            });
        },

        setSearch: function(select, list) {
            if ($(select).attr('data-search')) {
                var searchData = '<div class="' + classes.search + '">' +
                    '<input type="text" placeholder="' + $(select).attr('data-search') + '" id="searchList" name="searchList" />' +
                    '<span class="clear"></span>' +
                    '</div>';
                list.prepend(searchData);
            }
        },

        searchFilter: function(selector) {
            var _this = this;
            $(selector + ' #searchList').keyup(function() {
                _this.removeSelection(selector);
                var val = $(this).val().toString().toLowerCase();
                $(selector + ' > li').each(function() {
                    var text = $(this).text().toString().toLowerCase();
                    if (text.indexOf(val) != -1)  $(this).show(); else $(this).hide();
                });
            });
            _this.clearButton(selector);
        },

        removeSelection: function(selector) {
            $(selector + ' li.' + classes.option).each(function() {
                if ($(this).hasClass(classes.selected))
                    $(this).removeClass(classes.selected);
            });
        },

        clearButton: function(selector) {
            $(selector + ' .' + classes.search + ' .clear').click(function() {
                $(selector + ' .' + classes.search + ' #searchList').val('');
                $(selector + ' .' + classes.search + ' #searchList').focus();
                $(selector + ' > li').each(function() {
                    $(this).show();
                });
            });
        }
    };

    $.fn[pluginName] = function(options) {
        if (!$.data(this, "plugin_" + pluginName)) {
            $.data(this, "plugin_" + pluginName,
                new ListSwap(this, options));
        }
    };

})(jQuery, window, document);