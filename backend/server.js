import express, { json } from 'express';
import { createConnection } from 'mysql';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(json());

const db = createConnection({
    host: 'localhost',
    user: '',
    password: '',
    database: '',
});

db.connect((error) => {
    if (error) {
        console.log("Error while connecting database mysql", error);
    } else {
        console.log("Successfully connected to database");
    }
});
app.get('/', (req, res) => {
  res.send('Welcome! Please log in as admin, student, or teacher.');
});
app.post('/signin', (req, res) => {
  // console.log('Received sign-in request');
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.length > 0) {
        const user = results[0];
        res.json({ role: user.role });
      } else {
        res.status(401).json({ error: 'Unauthorized' });
      }
    }
  });
});
app.post('/admin/addTeacher', (req, res) => {
  const { username, password, full_name } = req.body;
  if (req.body.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  db.query(
    'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
    [username, password, 'teacher'],
    (userErr, userResults) => {
      if (userErr) {
        console.error('User insertion error:', userErr);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      const teacherId = userResults.insertId;

      db.query(
        'INSERT INTO teachers (user_id, full_name,password) VALUES (?, ?, ?)',
        [teacherId, full_name,password],
        (teacherErr) => {
          if (teacherErr) {
            console.error('Teacher insertion error:', teacherErr);
            return res.status(500).json({ error: 'Internal Server Error' });
          }

          res.json({ message: 'Teacher added successfully' });
        }
      );
    }
  );
});
app.post('/admin/addStudent', (req, res) => {
  const { username, password, full_name } = req.body;
  if (req.body.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  db.query(
    'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
    [username, password, 'student'],
    (userErr, userResults) => {
      if (userErr) {
        console.error('User insertion error:', userErr);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      const studentId = userResults.insertId;

      db.query(
        'INSERT INTO students (user_id, full_name,password) VALUES (?, ?, ?)',
        [studentId, full_name,password],
        (studentErr) => {
          if (studentErr) {
            console.error('Student insertion error:', studentErr);
            return res.status(500).json({ error: 'Internal Server Error' });
          }

          res.json({ message: 'Student added successfully' });
        }
      );
    }
  );
});
app.post('/teacher/addLearningMaterial', (req, res) => {
  const { title, content } = req.body;
  
  if (req.body.role !== 'teacher') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  db.query(
    'INSERT INTO learning_materials (title, content) VALUES (?, ?)',
    [title, content],
    (materialErr, results) => {
      if (materialErr) {
        console.error('Learning material insertion error:', materialErr);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      const insertedMaterialId = results.insertId;
      res.json({ message: 'Learning material added successfully', materialId: insertedMaterialId });
    }
  );
});
app.get('/student/materials', (req, res) => {
  db.query('SELECT * FROM learning_materials', (err, results) => {
    if (err) {
      console.error('Error fetching learning materials:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});