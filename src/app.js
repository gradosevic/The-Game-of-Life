import Vue from 'vue';
import Matrix from './matrix';

var App = new Vue({
    el: '.vue-app',
    data: {
        initialized: false,
        defaultMatrixSize: 20,
        defaultSpeed: 500,
        minGridSize: 2,
        maxGridSize: 40,
        matrix: null,
        interval: null
    },
    methods:{

        /**
         * Stops creating new generations of cells
         */
        stop: function(){
            clearInterval(this.interval);
            this.interval = null;
        },

        /**
         * Starts creating new generations of cells
         */
        start: function(){
            this.interval = setInterval(()=>{
                this.matrix.nextGeneration();
            }, this.defaultSpeed);
        },

        /**
         * Expands Matrix grid for one additional row and column
         */
        expandGrid: function(){
            if(this.matrix.matrixSize >= this.maxGridSize){
                return false;
            }
            this.matrix.expand();
        },

        /**
         * Shrinks th size of the Matrix grid for a one row and once cell
         */
        shrinkGrid: function(){
            if(this.matrix.matrixSize <= this.minGridSize){
                return false;
            }
            this.matrix.shrink();
        }
    },

    /**
     * Initializes component on page load
     */
    mounted(){
        this.matrix = new Matrix(this.defaultMatrixSize);
        this.initialized = true;
    }
});