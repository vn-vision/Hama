import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, TextInput, ActivityIndicator } from 'react-native';
import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';
import { hashPassword } from './security'; // Import a function to hash passwords

const AutomationApp = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [db, setDb] = useState<SQLiteDatabase | null>(null);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Initialize SQLite database
  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        const database: SQLiteDatabase = await SQLite.openDatabase(
          { name: 'automationApp.db', location: 'default' }
        );
        setDb(database);
        console.log('Database opened successfully');
        createTables(database);
      } catch (error) {
        console.error('Failed to open database:', error);
      }
    };

    initializeDatabase();

    return () => {
      db?.close()
        .then(() => console.log('Database closed successfully'))
        .catch(error => console.error('Failed to close database:', error));
    };
  }, []);

  const createTables = (database: SQLiteDatabase) => {
    
    // Code for creating tables
    console.log('Creating tables...');
    database.transaction(tx => {
      // Users table creation
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Users (
          user_id INTEGER PRIMARY KEY,
          username TEXT NOT NULL,
          password TEXT NOT NULL,
          login_attempts INTEGER DEFAULT 0,
          last_login DATETIME
        );`,
        [],
        () => console.log('Users table created successfully'),
        (error) => console.error('Failed to create Users table:', error)
      );
  
      // Components table creation
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Components (
          component_id INTEGER PRIMARY KEY,
          component_name TEXT NOT NULL
        );`,
        [],
        () => console.log('Components table created successfully'),
        (error) => console.error('Failed to create Components table:', error)
      );
  
      // Rooms table creation
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Rooms (
          room_id INTEGER PRIMARY KEY,
          room_name TEXT NOT NULL
        );`,
        [],
        () => console.log('Rooms table created successfully'),
        (error) => console.error('Failed to create Rooms table:', error)
      );
  
      // User_Component_Room table creation
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS User_Component_Room (
          user_component_room_id INTEGER PRIMARY KEY,
          user_id INTEGER,
          component_id INTEGER,
          room_id INTEGER,
          status TEXT,
          status_changed_at DATETIME,
          FOREIGN KEY (user_id) REFERENCES Users(user_id),
          FOREIGN KEY (component_id) REFERENCES Components(component_id),
          FOREIGN KEY (room_id) REFERENCES Rooms(room_id)
        );`,
        [],
        () => console.log('User_Component_Room table created successfully'),
        (error) => console.error('Failed to create User_Component_Room table:', error)
      );
    });
  };

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Please enter username and password.');
      return;
    }

    setLoading(true);
    try {
      const hashedPassword = await hashPassword(password); // Hash the password
      db?.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM Users WHERE username = ? AND password = ?`,
          [username, hashedPassword],
          (tx, results) => {
            const len = results.rows.length;
            if (len > 0) {
              setAuthenticated(true);
              const user = results.rows.item(0);
              const currentTime = new Date().toISOString();
              tx.executeSql(
                `UPDATE Users SET last_login = ? WHERE user_id = ?`,
                [currentTime, user.user_id],
                () => console.log('Last login time updated successfully'),
                (_, error) => console.error('Failed to update last login time:', error)
              );
            } else {
              Alert.alert('Invalid credentials');
            }
          },
          (_, error) => console.error('Failed to execute login query:', error)
        );
      });
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('An error occurred during login. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegistration = async () => {
    if (!username || !password) {
      Alert.alert('Please enter username and password.');
      return;
    }

    setLoading(true);
    try {
      const hashedPassword = await hashPassword(password); // Hash the password
      db?.transaction(tx => {
        tx.executeSql(
          `INSERT INTO Users (username, password) VALUES (?, ?)`,
          [username, hashedPassword],
          () => {
            console.log('User registered successfully');
            setAuthenticated(true);
          },
          (_, error) => console.error('Failed to register user:', error)
        );
      });
    } catch (error) {
      console.error('Error during registration:', error);
      Alert.alert('An error occurred during registration. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {!authenticated && (
        <View>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={text => setUsername(text)}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <Button title="Login" onPress={handleLogin} disabled={loading} />
          <Button title="Register" onPress={handleRegistration} disabled={loading} />
          {loading && <ActivityIndicator />}
        </View>
      )}
      {authenticated && (
        <View>
          <Text>App Content</Text>
          {/* Add your app content here */}
        </View>
      )}
    </View>
  );
};

export default AutomationApp;
