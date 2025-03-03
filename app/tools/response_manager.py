from flask import jsonify

class responseManager:
    
    def success(self, data):

        if isinstance(data, str):
            data = {
                "message": data
            }
        return jsonify(data), 200
    
    def error(self, data="Invalid request"):
        if isinstance(data, str):
            data = {
                "message": data
            }
        return jsonify(data), 400
    
    def error_server(self, data="SERVER ERROR"):
        if isinstance(data, str):
            data = {
                "message": data
            }
        return jsonify(data), 