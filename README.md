#checkableRows

##Overview

"checkableRows" is a javascript behavior (and, optionally, CSS) that can be attached to any table element.
When checkableRows is enabled, the table shows a column with checkboxes.
Clicking on checkboxes checks/unchecks rows.

See [online example here](https://dl.dropboxusercontent.com/u/15089387/js/checkableRows/example_checkableRows.htm)

##API

### Initialization

"checkableRows" behavior is attached to table element via "checkableRows" class.
Cells showing checkboxes should be supplied with "checkCell" class.

```html
<link href="table.checkableRows.css" rel="stylesheet">
...

<table id="exampleTable" class="checkableRows">
   <tr><td>...</td>...<td class="checkCell"/></tr>
   ...
</table>

  ...
<script src="http://code.jquery.com/jquery-1.10.0.min.js"></script>
<script type="text/javascript" src="table.checkableRows.js"></script>
```

Effect: all td.checkCell elements are rendered with checkbox image.
Whenever td.checkCell is clicked, it's parent (tr) is gets/loses "checked" class.

Note that checkableRows initialization requires *only* presence of "checkableRows" class
and including "table.checkableRows.js". There is no jquery-style initialization for checkableRows.

## Functions

checkAll() - checks all rows in the given table.

Example:
```javascript
$("#exampleTable").checkableRows("checkAll");
```

checked(newValue) - gets/sets checks rows in the given table.

Example:
```javascript
$("#exampleTable").checkableRows("checked", $("#exampleTable").find("tr:eq(2)"));

var checked = $("#exampleTable").checkableRows("checked");

```

checkNone() - unchecks all rows in the given table.

Example:
```javascript
$("#exampleTable").checkableRows("checkNone");
```

toggleCheck(rows) - toggles check on the specified rows in the given table.

Example:
```javascript
$("#exampleTable").checkableRows("toggleCheck", $("#exampleTable").find("tr:eq(2)"));

```

### Events

* "rowChecked.checkableRows"

triggered when some row is checked.

parameters: row - jQuery object, associated with checked row.

handler example:
```javascript
$("#exampleTable").on("rowChecked.checkableRows", function(event, row) {
  console.log(event.type, row);
});
```

* "rowUnchecked.checkableRows"

triggered when some row is unchecked.

parameters: row - jQuery object, associated with unchecked row.

handler example:
```javascript
$("#exampleTable").on("rowUnchecked.checkableRows", function(event, row) {
  console.log(event.type, row);
});
```

* "rowCheckChanged.checkableRows"

triggered when checked rows change - some row(s) is(are) checked or unchecked.

parameters:
  newChecked - jQuery object, associated with newly checked rows.
  oldChecked - jQuery object, associated with previously checked rows.

handler example:
```javascript
$("#exampleTable").on("rowCheckChanged.checkableRows", function(event, newChecked, oldChecked) {
  console.log(event.type, newChecked, oldChecked);
});
```
  
note that newChecked and oldChecked may intersect.

You can calculate non-intersecting row sets like this:

```javascript
newChecked.not(oldChecked); // get only those rows that were not checked before

oldChecked.not(newChecked); // get only those rows that are not checked anymore
```

### Stylesheets

The page using checkableRows must include CSS file:
```html
<link href="table.checkableRows.css" rel="stylesheet">
```

otherwise checkboxes within the table will not be rendered properly.

##Copyright and License

Copyright 2013 (c) Andrey Hihlovskiy

All versions, present and past, of "checkableRows" script are licensed under MIT license:

* [MIT](http://opensource.org/licenses/MIT)
