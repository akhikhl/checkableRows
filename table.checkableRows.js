/**
 * table.checkableRows.js
 *
 * "checkableRows" behavior that can be attached to any table element.
 * Written by Andrey Hihlovskiy (akhikhl AT gmail DOT com).
 * Licensed under the MIT (http://opensource.org/licenses/MIT).
 * Date: 30.05.2013
 *
 * @author Andrey Hihlovskiy
 * @version 1.0.0
 * @requires jQuery v1.7 or later
 *
 * https://github.com/akhikhl/checkableRows
 *
 **/
jQuery(function($) {

  var keyCode = {
    SPACE: ($.ui && $.ui.keyCode.SPACE) || 32
  };

  function changeCheck(table, checkToAdd, checkToRemove) {
    checkToAdd = $(checkToAdd);
    checkToRemove = $(checkToRemove);
    if(checkToAdd.length == 0 && checkToRemove.length == 0)
      return false;    
    var oldChecked = table.find("> tbody > tr.checked");
    var newChecked = oldChecked.not(checkToRemove).add(checkToAdd);
    if(checkToRemove.length != 0) {
      checkToRemove.removeClass("checked");
      table.trigger("rowUnchecked.checkableRows", [ checkToRemove ]);
    }
    if(checkToAdd.length != 0) {
      checkToAdd.addClass("checked");
      scrollElementIntoView(checkToAdd.first());
      table.trigger("rowChecked.checkableRows", [ checkToAdd ]);
    }
    table.trigger("rowCheckChanged.checkableRows", [ newChecked, oldChecked ]);
    return true;
  }

  function setCheck(table, newChecked) {
    newChecked = $(newChecked);
    var oldChecked = table.find("> tbody > tr.checked");
    return changeCheck(table, newChecked.not(oldChecked), oldChecked.not(newChecked));
  }
  
  function toggleCheck(table, rows) {
    rows = $(rows);
    var checkToAdd = rows.not(".checked");
    var checkToRemove = rows.filter(".checked");
    return changeCheck(table, rows.not(".checked"), rows.filter(".checked"));
  }

  function scrollElementIntoView(elem) {
    elem = $(elem);
    if(elem.length > 1) // we don't scroll to more than one element
      return;
    if(typeof elem.scrollParent != "function") // scrollParent is available only if jquery-ui was included
      return;
    var offsetParent = elem.offsetParent();
    var scrollParent = elem.scrollParent();
    if(offsetParent.length != 0 && offsetParent.get(0) === scrollParent.get(0)) {
      if(elem.position().top + elem.outerHeight() > offsetParent.innerHeight())
        elem.get(0).scrollIntoView(false);
      if(elem.position().top < 0)
        elem.get(0).scrollIntoView(true);
    }
  }

  $("body").on("click", "table.checkableRows > tbody > tr > td.checkCell", function() {
    toggleCheck($(this).closest("table.checkableRows"), $(this).closest("tr"));
  });

  $("body").on("keydown", function(event) {
    var table = $("table.selectableRows.checkableRows.focused, .focused table.selectableRows.checkableRows");
    if(table.length != 0) {
      if(event.altKey || event.ctrlKey || event.shiftKey)
        return; // we don't handle key combinations yet
      var selectedRows = table.find("> tbody > tr.selected");
      if(event.keyCode == keyCode.SPACE) {
        if(toggleCheck(table, selectedRows))
          return false;
      }
    }
  });
  
  var methods = {
    checkAll: function() {
      setCheck(this, this.find("> tbody > tr"));
      return this;
    },
    checked: function(newValue) {
      if(newValue)
        setCheck(this, newValue);
      return this.find("> tbody > tr.checked");
    },
    checkNone: function() {
      setCheck(this, $());
      return this;
    },
    toggleCheck: function(newValue) {
      toggleCheck(this, newValue);
      return this;
    }
  };
  
  $.fn.selectableRows = function(method) {
    if (methods[method])
      return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
    $.error("Method " +  method + " does not exist on jQuery.selectableRows");
  };
});
