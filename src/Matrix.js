/**
 * Matrix, class that creates and handles The Game of Life grid
 */
export default class Matrix {

    /**
     * Constructor, calls buildMatrix to create the new grid
     * @param matrixSize The size of the grid square. default 5 rows and 5 columns
     */
    constructor(matrixSize) {
        this.matrixSize = matrixSize || 15;
        this.buildMatrix();
    }

    /**
     * Creates a new grid matrix with random live/dead values
     */
    buildMatrix(){
        var matrix = [];
        for(let i = 0; i < this.matrixSize; i++ ){
            matrix[i] = [];
            for(let j = 0; j < this.matrixSize; j++ ){
                matrix[i][j] = this.randomBoolean();
            }
        }
        this.matrix = matrix;
    }

    /**
     * Returns random boolean number
     * @returns {number} true or false
     */
    randomBoolean(){
        return Math.random() >= 0.5? 1: 0;
    }

    /**
     * Checks if a particular cell in the matrix is currently alive
     * @param row Matrix row index (starts from 0)
     * @param column Matrix column index (starts from 0)
     * @returns {number} live/dead value 0 or 1
     */
    isAlive(row, column){
        var val = 0;
        try{
            val = this.matrix[row][column];
        }catch(e){}
        return val?1:0;
    };

    /**
     * Returns the total number of live neighbour cells of a particular
     * cell that is tested
     * @param row Tested cell row index (starts from 0)
     * @param column Tested cell column index (starts from 0)
     * @returns {number} The number of live neighbour cells
     */
    getTotalNumberOfLiveNeighbours(row, column){
        var topLeftCorner = this.isAlive(row-1, column-1);
        var top = this.isAlive(row-1, column);
        var topRightCorner = this.isAlive(row-1, column+1);
        var left = this.isAlive(row, column-1);
        var right = this.isAlive(row, column+1);
        var bottomLeftCorner = this.isAlive(row+1, column-1);
        var bottom = this.isAlive(row+1, column);
        var bottomRightCorner = this.isAlive(row+1, column+1);

        return topLeftCorner + top + topRightCorner + left + right + bottomLeftCorner + bottom + bottomRightCorner;
    }

    /**
     * Returns the dead/live value for the next generation of a particular cell
     * matched by its row and column index
     * @param row Cell's row index (starts from 0)
     * @param column Cell's column index (starts from 0)
     * @returns {number} Returns 1 if cell stays live in the next generation
     * and 0 if it dies in the next generation
     */
    nextGenerationDeadOrAlive(row, column){
        row = parseInt(row);
        column = parseInt(column);
        var isAlreadyAlive = this.isAlive(row, column);
        var liveNeighbours = this.getTotalNumberOfLiveNeighbours(row, column);

        return this.shouldLive(isAlreadyAlive, liveNeighbours)?1:0;
    }

    /**
     * Returns the dead/live value for the next generation of a particular cell
     * decided by the defined rules
     * @param isAlreadyAlive If a cell is currently alive
     * @param liveNeighbours The number of live neighbours
     * @returns {boolean} Returns true if cell stays live in the next generation
     * and false if it dies in the next generation
     */
    shouldLive(isAlreadyAlive, liveNeighbours){
        if(isAlreadyAlive){
            return (liveNeighbours == 2 || liveNeighbours == 3);
        }else{
            return liveNeighbours == 3;
        }
    }

    /**
     * Calculates the next generation of the grid's cells
     */
    nextGeneration(){
        var newMatrix = [];
        for(let row in this.matrix) {
            newMatrix[row] = [];
            for (let column in this.matrix[row]) {
                newMatrix[row][column] = this.nextGenerationDeadOrAlive(row, column);
            }
        }
        this.matrix = newMatrix;
    }

    /**
     * Expands the grid for one row and one column
     */
    expand(){
        this.matrixSize++;
        this.matrix[this.matrixSize-1] = [];
        for(let i = 0; i < this.matrixSize; i++ ){
            //Append a new column to all rows
            this.matrix[i][this.matrixSize-1] = this.randomBoolean();

            //Fill the last row with random values
            if(i == this.matrixSize-1){
                for(let j = 0; j < this.matrixSize; j++ ){
                    this.matrix[i][j] = this.randomBoolean();
                }
            }
        }
    }

    /**
     * Shrinks the grid for one row and one column
     */
    shrink(){
        this.matrixSize--;
        this.matrix.splice(this.matrixSize-1, 1);
        for(let i = 0; i < this.matrixSize; i++ ){
            this.matrix[i].splice(this.matrixSize-1, 1);
        }
    }

    /**
     * Returns matrix grid array
     * @returns {matrix} Grid 2-dimensional array
     */
    get(){
        return this.matrix;
    }
};