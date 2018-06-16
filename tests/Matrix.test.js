import Matrix from './../src/Matrix';

/**
 * Tests that buildMatrix returns the matrix of correct size
 * Matrix should have the same width and height and match the matrixSize input variable
 */
test('buildMatrix returns correct matrix size', () => {
    let matrixSize = 4;
    let matrix = new Matrix(matrixSize);
    let grid = matrix.get();

    //Assert the row length
    expect(grid.length).toBe(matrixSize);

    //Assert column length
    expect(grid[0].length).toBe(matrixSize);
});

/**
 * Tests randomBoolean method return boolean true or false
 */
test('randomBoolean method', () => {
    let matrix = new Matrix();
    let result = matrix.randomBoolean();
    expect(result == 0 || result == 1).toBeTruthy();
});

/**
 * Tests that isAlive method returns correct value
 * regarding the state of the cell, live or dead
 */
test('isAlive method', () => {
    let matrix = new Matrix();
    let grid = matrix.get();
    let cell00 = grid[0][0];
    let cell01 = grid[0][1];
    let cell02 = grid[0][2];

    expect(matrix.isAlive(0,0)).toBe(cell00);
    expect(matrix.isAlive(0,1)).toBe(cell01);
    expect(matrix.isAlive(0,2)).toBe(cell02);
});

/**
    Test live neighbours of 1:1 cell
    0:0, 0:1, 0:2
    1:0, 1:1, 1:2
    2:0, 2:1, 2:2
 */
test('getTotalNumberOfLiveNeighbours method', () => {
    let matrix = new Matrix();
    let grid = matrix.get();
    let cell00 = grid[0][0];
    let cell01 = grid[0][1];
    let cell02 = grid[0][2];
    let cell10 = grid[1][0];
    let cell12 = grid[1][2];
    let cell20 = grid[2][0];
    let cell21 = grid[2][1];
    let cell22 = grid[2][2];

    //Get total number of live neighbours for cell 1:1
    let totalLiveNeighbours = matrix.getTotalNumberOfLiveNeighbours(1, 1);

    let expectedLiveNeighbours = cell00 + cell01 + cell02 + cell10 + cell12 + cell20 + cell21 + cell22;
    expect(totalLiveNeighbours).toBe(expectedLiveNeighbours);
});


/**
 * Tests nextGenerationDeadOrAlive method
 */
test('nextGenerationDeadOrAlive method', () => {
    let matrix = new Matrix();
    let grid = matrix.get();
    let cell00 = grid[0][0];
    let cell01 = grid[0][1];
    let cell02 = grid[0][2];
    let cell10 = grid[1][0];
    let cell11 = grid[1][1];
    let cell12 = grid[1][2];
    let cell20 = grid[2][0];
    let cell21 = grid[2][1];
    let cell22 = grid[2][2];

    let liveNeighbours = cell00 + cell01 + cell02 + cell10 + cell12 + cell20 + cell21 + cell22;

    expect(matrix.nextGenerationDeadOrAlive(1,1)).toBe(matrix.shouldLive(cell11, liveNeighbours)?1:0);
});

/**
 * Tests rule #1: Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
 */
test('shouldLive: Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.', () => {
    let matrix = new Matrix();
    const isAlreadyAlive = true;
    expect(matrix.shouldLive(isAlreadyAlive, 0)).toBe(false);
    expect(matrix.shouldLive(isAlreadyAlive, 1)).toBe(false);
});

/**
 * Tests rule #2: Any live cell with two or three live neighbours lives on to the next generation.
 */
test('shouldLive: Any live cell with two or three live neighbours lives on to the next generation.', () => {
    let matrix = new Matrix();
    const isAlreadyAlive = true;
    expect(matrix.shouldLive(isAlreadyAlive, 2)).toBe(true);
    expect(matrix.shouldLive(isAlreadyAlive, 3)).toBe(true);
});

/**
 * Tests rule #3: Any live cell with more than three live neighbours dies, as if by overpopulation.
 */
test('shouldLive: Any live cell with more than three live neighbours dies, as if by overpopulation.', () => {
    let matrix = new Matrix();
    const isAlreadyAlive = true;
    expect(matrix.shouldLive(isAlreadyAlive, 4)).toBe(false);
    expect(matrix.shouldLive(isAlreadyAlive, 5)).toBe(false);
});

/**
 * Tests rule #4: Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
 */
test('shouldLive: Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.', () => {
    let matrix = new Matrix();
    const isAlreadyAlive = false;
    expect(matrix.shouldLive(isAlreadyAlive, 3)).toBe(true);
});

/**
 * Tests that dead cells with more or less than three live neighbours stays dead
 */
test('shouldLive: Any dead cell with more or less than three live neighbours stays dead', () => {
    let matrix = new Matrix();
    const isAlreadyAlive = false;
    expect(matrix.shouldLive(isAlreadyAlive, 0)).toBe(false);
    expect(matrix.shouldLive(isAlreadyAlive, 1)).toBe(false);
    expect(matrix.shouldLive(isAlreadyAlive, 2)).toBe(false);
    expect(matrix.shouldLive(isAlreadyAlive, 4)).toBe(false);
    expect(matrix.shouldLive(isAlreadyAlive, 5)).toBe(false);
});

/**
 * Test nextGeneration method.
 */
test('nextGeneration method', () => {
    let matrix = new Matrix();
    let expected = matrix.nextGenerationDeadOrAlive(1, 1);
    matrix.nextGeneration();
    let nextGeneration = matrix.get();
    expect(nextGeneration[1][1]).toBe(expected);
});

/**
 * Test that expand method expands the grid for one row and one cell
 */
test('expand method', () => {
    let matrixSize = 6;
    let matrix = new Matrix(matrixSize);

    matrix.expand();

    let grid = matrix.get();

    //Assert the row length
    expect(grid.length).toBe(matrixSize + 1);

    //Assert column length
    expect(grid[0].length).toBe(matrixSize + 1);

});

/**
 * Test that shrink method shrinks the grid for a one row and one cell
 */
test('shrink method', () => {
    let matrixSize = 6;
    let matrix = new Matrix(matrixSize);

    matrix.shrink();

    let grid = matrix.get();

    //Assert the row length
    expect(grid.length).toBe(matrixSize - 1);

    //Assert column length
    expect(grid[0].length).toBe(matrixSize - 1);

});

/**
 * Returns Matrix grid array
 */
test('get method', () => {
    let matrixSize = 6;
    let matrix = new Matrix(matrixSize);
    let grid = matrix.get();

    //Assert the row length
    expect(grid.length).toBe(matrixSize);

    //Assert column length
    expect(grid[0].length).toBe(matrixSize);

});