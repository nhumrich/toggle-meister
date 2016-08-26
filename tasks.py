import sys
import os

from invoke import task
# You might need the following line so that alembic can traverse
# the application properly
# export PYTHONPATH=$(pwd)

IS_TTY = False if os.getenv('DOCKER') else sys.stdout.isatty()

@task
def clean(ctx):
    patterns = (
        '**/*.pyc',
        '**/__pycache__',
        '.cache',
    )

    for pattern in patterns:
        ctx.run("rm -rf {}".format(pattern))


@task
def lint(ctx, full=False):
    if full:
        ctx.run('python3 -m pylint tmeister migrate tests', pty=IS_TTY)
    else:
        ctx.run('python3 -m flake8 tmeister migrate tests', pty=IS_TTY)


@task(pre=[clean])
def test(ctx, coverage=True, x=False, v=False):
    """
    test the code!
    :param ctx:
    :param headless:
    :param coverage: use --no-coverage to skip coverage results
    :param x: use -x to stop at first test
    :param v: use -v to increase verbosity
    :return:
    """
    cmd = 'python3 -m pytest --color yes'
    if coverage:
        print("coverage added")
        cmd += ' --cov=tmeister'

    if x:
        cmd += ' -x'

    if not v:
        cmd += ' --quiet'

    ctx.run(cmd, pty=IS_TTY)


@task
def install(ctx):
    """
    install dependencies
    NOT to be used in docker. Only for local dev
    :param ctx:
    :param docker: if this is installing in a docker container
    """
    ctx.run('python3 -m pip install -r requirements.txt -t .pip', pty=IS_TTY)


@task
def serve(ctx):
    ctx.run('python3 run.py', pty=IS_TTY)


@task
def migrate(ctx):
    ctx.run('alembic upgrade head', pty=IS_TTY)


@task
def down(ctx, all=False):
    if all:
        num = 'base'
    else:
        num = '-1'
    ctx.run('alembic downgrade ' + num, pty=IS_TTY)


@task(pre=[migrate])
def seed(ctx):
    print('no seed script yet')


@task
def run(ctx):
    ctx.run('python3 run.py', pty=IS_TTY)


@task
def hooks(ctx):
    ctx.run('ln -sf $(pwd)/hooks/pre-commit.sh .git/hooks/pre-commit')
