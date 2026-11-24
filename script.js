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

    //method for matrix addition
    //takes matrix objs as args
    //returns the sum as a single matrix obj
    static addMatrices(m1, m2) {

        const sumGrid = [];
        for (let r = 0; r < m1.rows; r++) {
            const sumRow = [];
            for (let e = 0; e < m1.cols; e++) {
                sumRow.push(((m1.grid[r][e].value) + (m2.grid[r][e].value)));
            };
            sumGrid.push(sumRow);
        };

        console.log(sumGrid)

        const sumMatrix = new Matrix();
        sumMatrix.gridToMatrix(sumGrid);
        return sumMatrix;
    };


    //subtMatrices

    //multMatrices


    //end class methods
    ///////

};



const tessera = (function terraza() {

    //global vars

    const opsbox = document.getElementById('ops-box');
    const instbox = document.getElementById('inst-box');

    let mOne = undefined;
    let mTwo = undefined;

    //end global vars

    //functions scoped to the iife

    //function to generate matrix addition problem and display it in dom
    function generateAdd() {

        mOne = new Matrix();
        mTwo = mOne.buildSameSize();

        let inst = document.createElement('div');
        inst.innerText = 'Add the following matrices:';
        inst.classList.add('inst');

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

        instbox.append(inst);

        // opsbox.append(mOne.domPrint, sign, mTwo.domPrint);
        // opsbox.append(sb1, mOne.domPrint(), eb1, sign, sb2, mTwo.domPrint(), eb2);
        opsbox.append(mOne.domPrint(), sign, mTwo.domPrint());
    };

    //function to allow user to build answer
    //builds blank matrix form in the dom (builds it as modal)
    function buildAns() {

        const modal = document.createElement('div');
        modal.id = "modal";
        const modalContent = document.createElement('div');
        modalContent.id = "modal-content";

        const instDiv = document.createElement('div');
        instDiv.id = "inst-div";
        instDiv.innerText = "Select matrix size for answer or click button if operation is not possible."

        const rowColDiv = document.createElement('div');
        rowColDiv.id = "row-col";

        const labelOne = document.createElement('label');
        const labelTwo = document.createElement('label');

        const selectOne = document.createElement('select');
        const optOne = document.createElement('option');
        optOne.value = "1";
        optOne.innerText = "1";
        const optTwo = document.createElement('option');
        optTwo.value = "2";
        optTwo.innerText = "2";
        const optThree = document.createElement('option');
        optThree.value = "3";
        optThree.innerText = "3";
        const optFour = document.createElement('option');
        optFour.value = "4";
        optFour.innerText = "4";
        selectOne.id = "answer-rows";
        selectOne.append(optOne, optTwo, optThree, optFour);
        labelOne.innerText = "Rows:"
        labelOne.append(selectOne);

        const selectTwo = document.createElement('select');
        const secOptOne = document.createElement('option');
        secOptOne.value = "1";
        secOptOne.innerText = "1";
        const secOptTwo = document.createElement('option');
        secOptTwo.value = "2";
        secOptTwo.innerText = "2";
        const secOptThree = document.createElement('option');
        secOptThree.value = "3";
        secOptThree.innerText = "3";
        const secOptFour = document.createElement('option');
        secOptFour.value = "4";
        secOptFour.innerText = "4";
        selectTwo.id = "answer-rows";
        selectTwo.append(secOptOne, secOptTwo, secOptThree, secOptFour);
        selectTwo.id = "answer-cols";
        labelTwo.innerText = "Columns:";
        labelTwo.append(selectTwo);

        rowColDiv.append(labelOne, labelTwo);

        const notPsbl = document.createElement('button');
        notPsbl.innerText = "Operation not possible!";
        notPsbl.id = "not-psbl";

        modalContent.append(instDiv, rowColDiv, notPsbl);
        modal.append(modalContent);

        document.querySelector('body').append(modal);

    };

    //function to build user-input answer into Matrix object and check it
    function checkAns() {



    };


    //end functions scoped to the iife


    ///////
    //public methods...
    return {
        //functions for use outside the iife
        generateAdd,
        buildAns


    };
    ///////

})()