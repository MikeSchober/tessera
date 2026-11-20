"use strict"

//class definitions

//matrix entry
class Entry {
    constructor(value, color = undefined) {
        this.value = value;
        this.color = color;
    }
}

//matrices
class Matrix {
    constructor(rows = undefined, cols = undefined) {
        this.rows = rows;
        this.cols = cols;
        this.grid = undefined;
        this.disc = undefined;

        if (this.rows && this.cols) {

            //if rows and cols defined, build random matrix of that size
            this.genRandom();

        } else {

            //if all args undefined or invalid set of args, build random-sized matrix
            this.genRandom();

        };
    };

    ///////
    //instance methods

    ///
    //methods for use in constructor

    //generates random matix within constructor
    //max two-digit entries
    genRandom() {

        if (!this.rows || !this.cols) {
            //random num 1 to 5
            this.rows = Math.ceil(Math.random() * 5);
            this.cols = Math.ceil(Math.random() * 5);
        };

        this.grid = [];
        for (let r = 0; r < this.rows; r++) {
            let newRow = [];
            for (let c = 0; c < this.cols; c++) {

                //random num 0 to 99 (exclusive of 100)
                let entry = new Entry(Math.floor(Math.random() * 100));
                newRow.push(entry);

            };
            this.grid.push(newRow)
        };

    };

    //end methods for use in constructor
    ///

    //method for use when need to build user-input matrix into matrix object (matrix instantiated, then this called with nested arrays as arg)
    //takes nested array and builds it into matrix grid containing Entry objects
    //takes nested array as arg ex: [[1,2,3], [,4,5,6]]
    //also validates input matrix
    gridToMatrix(g) {

        this.grid = [];
        let rowLength = 0;

        for (let r = 0; r < g.length; r++) {
            let newRow = [];

            //validating valid matrix
            if (rowLength === 0) {
                rowLength = g[r].length;
            } else {
                if (rowLength !== g[r].length) throw new Error("Invalid matrix!");
            };

            for (let c = 0; c < g[r].length; c++) {

                let entry = new Entry(g[r][c]);
                newRow.push(entry);

            };
            this.grid.push(newRow)
        };

        //defines grid size
        //assumes all rows are of equal length (already validated)
        this.rows = this.grid.length
        this.cols = this.grid[0].length

    };

    //method to build a random matrix of same size as this matrix
    buildSameSize() {

    };

    //method to handle scalar multiplication
    scalarMult(scalar) {

    };

    //later... methods to handle rows ops (swapping two rows, multiplying single row by constant, adding/subt one row to/from another)

    //end instance methods
    ///////

    ///////
    //class methods

    //addMatrices

    //subtMatrices

    //multMatrices


    //end class methods
    ///////

};



(function terraza() {

    //global vars


    //end global vars

    //functions scoped to the iife

    //function to read matrix and display in the DOM
    //takes matrix obj as arg
    function displayMatrix(m) {


    };

    //function to allow user to build answer
    function buildAns() {


    };

    //function to build user-input answer into Matrix object and check it
    function checkAns() {



    };


    //end functions scoped to the iife


    ///////
    //public methods...
    return {
        //functions for use outside the iife



    };
    ///////

})()