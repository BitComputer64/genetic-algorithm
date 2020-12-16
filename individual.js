const FitnessCalc = require('./fitnesscalc'); // Fitness calculation class

module.exports = Individual; // Export class

/* 
 - Create a new class, with three properties:
    * defaultGeneLength: how many genes each individual has; either the provided number, or 64 by default
    * genes: an array of all genes this individual possesses
    * fitness: how 'fit' this individual is, used to compare against other individuals

 @param length
    how many genes this individual should have; if none is provided, defaults to 64
*/
function Individual(length) {
    this.defaultGeneLength = length || 64; // each individual has 'length' genes, or 64 if the length is not specified
    this.genes = new Array(this.defaultGeneLength); // create an array with 'defaultGeneLength' elements
    this.fitness = 0; // initialize 'fitness' to zero
}

/*
 - This is a function that actually initializes an individual.
 - It will randomly generate the genes for each individual.
*/
Individual.prototype.generateIndividual = function() {
    for (let i = 0; i < this.size(); i++) {
        // for each element in the 'genes' array of this individual, set it to a random character with an ASCII value between 32 and 126 (meaningful characters)
        var char = Math.floor(Math.random() * 94) + 32;
        var gene = String.fromCharCode(char);
        this.genes[i] = gene;
    }
}

// Getters

Individual.prototype.getGene = function(index) {
    return this.genes[index];
}

Individual.prototype.size = function() {
    return this.genes.length;
}

Individual.prototype.getFitness = function() {
    if (this.fitness == 0) {
        this.fitness = FitnessCalc.prototype.getFitness(this);
    }
    return this.fitness;
}

Individual.prototype.toString = function() {
    return this.genes.join("");
}

// Setters

Individual.prototype.setDefaultGeneLength = function(length) {
    this.defaultGeneLength = length;
}

Individual.prototype.setGene = function(index, value) {
    this.genes[index] = value;
    this.fitness = 0;
}