import hashlib
import time

class Block:
    def _init_(self, index, previous_hash, task, timestamp):
        self.index = index
        self.previous_hash = previous_hash
        self.task = task
        self.timestamp = timestamp
        self.hash = self.calculate_hash()

    def calculate_hash(self):
        block_data = f"{self.index}{self.previous_hash}{self.task}{self.timestamp}"
        return hashlib.sha256(block_data.encode()).hexdigest()

class TaskBlockchain:
    def _init_(self):
        self.chain = [self.create_genesis_block()]

    def create_genesis_block(self):
        return Block(0, "0", "Genesis Block - Start of To-Do List", time.time())

    def get_latest_block(self):
        return self.chain[-1]

    def add_task(self, task):
        new_block = Block(len(self.chain), self.get_latest_block().hash, task, time.time())
        self.chain.append(new_block)

    def print_tasks(self):
        for block in self.chain:
            print(f"Task {block.index}: {block.task}")
            print(f"Hash: {block.hash}")
            print(f"Previous Hash: {block.previous_hash}\n")

# Create a to-do list blockchain
my_todo_list = TaskBlockchain()

# Add tasks
my_todo_list.add_task("Buy groceries")
my_todo_list.add_task("Complete presentation")
my_todo_list.add_task("Prepare dinner")

# Print the to-do list (the blockchain)
my_todo_list.print_tasks()