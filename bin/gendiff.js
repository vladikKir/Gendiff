#!/usr/bin/env node
import { Command } from "commander";
const program = new Command;

program
    .name('gendiff')
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.');

program
    .argument('<filepath1>')
    .argument('<filepath2>')
    .option('-f, --format <type>',  'output format')

program.parse();