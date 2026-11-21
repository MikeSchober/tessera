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
            //random num 1 to 4
            this.rows = Math.ceil(Math.random() * 4);
            this.cols = Math.ceil(Math.random() * 4);
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

    //method to build and return dom element for display in browser
    //returns div element (dom obj)
    domPrint() {

        const container = document.createElement('div');
        container.classList.add('outer-matrix');

        let sb = document.createElement('span');
        sb.innerText = '[';
        sb.classList.add('sb');
        let eb = document.createElement('span');
        eb.innerText = ']';
        eb.classList.add('eb');

        const innerContainer = document.createElement('div');
        innerContainer.classList.add('matrix');

        for (let r = 0; r < this.rows; r++) {
            let newRow = document.createElement('div');

            for (let c = 0; c < this.cols; c++) {
                const rowEntry = document.createElement('span');
                let e;
                (this.grid[r][c].value < 10) ? (e = ` ${this.grid[r][c].value}`) : (e = this.grid[r][c].value)
                rowEntry.innerText = e;
                if (this.grid[r][c].color) rowEntry.classList.add(grid[r][c].color);
                newRow.append(rowEntry);
            };
            innerContainer.append(newRow);
        };

        container.append(sb, innerContainer, eb);

        return container;
    };

    //method to build a random matrix of same size as this matrix
    buildSameSize() {

        return new Matrix(this.rows, this.cols);

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



const tessera = (function terraza() {

    //global vars

    const opsbox = document.getElementById('ops-box');

    let mOne = undefined;
    let mTwo = undefined;

    //end global vars

    //functions scoped to the iife

    //function to generate matrix addition problem and display it in dom
    function generateAdd() {

        mOne = new Matrix();
        mTwo = mOne.buildSameSize();

        let sign = document.createElement('span');
        sign.innerText = '+';
        sign.classList.add('sign');

        // let sb1 = document.createElement('span');
        // sb1.innerText = '[';
        // sb1.classList.add('sb');
        // let eb1 = document.createElement('span');
        // eb1.innerText = ']';
        // eb1.classList.add('eb');
        // const eb2 = eb1.cloneNode(true);
        // const sb2 = sb1.cloneNode(true);

        console.log(mOne.domPrint());

        // opsbox.append(mOne.domPrint, sign, mTwo.domPrint);
        // opsbox.append(sb1, mOne.domPrint(), eb1, sign, sb2, mTwo.domPrint(), eb2);
        opsbox.append(mOne.domPrint(), sign, mTwo.domPrint());
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
        generateAdd


    };
    ///////

})()