#!/usr/bin/python
# type: ignore

import os
import shutil
import subprocess

CUR_ENV_FILE_CONTENTS = (
    "import { ENVs } from './environment'\nconst ENVIRONMENT: ENVs = '%s'\nexport default "
    "ENVIRONMENT\n"
)

ENV_DEV = "dev"
ENV_STAGING = "staging"
ENV_PROD = "production"

top_level_dir = os.getcwd()
is_windows = os.name == "nt"

if is_windows:
    build_dir = top_level_dir + "\\build"
    env_file = top_level_dir + "\\src\\config\\current_environment.ts"
else:
    build_dir = top_level_dir + "/build"
    env_file = top_level_dir + "/src/config/current_environment.ts"


def delete_build_dir(dir_to_delete):
    print("dir_to_delete: " + dir_to_delete)

    if is_windows:
        shutil.rmtree(dir_to_delete)
    else:
        subprocess.Popen(["rm", "-r", dir_to_delete], cwd=top_level_dir).wait()


def write_cur_env_file(env_type):
    with open(env_file, "w") as f:
        f.write(CUR_ENV_FILE_CONTENTS % env_type)


def create_env_build(env_type):
    output_dir = build_dir + "-" + env_type

    os.path.isdir(output_dir) and delete_build_dir(output_dir)

    print("\nCREATING %s BUILD\n" % env_type)

    write_cur_env_file(env_type)

    if is_windows:
        subprocess.Popen(["yarn", "build"], cwd=top_level_dir, shell=True).wait()
        shutil.move(build_dir, output_dir)
    else:
        subprocess.Popen(["yarn", "build"], cwd=top_level_dir).wait()
        subprocess.Popen(["mv", build_dir, output_dir], cwd=top_level_dir).wait()

    print("\n%s BUILD CREATED\n" % env_type)


os.path.isdir(build_dir) and delete_build_dir(build_dir)

create_env_build(ENV_STAGING)
create_env_build(ENV_PROD)
create_env_build(ENV_DEV)

write_cur_env_file(ENV_DEV)
