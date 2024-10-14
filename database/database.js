// database.js

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('inventory.db');

export const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, quantity INTEGER);',
      [],
      () => console.log("Table created successfully"),
      (_, error) => console.log("Error creating table:", error)
    );
  });
};

export const addItem = (name, quantity) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO items (name, quantity) VALUES (?, ?);',
      [name, quantity],
      (_, result) => console.log("Item added successfully", result),
      (_, error) => console.log("Error adding item:", error)
    );
  });
};

export const getItems = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM items;',
      [],
      (_, { rows }) => callback(rows._array),
      (_, error) => console.log("Error fetching items:", error)
    );
  });
};
