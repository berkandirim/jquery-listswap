/*!
 * jQuery Listswap Plugin
 * Author: @berkandirim
 * Licensed under the MIT license
 */

;(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module depending on jQuery.
        define(['jquery'], factory);
    } else {
        // No AMD. Register plugin with global jQuery object.
        factory(jQuery);
    }
}(function($, window, document, undefined) {
    
    'use strict';

    var pluginName = "listSwap",
        defaults = {
            truncate: false,
            height: null,
            labelAdd: '',
            labelRemove: '',
            customClass: '',
            srcTitle: null,
            destTitle: null
        },
        prefix = pluginName.toLowerCase(),
        classes = {
            ready: prefix + '-ready',
            wrap: prefix + '-wrap',
            listWrap: prefix + '-list-wrap',
            hidden: prefix + '-hidden',
            list: prefix + '-list',
            selected: prefix + '-selected',
            controls: prefix + '-controls',
            add: prefix + '-add',
            remove: prefix + '-remove',
            option: prefix + '-option',
            search: prefix + '-search',
            searchBox: prefix + '-searchbox',
            truncate: '',
            title: prefix + '-title'
        },
        events = {
            ready: 'ready.' + pluginName,
            click: 'click.' + pluginName,
            select: 'select.' + pluginName
        },
        parent = null,
        instance = 1
        ;

    function ListSwap(element, options) {
        this.element = element;
        
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
            
            if (!source || !destination) {
                console.error('Please provide both a source and a destination');
            }

            this.setLayout(this.element, source, destination, this.options);
            this.bindUIActions(this.element, source, destination, wrap);

            instance++;
        },

        setLayout: function(el, src, dest, options) {
            el.wrapAll('<div id="' + prefix + '_' + instance + '" class="' + classes.wrap + ' ' + options.customClass + '">');
            el.addClass(classes.hidden);
            $('#' + prefix + '_' + instance).append('' +
                '<div class="' + classes.listWrap + '">' +
                '   <ul id="src_list_' + instance + '" class="' + classes.list + '" data-instance="' + instance + '"></ul>' +
                '</div>' + 
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
                '<div class="' + classes.listWrap + '">' +
                '   <ul id="dest_list_' + instance + '" class="' + classes.list + '" data-instance="' + instance + '"></ul>' +
                '</div>'
            );
            var srcList = '#src_list_' + instance;
            var destList = '#dest_list_' + instance;
            this.createList(src, $(srcList));
            this.createList(dest, $(destList));
            this.setSearch(src, $(srcList));
            this.setSearch(dest, $(destList));
            this.searchFilter(srcList);
            this.searchFilter(destList);
            if (options.srcTitle && options.destTitle) {
                this.addTitle($(srcList), options.srcTitle);
                this.addTitle($(destList), options.destTitle);
            }
            if (options.srcTitle && !options.destTitle || !options.srcTitle && options.destTitle) {
                console.error('Please add both srcTitle and destTitle');
            }
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
            var _this = this;
            $(select).find('option').each(function() {
                var value = $(this).attr('value');
                var text = $(this).text();
                if (_this.options.truncate) {
                    classes.truncate = ' ' + prefix + '-truncate';
                }
                list.append('<li class="' + classes.option + classes.truncate + '" data-value="' + value + '">' + text + '</li>');
            });
            if (_this.options.height) {
                list.css('height', _this.options.height);
            }
        },

        moveOption: function(el, src, dest, wrap, button) {
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
                    '<input type="text" placeholder="' + $(select).attr('data-search') + '" class="' + classes.searchBox + '" />' +
                    '<span class="clear"></span>' +
                    '</div>';
                list.parent().prepend(searchData);
            }
        },

        searchFilter: function(selector) {
            var _this = this;
            $(selector).prev('.' + classes.search).find('.' + classes.searchBox).keyup(function() {
                _this.removeSelection(selector);
                var val = $(this).val().toString().toLowerCase();
                $(selector + ' > li').each(function() {
                    var text = $(this).text().toString().toLowerCase();
                    if (text.indexOf(val) !== -1)  $(this).show(); else $(this).hide();
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
            $(selector).prev(' .' + classes.search).find(' .clear').click(function() {
                $(selector).prev(' .' + classes.search).find('.' + classes.searchBox).val('');
                $(selector).prev(' .' + classes.search).find('.' + classes.searchBox).focus();
                $(selector + ' > li').each(function() {
                    $(this).show();
                });
            });
        },
        
        addTitle: function(selector, title) {
            $(selector).parent().prepend('<h3 class="' + classes.title + '">' + title + '</h3>');
        }
    };

    $.fn[pluginName] = function(options) {
        if (!$.data(this, "plugin_" + pluginName)) {
            $.data(this, "plugin_" + pluginName,
                new ListSwap(this, options));
        }
    };

})(jQuery, window, document));