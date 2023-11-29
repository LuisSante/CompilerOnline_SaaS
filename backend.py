from flask import Flask, request, jsonify
import subprocess
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/compilar', methods=['POST'])
def compilar_codigo():
    try:
        # Obtener datos JSON de la solicitud
        datos_solicitud = request.get_json()
        codigo = datos_solicitud['codigo']
        lenguaje = datos_solicitud['lenguaje']
        print(lenguaje)
        codigo = datos_solicitud['codigo']
        lenguaje = datos_solicitud['lenguaje']

        # Guardar el código en un archivo temporal
        #with open("temp_code." + lenguaje.lower(), "w") as f:
        #    f.write(codigo)

        # Compilar y ejecutar el código según el lenguaje
        if lenguaje.lower() == 'python':
            print("Ejecutando comando: python temp_code.py")
            resultado = subprocess.run(["python", "-c", codigo], capture_output=True, text=True)

            print("Resultado:", resultado.stdout)
        elif lenguaje.lower() == 'c++':
            subprocess.run(["g++", "temp_code.cpp", "-o", "temp_code"])
            resultado = subprocess.run(["./temp_code"], capture_output=True, text=True)
        else:
            return jsonify({"error": "Lenguaje no soportado"}), 400

        # Devolver el resultado compilado
        return jsonify({"resultado": resultado.stdout})

    except Exception as e:
        return jsonify({"error": f"Error al compilar: {e}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
