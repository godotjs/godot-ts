class_name Nested
extends Node

# This function has no return value
func add(a, b):
	print(a + b)

# This function returns a value
func get_sum(a, b):
	return a + b

# This function will only accept integer arguments
func add_ints(a: int, b: int):
	return a + b

# Generate an error if the return value is not an int
func times_2(n) -> int:
	return 2 * n

# This function modifies an object that is passed by reference
func move_x(node: Node2D, dx = 1.5):
	node.position.x += dx
