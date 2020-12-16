const FitnessCalc = require('./fitnesscalc'); // Fitness calculation class
const Population = require('./population'); // Population generation class
const Algorithm = require('./algorithm'); // Genetic algorithm logic class

const readline = require('readline'); // User input module

const REV = '1.0.0'; // Revision number
const POPSIZE = 100; // Size of population
const RAND_MAX = 100; // Max length of a random solution

// Create new input interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/*
 - This is a function that takes user input.
 - It will ask for an answer, and return a promise that will resolve upon an answer being given.

 @return Promise
    will resolve upon the providing of an answer
*/
function ask() {
    rl.setPrompt(`Hi! This is Jay's genetic algorithm, revision ${REV}. What solution do you want? Enter 'random' if you want a random solution, or 'exit' if you want to exit the program.\nSolution: `);
    rl.prompt();

    return new Promise((resolve) => {
        rl.on('line', (ans) => {
            resolve(ans);
        });
    });
}

/*
 - The main loop.
 - This will continue to run until the user exits (^C) or types 'exit'
*/
async function run() {
    while (true) {
        var ans = await ask();

        if (ans.toLowerCase() == 'random') {
            var num = Math.round(Math.random() * (RAND_MAX - 1)) + 1;
            var thing = [];
            for (let i = 0; i < num; i++) {
                var char = Math.floor(Math.random() * 94) + 32;
                thing.push(String.fromCharCode(char));
            }
            ans = thing.join("");
        }
        else if (ans.toLowerCase() == 'exit') {
            return rl.close();
        }

        console.log(`Your solution is ${ans}.`);
        var solution = ans;
        FitnessCalc.prototype.setSolution(solution);
        var myPop = new Population(POPSIZE, ans.length, true);

        var generation = 1;
        console.log(`Looking for solution '${solution}'.`);
        console.log('--------------------------------------------------------------');
        while (myPop.getFittest().getFitness() < FitnessCalc.prototype.getMaxFitness()) {
            console.log(`Generation ${generation}; Highest fitness: ${myPop.getFittest().getFitness()} out of ${solution.length} characters; Genes: ${myPop.getFittest()}`);
            myPop = Algorithm.prototype.evolvePopulation(myPop);
            generation++;
        }
        console.log('--------------------------------------------------------------');
        console.log('Solution found!');
        console.log(`Your solution was found in generation ${generation}.`);
        console.log(`Genes: ${myPop.getFittest()}`);
        console.log('--------------------------------------------------------------');
    }
}

// Call the main loop
run();