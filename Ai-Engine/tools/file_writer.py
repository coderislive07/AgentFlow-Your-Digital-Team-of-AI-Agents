import os

class FileWriter:
    def __init__(self, base_path="generated_projects"):
        self.base_path = base_path
        os.makedirs(self.base_path, exist_ok=True)

    def write_file(self, task_id, filename, content):
        project_path = os.path.join(self.base_path, task_id)
        os.makedirs(project_path, exist_ok=True)

        file_path = os.path.join(project_path, filename)

        with open(file_path, "w") as f:
            f.write(content)

        return file_path