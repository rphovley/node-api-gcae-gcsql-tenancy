#!/usr/bin/env node
"use strict";
const db = require("../server/dist/database").default;
// console.log(db
const knex = db.getInstance().getKnex();
const fs        = require("fs");
const path      = require("path");

/**
 * Main Function
 * Gets the migrations already in the database and runs any new migrations
 */
const main = async ()=>{
  var res = await to(getKnexMigrations());
  if(res.err) {
    await createMigrationTable();
    res = await getKnexMigrations();
  }
  await processMigrations(queryToSet(res.data));
}
main();

/**
 * @param {Set} migration_set set of migrations that have already been run
 */
async function processMigrations(migration_set){
  var files = getMigrationFiles();
  for(var i = 0; i < files.length; i++){
    var shouldExit = i==files.length-1;    
    if(!migration_set.has(files[i])){
      await insertAndWriteKnexMigration(files[i]);
      if(shouldExit)process.exit();
    }else{
      if(shouldExit)process.exit();      
    }
  }
}

/**
 * Gets migration files from current directory
 */
function getMigrationFiles(){
  return fs.readdirSync(__dirname)
  .filter(function(file) {
    console.log(file);
    return (file.indexOf(".") !== 0) && (file !== "migration.js");;
  })
  
}

/**
 * Runs create knex_migrations table query
 */
function createMigrationTable(){
  console.log("creating migration table");
  const CREATE_MIGRATION_QUERY = 'CREATE TABLE knex_migrations( \
    ID SERIAL PRIMARY KEY     NOT NULL, \
    migration TEXT         NOT NULL \
  );'
  return knex.raw(CREATE_MIGRATION_QUERY);
}

/**
 * Runs get knex_migrations query
 */
function getKnexMigrations(){
  const SELECT_MIGRATION_QUERY = 'SELECT migration FROM knex_migrations ORDER BY migration;';
  return knex.raw(SELECT_MIGRATION_QUERY);
}

/** 
 * checks if there is an error on sql response and it is not a TypeError 
 * */
function isRealSQLError(res){
  return res.err && !(res.err instanceof TypeError)
}

/**
 * runs the migration file and creates a record for it in the database
 * @param {String} file migration file to run 
 */
async function insertAndWriteKnexMigration(file){
  var filePromise = new Promise((resolve, reject)=>{
    fs.readFile(path.join(__dirname, file), 'utf8', function (err,data) {
      if(err)reject(err);
      else resolve(data);
    });
  });
  var fileData = await filePromise;
  console.log("Migrating " + file);   

  //TODO: errors coming back seem to be a knex 7 issue with raw queries with multiple statements. Look into this later. It's a TypeError
  var res = await to(knex.raw(fileData));
  if(isRealSQLError(res)){
    console.error("\x1b[31m","*************************************************");    
    console.error("\x1b[31m","Error executing query: ", res.err);
    console.error("\x1b[31m","*************************************************");    
  }else{var res = await to(knex.raw(`INSERT INTO knex_migrations(migration) VALUES('${file}')`));
    // if(res.err)console.log("Error recording executed migration: ", res.err);
    console.log("Migrated " + file); 
  }
}

/**
 * Takes knex query result and turns them into a set
 * @param {*} queryResults 
 */
function queryToSet(queryResults){
  var migration_set = new Set();
  if(queryResults){
    console.log(queryResults.rows)
    // queryResults = queryResults[RESULTS_ARR];
    for(var i = 0; i < queryResults.rows.length; i++){
      migration_set.add(queryResults.rows[i].migration);
    }
  }
  return migration_set;
}

function to(promise) {
  return promise.then(data => {
      return {data: data};
  })
  .catch(err => {
    return {err: err};
  });
}
