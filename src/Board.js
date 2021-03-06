// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {

      var aBoard = this.rows();
       // console.log('rowIndex.constructor: ' + rowIndex.constructor);
        // console.log('rowIndex:' + rowIndex);
      var aRow = aBoard[rowIndex];
        console.log('aBoard[adx]: ' + aBoard[0])
      var sum = 0;
        //console.log('aRow: ' +aRow);
      for (var i = 0; i<aRow.length; i++) {
        sum = sum + aRow[i];
      }

      if (sum > 1) {
        return true;
      } else {
        return false;
      }
      return false; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var aBoard = this.rows();
      console.log('aBlength :' + aBoard.length)

      for (var i = 0; i<aBoard.length; i++) {
        if (this.hasRowConflictAt(i) === true) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var aBoard = this.rows();
      var column = [];

      for (var i = 0; i < aBoard.length; i++) {
        column.push(aBoard[i][colIndex]);
      }

      var sum = 0;

      for (var k = 0; k < column.length; k++) {
        sum = sum + column[k];
      }

      if (sum > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var aBoard = this.rows();

      for (var i = 0; i<aBoard.length; i++) {
        if (this.hasColConflictAt(i) === true) {
          return true;
        }
      }
      return false;
    },

/* Repl.it Pad
var arr = [
            [1,1,0,0],
            [2,0,0,0],
            [3,1,1,0],
            [4,0,0,0]
          ];

var diag = [];
// diag.push(arr[i][0+0]);
// diag.push(arr[i][0+1]);
// diag.push(arr[i][0+2]);
// diag.push(arr[0+3][0+3]);

// console.log(diag);

//diag.push(arr[-1+0][0+0]);
//diag.push(arr[-1+1][0+1]);
//diag.push(arr[-1+2][0+2]);
//diag.push(arr[-1+3][0+3]);

//console.log(diag);
var indexThing = -2;

for (var i = 0; i < arr.length; i++ ) {
    if (arr[indexThing + i] === undefined) {
        console.log('undefinedcatcher');
        diag.push(0);
        console.log('idxThing: ' + indexThing)
       } else {
        diag.push(arr[i][i + indexThing])
    }
}
console.log(diag);
 */

    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var aBoard = this.rows();
      var diagonal = [];
      var sum = 0;

      for (var i = 0; i < aBoard.length; i++) {
        if (aBoard[majorDiagonalColumnIndexAtFirstRow + i] === undefined) {
          diagonal.push(0);
        } else {
          diagonal.push(aBoard[i][i + majorDiagonalColumnIndexAtFirstRow]);
        }
      }

      for (var k = 0; k < diagonal.length; k++ ) {
        sum = sum + diagonal[k];
      }

      if (sum > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var aBoard = this.rows();

      for (var i = -aBoard.length+1; i<((aBoard.length*2)-1); i++) {
        if (this.hasMajorDiagonalConflictAt(i) === true) {
          return true;
        }
      }

      return false;


      // return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {

      // store the board in a variable named aBoard;
      var aBoard = this.rows();
      // initialize an empty array named diagonal;
      var diagonal = [];
      // algorithm to extract the correct elements to push into the diagonal array;
        // initialize sum variable to count number of 1's in the diagonal array;
      var sum = 0;

      for (var i = 0; i<aBoard.length; i++) {
        if (aBoard[i][minorDiagonalColumnIndexAtFirstRow-i] === undefined) {
          diagonal.push(0);
        } else {
          diagonal.push(aBoard[i][minorDiagonalColumnIndexAtFirstRow-i]);
        }
      }

      for (var k = 0; k<diagonal.length; k++) {
        sum = sum + diagonal[k];
      }
      //if the sum is greater than 1, then return true;
      //else false
      if (sum > 1) {
        return true;
      } else {
        return false;
      }  // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {

      var aBoard = this.rows();
      var limit = aBoard.length*2-1;
      for (var i = 0; i<limit; i++) {
        if (this.hasMinorDiagonalConflictAt(i) === true) {
          return true;
        }
      }

      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
