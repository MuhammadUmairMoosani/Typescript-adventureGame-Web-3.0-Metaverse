#!/usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
let rand = () => Math.random();
// Game variables
let enemies = ["Skeleton", "Zombie", "Warrior", "Assassin"];
let maxEnemyHealth = 75;
let enemyAttackDamage = 25;
// Flayer variables
let health = 100;
let attackDamage = 50;
let numHealthPotions = 3;
let healthPotionHealAmount = 30;
let healthPotionDropChance = 50; // Percentage
let running = true;
console.log(chalk.green("Welcome to the Dungeon"));
const GAME = async () => {
    while (running) {
        console.log("-----------------------------------------------------------");
        let enemyHealth = Number((rand() * maxEnemyHealth).toFixed());
        let enemy = enemies[Number((rand() * enemies.length).toFixed())];
        console.log("\t# " + enemy + " has appeared! #\n");
        while (maxEnemyHealth > 0) {
            console.log("\tYour HP: " + health);
            console.log("\t" + enemy + "'s HP: " + enemyHealth);
            console.log("\n\tWhat would you like to do?");
            console.log("\t1. Attack");
            console.log("\t2. Drink health potion");
            console.log("\t3. Run!");
            let input = await inquirer.prompt({
                type: "number",
                name: "value",
                message: "Please select"
            });
            const { value } = input;
            switch (value) {
                case 1:
                    let damageDealt = Number((rand() * attackDamage).toFixed());
                    let damageTaken = Number((rand() * enemyAttackDamage).toFixed());
                    enemyHealth -= damageDealt;
                    health -= damageTaken;
                    console.log("\t> You strike the " + enemy + " for " + damageDealt + " damage.");
                    console.log("\t> You receive " + damageTaken + " in retaliation!");
                    if (health < 1) {
                        console.log("\t> You have taken too much damage, you are too weak to go on!");
                    }
                    break;
                case 2:
                    if (numHealthPotions > 0) {
                        health += healthPotionHealAmount;
                        numHealthPotions--;
                        console.log("\t> You drink a health potion, healing yourself for " + healthPotionHealAmount + "."
                            + "\n\t> You now have " + health + "HP."
                            + "\n\t> You have " + numHealthPotions + " health potions left.\n");
                    }
                    else {
                        console.log("\t> You have no health potions left! Defeat enemies for a chance to get one!\n");
                    }
                    break;
                case 3:
                    console.log("\t You run away from the " + enemy + "!");
                    GAME();
                    break;
                default:
                    console.log("\tInvalid command!");
                    break;
            }
            if (health < 1) {
                console.log("You limp out of the dungeon, weak from battle.");
                break;
            }
        }
        console.log("-----------------------------------------------------------");
        console.log(" # " + enemy + " was defeated! # ");
        console.log(" #  You have " + health + " HP left. #");
        if (Number((rand() * 100).toFixed()) < healthPotionDropChance) {
            numHealthPotions++;
            console.log(" # The " + enemy + "dropped a health potion! # ");
            console.log(" # You now have " + numHealthPotions + " health potion(s). #");
        }
        console.log("-----------------------------------------------------------");
        console.log("What would you like to do now?");
        console.log("1. Continue fighting");
        console.log("2. Exit dungeon");
        let userInput = await inquirer.prompt({
            type: "number",
            name: "choice",
            message: "Please select"
        });
        const { choice } = userInput;
        while (choice !== 1 && choice !== 2) {
            console.log("Invalid command");
            break;
        }
        if (choice === 1) {
            console.log("You continue on your adventure!");
        }
        else if (choice === 2) {
            console.log("You exit the dungeon, successful from your adventures!");
            break;
        }
    }
    console.log("################################");
    console.log("#      THANKS FOR PLAYING!     #");
    console.log("################################");
};
GAME();
