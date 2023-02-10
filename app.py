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

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        project_title = request.form['project-title']
        short_desc = request.form['short-desc']
        problem_to_solve = request.form['problem-to-solve']
        how_to_use = request.form['how-to-use']

        coffee_in = request.form['coffee-in']
        project_in = request.form['project-in']


        if(project_title == '' or short_desc == '' or problem_to_solve == '' or how_to_use == ''):
            return render_template("index.html", not_all_fields_filled=True, maxTitleLength=maxTitleLength, maxShortDescLength=maxShortDescLength, maxProblemToSolveLength=maxProblemToSolveLength, maxHowToUseLength=maxHowToUseLength)
        elif(len(project_title) > maxTitleLength):
            return render_template("index.html", project_title_too_long=True, maxTitleLength=maxTitleLength, maxShortDescLength=maxShortDescLength, maxProblemToSolveLength=maxProblemToSolveLength, maxHowToUseLength=maxHowToUseLength)
        elif(len(short_desc) > 10000):
            return render_template("index.html", short_desc_too_long=True, maxTitleLength=maxTitleLength, maxShortDescLength=maxShortDescLength, maxProblemToSolveLength=maxProblemToSolveLength, maxHowToUseLength=maxHowToUseLength)
        elif(len(problem_to_solve) > 10000):
            return render_template("index.html", problem_to_solve_too_long=True, maxTitleLength=maxTitleLength, maxShortDescLength=maxShortDescLength, maxProblemToSolveLength=maxProblemToSolveLength, maxHowToUseLength=maxHowToUseLength)
        elif(len(how_to_use) > 10000):
            return render_template("index.html", how_to_use_too_long=True, maxTitleLength=maxTitleLength, maxShortDescLength=maxShortDescLength, maxProblemToSolveLength=maxProblemToSolveLength, maxHowToUseLength=maxHowToUseLength)

        file_contents = test_func(project_title, short_desc, problem_to_solve, how_to_use, coffee_in, project_in)

        response = Response(file_contents)
        response.headers["Content-Type"] = "text/plain"
        response.headers["Content-Disposition"] = "attachment; filename=README.md"

        return response

    return render_template("index.html", maxTitleLength=maxTitleLength, maxShortDescLength=maxShortDescLength, maxProblemToSolveLength=maxProblemToSolveLength, maxHowToUseLength=maxHowToUseLength)

def test_func(project_title, short_desc, problem_to_solve, how_to_use, coffee_in, project_in):
    your_description = f"# {project_title}\n\n## Short description\n\n{short_desc}\n\n## What problem does it solve?\n\n{problem_to_solve}\n\n## How to use it?\n\n{how_to_use}"
    if(coffee_in != "" or project_in != ""):
        your_description += "\n-----"
        if(coffee_in != ""):
            your_description += "\n\n[__Buy me a coffee! :coffee:__]({coffee_in})"
        if(project_in != ""):
            your_description += "\n\n[__Check out my other projects!__]({project_in})"
    return your_description


if __name__ == '__main__':
    app.run()
