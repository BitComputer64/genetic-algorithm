module.exports = FitnessCalc; // Export class

// Create a new class, with no properties or logic since new instances are not created.
function FitnessCalc() {}

// Getters

FitnessCalc.prototype.getFitness = function(individual) {
    var fitness = 0;

    for (let i = 0; i < individual.size() && i < this.solution.length; i++) {
        if (individual.getGene(i) == this.solution[i]) {
            fitness++;
        }
    }

    return fitness;
}

FitnessCalc.prototype.getMaxFitness = function() {
    var maxFitness = this.solution.length;
    return maxFitness;
}

// Setters

FitnessCalc.prototype.setSolution = function(newSolution) {
    this.solution = new Array(newSolution.length);

    for (let i = 0; i < newSolution.length; i++) {
        this.solution[i] = newSolution.charAt(i);
    }
}