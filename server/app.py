from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# PostgreSQL Connection String (Update with your credentials)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:1998@localhost:5432/pomodoro"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Define Tasks Model (Matches Existing Table Structure)
class Tasks(db.Model):
    __tablename__ = 'tasks'  # Ensure it matches your existing table name
    id = db.Column(db.Integer, primary_key=True)
    task = db.Column(db.String(100), nullable=True)
    notes = db.Column(db.String(100), nullable=True)

# No db.create_all() since the table already exists

# API Route to Fetch Tasks
@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Tasks.query.all()
    return jsonify([{"id": tasks.id, "task": tasks.task, "notes": tasks.notes} for tasks in tasks])

if __name__ == '__main__':
    app.run(debug=True)
