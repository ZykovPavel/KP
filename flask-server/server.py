from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from flask_cors import CORS, cross_origin
import MySQLdb.cursors

app = Flask(__name__)
CORS(app)

app.config['MYSQL_USER'] ='root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_HOST'] = '127.0.0.1'
app.config['MYSQL_DB'] = 'cars'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config['JSON_AS_ASCII'] = False

app.secret_key = 'some secret key'

mysql = MySQL(app)

@app.route("/shop", methods=['GET','OPTIONS'])
@cross_origin(origin='*')
def lyrics():
    cur = mysql.connection.cursor()
    cur.execute('select * from (SELECT s.*, o.id o_id, ROW_NUMBER() OVER(PARTITION BY s.id) AS row_num FROM cars.shop s left join cars.orders o on s.id = o.carId) t where row_num = 1;')    
    res = cur.fetchall()
    return jsonify(res)

@app.route('/createorder', methods=['POST'])
@cross_origin(origin='*')
def createorder():
    request.get_json(force=True)
    json = request.get_json(force=True)

    if not json['name'] or not json['phone'] or not json['carId'] or not json['carModel'] or not json['price']:
        return jsonify("Не все поля были заполнены!")
    else:
        name = json['name']
        phone = json['phone']
        carId = json['carId']
        carModel = json['carModel']
        price = json['price']
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('insert into `cars`.`orders` (name, phone, carId, carModel, price) values(% s, % s, % s, % s, % s)', (name, phone, carId, carModel, price))
        mysql.connection.commit()
        return jsonify('OK')

@app.route('/createsale', methods=['POST'])
@cross_origin(origin='*')
def createsale():
    request.get_json(force=True)
    json = request.get_json(force=True)

    if not json['name'] or not json['phone'] or not json['marka'] or not json['model'] or not json['year']:
        return jsonify("Не все поля были заполнены!")
    else:
        name = json['name']
        phone = json['phone']
        marka = json['marka']
        model = json['model']
        year = json['year']
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('insert into `cars`.`sale` (name, phone, marka, model, year) values(% s, % s, % s, % s, % s)', (name, phone, marka, model, year))
        mysql.connection.commit()
        return jsonify('OK')
        
@app.route('/getorderslist', methods=['GET'])
@cross_origin(origin='*')
def getorderslist():
    cur = mysql.connection.cursor()
    cur.execute('select * from cars.orders o left join cars.shop s on s.id = o.carId')    
    res = cur.fetchall()
    return jsonify(res)

@app.route('/getsaleslist', methods=['GET'])
@cross_origin(origin='*')
def getsaleslist():
    cur = mysql.connection.cursor()
    cur.execute('select * from cars.sale')    
    res = cur.fetchall()
    return jsonify(res)

if __name__ == "__main__":
    app.run(debug=True)