const Individual = require('./individual'); // Individual population member class
const Population = require('./population'); // Population generation class

module.exports = Algorithm; // Export class

const uniformRate = 0.5; // Rate at which 'crossing over' occurs
const mutationRate = 0.015; // Rate at which 'mutation' occurs
const tournamentSize = 5; // Size of 'tournaments' that narrow down the fittest individuals
const elitism = true; // Whether or not the fittest individual of each generation should be preserved to the next

// Create a new class, with no properties or logic since new instances are not created.
function Algorithm() {}

/*
 - This is a function that progresses a population to the next generation.
 - It takes a population, performs multiple operations on it, and thereby 'evolves' it.

 @param pop
    the population/generation of a population that is evolving
 @return newPopulation
    the evolved population
*/
Algorithm.prototype.evolvePopulation = function(pop) {
    var newPopulation = new Population(pop.size(), pop.getIndividualSize(), false); // create a new population, but do not initialize any individuals

    if (elitism) {
        // if the fittest individual must be preserved, get the fittest member and put it at the top of the population
        newPopulation.saveIndividual(0, pop.getFittest());
    }

    var elitismOffset = (elitism) ? 1 : 0; // if the fittest individual must be preserved, ignore the first (fittest) member of the population in the following steps

    for (let i = elitismOffset; i < pop.size(); i++) {
        /* 
         - for each member of the population: 
            * choose a select individual from the population, the fittest out of 'tournamentSize' randomly selected members
            * choose another individual from the population, the fittest out of another 'tournamentSize' randomly selected members
            * 'cross over' the genes of the two members
            * add the resulting member to the new population ('newPopulation')
        */
        var indiv1 = this.tournamentSelection(pop);
        var indiv2 = this.tournamentSelection(pop);
        var newIndiv = this.crossover(indiv1, indiv2);
        newPopulation.saveIndividual(i, newIndiv);
    }

    for (let i = elitismOffset; i < newPopulation.size(); i++) {
        // for each member of this new population, mutate them
        this.mutate(newPopulation.getIndividual(i));
    }

    return newPopulation;
}

// This is a function that takes two individuals and crosses their genes over.
Algorithm.prototype.crossover = function(indiv1, indiv2) {
    var newSol = new Individual(indiv1.size());

    for (let i = 0; i < indiv1.size(); i++) {
        newSol.setGene(i, (Math.random() < uniformRate) ? indiv1.getGene(i) : indiv2.getGene(i));
    }

    return newSol;
}

// This is a function that takes an individual and mutates their genes.
Algorithm.prototype.mutate = function(indiv) {
    for (let i = 0; i < indiv.size(); i++) {
        if (Math.random() <= mutationRate) {
            var char = Math.floor(Math.random() * 94) + 32;
            var gene = String.fromCharCode(char);
            indiv.setGene(i, gene);
        }
    }
}

// This is a function that takes 'tournamentSize' randomly selected individuals from the population and determines the fittest.
Algorithm.prototype.tournamentSelection = function(pop) {
    var tournament = new Population(tournamentSize, pop.getIndividualSize(), false);

    for (let i = 0; i < tournamentSize; i++) {
        var randomId = Math.round(Math.random() * (pop.size() - 1));
        tournament.saveIndividual(i, pop.getIndividual(randomId));
    }

    var fittest = tournament.getFittest();
    return fittest;
}