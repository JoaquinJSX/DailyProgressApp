from flask import Flask, jsonify, request
from flask_cors import CORS
from collections import OrderedDict

app = Flask(__name__)
CORS(app)

# Configuración para mantener el orden de las claves
app.config['JSON_SORT_KEYS'] = False

# Estructura inicial vacía
users = []

# Ruta para obtener todos los usuarios
@app.route('/users', methods=['GET'])
def get_users():
    return jsonify(users)

# Ruta para obtener un usuario por ID
@app.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = next((u for u in users if u["id"] == id), None)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(user)

# Ruta para agregar un nuevo usuario
@app.route('/users', methods=['POST'])
def add_user():
    data = request.get_json()
    if not data or "username" not in data or "password" not in data:
        return jsonify({"error": "Missing username or password"}), 400

    # Crear un nuevo usuario con la estructura inicial vacía
    new_user = OrderedDict({
        "id": len(users) + 1,
        "username": data["username"],
        "password": data["password"],
        "targets": OrderedDict({
            "programming": [],
            "exercices": OrderedDict({
                "abs_legs": [],
                "biceps_back_farearms": [],
                "chest_triceps_shoulder": []
            })
        }),
        "achievements": OrderedDict({
            "programming": [],
            "exercices": OrderedDict({
                "abs_legs": [],
                "biceps_back_farearms": [],
                "chest_triceps_shoulder": []
            })
        })
    })

    users.append(new_user)
    return jsonify(new_user), 201

# Ruta para agregar un nuevo objetivo a "programming"
@app.route('/users/<int:id>/targets/programming', methods=['POST'])
def add_programming_target(id):
    user = next((u for u in users if u["id"] == id), None)
    if not user:
        return jsonify({"error": "User not found"}), 404

    new_target = request.get_json()
    if not new_target:
        return jsonify({"error": "No target provided"}), 400

    user["targets"]["programming"].append(new_target)
    return jsonify(user["targets"]["programming"]), 201

# Ruta para agregar un nuevo objetivo a "exercices"
@app.route('/users/<int:id>/targets/exercices/<category>', methods=['POST'])
def add_exercice_target(id, category):
    user = next((u for u in users if u["id"] == id), None)
    if not user:
        return jsonify({"error": "User not found"}), 404

    new_target = request.get_json()
    if not new_target:
        return jsonify({"error": "No target provided"}), 400

    if category in user["targets"]["exercices"]:
        user["targets"]["exercices"][category].append(new_target)
        return jsonify(user["targets"]["exercices"][category]), 201
    else:
        return jsonify({"error": "Invalid category"}), 400

# Ruta para agregar un nuevo logro a "programming"
@app.route('/users/<int:id>/achievements/programming', methods=['POST'])
def add_programming_achievement(id):
    user = next((u for u in users if u["id"] == id), None)
    if not user:
        return jsonify({"error": "User not found"}), 404

    new_achievement = request.get_json()
    if not new_achievement:
        return jsonify({"error": "No achievement provided"}), 400

    user["achievements"]["programming"].append(new_achievement)
    return jsonify(user["achievements"]["programming"]), 201

# Ruta para agregar un nuevo logro a "exercices"
@app.route('/users/<int:id>/achievements/exercices/<category>', methods=['POST'])
def add_exercice_achievement(id, category):
    user = next((u for u in users if u["id"] == id), None)
    if not user:
        return jsonify({"error": "User not found"}), 404

    new_achievement = request.get_json()
    if not new_achievement:
        return jsonify({"error": "No achievement provided"}), 400

    if category in user["achievements"]["exercices"]:
        user["achievements"]["exercices"][category].append(new_achievement)
        return jsonify(user["achievements"]["exercices"][category]), 201
    else:
        return jsonify({"error": "Invalid category"}), 400

# Ruta para eliminar un usuario
@app.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    global users
    user = next((u for u in users if u["id"] == id), None)
    if not user:
        return jsonify({"error": "User not found"}), 404

    users = [u for u in users if u["id"] != id]
    return jsonify({"message": f"User with ID {id} deleted"}), 200

if __name__ == '__main__':
    app.run(debug=True)
