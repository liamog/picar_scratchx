from flask import Flask, jsonify, render_template, request
import Adafruit_PCA9685

app = Flask(__name__)

low_limit = 204
mid = 330
hi_limit = 400

pwm = Adafruit_PCA9685.PCA9685()

def limit(val) :

    if val is None: return 0
    elif val == 0 : return 0
    elif val < low_limit : val = low_limit
    elif val > hi_limit : val = hi_limit

    return val

@app.route('/_set_servo')
def set_servo():
    pwm.set_pwm_freq(50)

    s = limit(request.args.get('s', 0, type=int))
    t = limit(request.args.get('t', 0, type=int))
    if s > 0 : pwm.set_pwm(1, 0, s)
    if t > 0 : pwm.set_pwm(0, 0, t)

    return jsonify(s=s, t=t)


@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host="0.0.0.0")
