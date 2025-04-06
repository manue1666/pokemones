from app import create_app

app = create_app()



if __name__ == "__main__":
    print("ya estoy jalando")
    app.run(debug=True)
    print("ya no estoy jalando")