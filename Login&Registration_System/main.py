from flask import Flask, render_template, request, redirect, url_for
from flask_mysqldb import MySQL
import bleach
import bcrypt

app = Flask(__name__)
app.static_folder = 'static'

# Configure MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'saurabh123'  # your MySQL password
app.config['MYSQL_DB'] = 'pythonlogin'  # database name

# Initialize MySQL
mysql = MySQL(app)

# Routes
@app.route('/')
def login_page():
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = bleach.clean(request.form['username'])
        password = bleach.clean(request.form['password'])

        if not username or not password:
            return "Username and password are required."

        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM accounts WHERE username = %s", (username,))
        user = cur.fetchone()
        cur.close()

        if user and bcrypt.checkpw(password.encode('utf-8'), user[2].encode('utf-8')):
            return redirect(url_for('home'))
        else:
            return "Invalid username or password"
    
    return render_template('login.html')


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = bleach.clean(request.form['username'])
        raw_password = bleach.clean(request.form['password'])
        email = bleach.clean(request.form['email'])
        
        if not username or not email:
            return "Username and email are required fields"

        hashed_password = bcrypt.hashpw(raw_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO accounts (username, password, email) VALUES (%s, %s, %s)", (username, hashed_password, email))
        mysql.connection.commit()
        cur.close()
        return redirect(url_for('login'))
    return render_template('register.html')


@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/order')
def order():
    return render_template('order.html')

if __name__ == '__main__':
    app.run(debug=True)
