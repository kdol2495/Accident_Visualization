import numpy as np
import json
import sqlalchemy as db
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask,request, render_template, send_from_directory, current_app
import simplejson as json
import decimal, datetime

def alchemyencoder(obj):
    """JSON encoder function for SQLAlchemy special classes."""
    if isinstance(obj, datetime.date):
        return obj.isoformat()
    elif isinstance(obj, decimal.Decimal):
        return float(obj)

def example():
    connection = engine.connect()
    res = conection.execute(select([accident_table]))

    # use special handler for dates and decimals
    return json.dumps([dict(r) for r in res], default=alchemyencoder)


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///test.sqlite.db3")


metadata = db.MetaData()

accident_table = db.Table('ACCIDENTS', metadata, autoload=True, autoload_with=engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__, static_folder='static', static_url_path='')


#################################################
# Flask Routes
#################################################
@app.route('/<path:path>')
def serve_page(path):
    return send_from_directory('client', path)

@app.route("/")

def welcome():
    """List all available api routes."""
    message = "hello"
    return render_template('index.html', message=message)
    # return current_app.send_static_file('index.html')
    # return (
    #     f"Available Routes:<br/>"
    #     f"/api/v1.0/names<br/>"
    #     f"/api/v1.0/all_accidents<br>"
    #     f"/api/v1.0/map_data"

    
    


@app.route("/api/v1.0/all_accidents")
def all_accidents():
    connection = engine.connect()

    """Return a list of all accidents"""
    #Equivalent to 'SELECT * FROM accidents'
    query = db.select([accident_table])
    ResultProxy = connection.execute(query)
    result = ResultProxy.fetchall()
    return json.dumps([dict(r) for r in result], default=alchemyencoder)

@app.route("/api/v1.0/map_data")
def map_data():
    connection = engine.connect()
    query = db.select([accident_table.c.Start_Lat, accident_table.c.Start_Lng])
    ResultProxy = connection.execute(query)
    result = ResultProxy.fetchall()
    return json.dumps([dict(r) for r in result], default=alchemyencoder)

@app.route('/submitted', methods=['POST'])
def handle_data():
    # projectpath = request.form["CityDropdown"]
    projectpath = request.form.get('CityDropdown')

    connection = engine.connect()

    """Return a list of all accidents"""
    #Equivalent to 'SELECT * FROM accidents'
    # query = db.select([accident_table])
    query = 'select Start_Lat, Start_Lng, city from Accidents Where city =' + "'" +projectpath +"'"
    ResultProxy = connection.execute(query)
    result = ResultProxy.fetchall()
    data = json.dumps([dict(r) for r in result], default=alchemyencoder)
    # your code
    # return a response
    return data

@app.route("/api/v1.0/horizontal_bar")
def severity_data():
    connection = engine.connect()
    ResultProxy= connection.execute("select Count(Severity), Severity from Accidents Group By Severity")
    result = ResultProxy.fetchall()
    return json.dumps([dict(r) for r in result], default=alchemyencoder)





if __name__ == '__main__':
    app.run(debug=True)
