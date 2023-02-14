from flask import Flask, request, render_template, Response
import json

app = Flask(__name__)

def read_data_from_json(file_name):
    with open(file_name, "r") as f:
        data = json.load(f)
    return data

configValues = read_data_from_json("config.json")
maxTitleLength = configValues["maxTitleLength"]
maxShortDescLength = configValues["maxShortDescLength"]
maxProblemToSolveLength = configValues["maxProblemToSolveLength"]
maxHowToUseLength = configValues["maxHowToUseLength"]
maxCoffeeURLLength = configValues["maxCoffeeURLLength"]
maxProjectURLLength = configValues["maxProjectURLLength"]

def mdFileGen(project_title, short_desc, problem_to_solve, how_to_use, coffee_in, project_in):
    your_description = f"# {project_title}\n\n## Short description\n\n{short_desc}\n\n## What problem does it solve?\n\n{problem_to_solve}\n\n## How to use it?\n\n{how_to_use}"
    if(coffee_in != "" or project_in != ""):
        your_description += "\n-----"
        if(coffee_in != ""):
            your_description += "\n\n[__Buy me a coffee! :coffee:__]({coffee_in})"
        if(project_in != ""):
            your_description += "\n\n[__Check out my other projects!__]({project_in})"
    return your_description

def validate_inputs(project_title, short_desc, problem_to_solve, how_to_use):
    if not all([project_title, short_desc, problem_to_solve, how_to_use]):
        return 'All fields must be filled!'
    elif len(project_title) > maxTitleLength:
        return '<i>Project title</i> is too long!'
    elif len(short_desc) > maxShortDescLength:
        return '<i>Short description</i> is too long!'
    elif len(problem_to_solve) > maxProblemToSolveLength:
        return '<i>Problem to solve</i> is too long!'
    elif len(how_to_use) > maxHowToUseLength:
        return '<i>How to use</i> is too long!'
    else:
        return None


@app.route('/', methods=['GET', 'POST'])
def index():
    error = None
    coffee_switch_not_checked = False
    project_switch_not_checked = False

    if request.method == 'POST':
        project_title = request.form['project-title']
        short_desc = request.form['short-desc']
        problem_to_solve = request.form['problem-to-solve']
        how_to_use = request.form['how-to-use']

        coffee_switch = request.form.get('coffee-switch')
        project_switch = request.form.get('project-switch')
        coffee_switch_not_checked = not coffee_switch
        project_switch_not_checked = not project_switch

        coffee_in = request.form['coffee-in']
        project_in = request.form['project-in']

        error = validate_inputs(project_title, short_desc, problem_to_solve, how_to_use)
        
        if not error:
            file_contents = mdFileGen(project_title, short_desc, problem_to_solve, how_to_use, coffee_in, project_in)

            response = Response(file_contents)
            response.headers["Content-Type"] = "text/plain"
            response.headers["Content-Disposition"] = "attachment; filename=README.md"

            return response

    return render_template("index.html", error=error, maxTitleLength=maxTitleLength, 
                           maxShortDescLength=maxShortDescLength, 
                           maxProblemToSolveLength=maxProblemToSolveLength, 
                           maxHowToUseLength=maxHowToUseLength, 
                           maxCoffeeURLLength=maxCoffeeURLLength, 
                           maxProjectURLLength=maxProjectURLLength, 
                           coffee_switch_status=coffee_switch_not_checked, 
                           project_switch_status=project_switch_not_checked)

if __name__ == '__main__':
    app.run()
