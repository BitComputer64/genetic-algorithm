const Individual = require('./individual'); // Individual population member class

module.exports = Population; // Export class

/* 
 - Create a new class, with two properties:
    * individuals: an array of the individuals in this population
    * indivlength: the length of each individuals' genes
 
 @param populationSize
    the number of members in this population
 @param length
    the length of each members' genes (number of genes)
 @param initialize
    whether or not this population is being initialized
*/
function Population(populationSize, length, initialize) {
    this.individuals = new Array(populationSize); // Create an array with 'populationSize' elements
    this.indivlength = length; // Each individual has 'length' genes

    if (initialize) { 
        // for each element in the 'individuals' array, create a new individual and populate that element with it.
        for (let i = 0; i < this.size(); i++) {
            var newIndividual = new Individual(this.indivlength);
            newIndividual.generateIndividual();
            this.saveIndividual(i, newIndividual);
        }
    }
}

// Getters

Population.prototype.getIndividual = function(index) {
    return this.individuals[index];
}

Population.prototype.getIndividualSize = function() {
    return this.indivlength;
}

Population.prototype.getFittest = function() {
    var fittest = this.individuals[0];

    for (let i = 0; i < this.size(); i++) {
        if (fittest.getFitness() <= this.getIndividual(i).getFitness()) {
            fittest = this.getIndividual(i);
        }
    }
    return fittest;
}

Population.prototype.size = function() {
    return this.individuals.length;
}

// Setters

Population.prototype.saveIndividual = function(index, indiv) {
    this.individuals[index] = indiv;
}