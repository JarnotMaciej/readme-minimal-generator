from flask import Flask, request, render_template, Response

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        project_title = request.form['project-title']
        short_desc = request.form['short-desc']
        problem_to_solve = request.form['problem-to-solve']
        how_to_use = request.form['how-to-use']

        if(project_title == '' or short_desc == '' or problem_to_solve == '' or how_to_use == ''):
            return render_template("index.html", not_all_fields_filled=True)

        file_contents = test_func(project_title, short_desc, problem_to_solve, how_to_use)

        response = Response(file_contents)
        response.headers["Content-Type"] = "text/plain"
        response.headers["Content-Disposition"] = "attachment; filename=README.md"

        return response

    return render_template("index.html")

def test_func(project_title, short_desc, problem_to_solve, how_to_use):
    return f"# {project_title}\n\n## Short description\n\n{short_desc}\n\n## What problem does it solve?\n\n{problem_to_solve}\n\n## How to use it?\n\n{how_to_use}"


if __name__ == '__main__':
    app.run(debug=True)
