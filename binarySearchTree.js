// Represents a single node inside the binary tree
class TreeNode {
    constructor(data) {
        this.data = data;
        this.leftChild = null;
        this.rightChild = null;
    }
}

// Implements a binary search tree structure and its core operations
class BinarySearchTree {
    constructor() {
        this.rootNode = null;
    }

    // Завдання: Додати елемент
    add(data) {
        const node = new TreeNode(data);
        if (!this.rootNode) {
            this.rootNode = node;
        } else {
            this.#insertRecursively(this.rootNode, node);
        }
    }

    // Recursive helper to place a new node in the proper branch
    #insertRecursively(current, newNode) {
        if (newNode.data < current.data) {
            if (!current.leftChild) {
                current.leftChild = newNode;
            } else {
                this.#insertRecursively(current.leftChild, newNode);
            }
        } else {
            if (!current.rightChild) {
                current.rightChild = newNode;
            } else {
                this.#insertRecursively(current.rightChild, newNode);
            }
        }
    }

    // Завдання: Перевірити наявність елемента (знайти)
    find(data) {
        return this.#searchRecursively(this.rootNode, data);
    }

    // Recursive helper to locate a target value
    #searchRecursively(current, target) {
        if (!current) {
            return false;
        }
        if (target === current.data) {
            return true;
        }
        return target < current.data
            ? this.#searchRecursively(current.leftChild, target)
            : this.#searchRecursively(current.rightChild, target);
    }

    // Завдання: Видалити елемент
    delete(data) {
        this.rootNode = this.#deleteRecursively(this.rootNode, data);
    }

    // Recursive helper to remove a node and restructure links
    #deleteRecursively(current, target) {
        if (!current) {
            return null;
        }

        if (target < current.data) {
            current.leftChild = this.#deleteRecursively(current.leftChild, target);
            return current;
        }

        if (target > current.data) {
            current.rightChild = this.#deleteRecursively(current.rightChild, target);
            return current;
        }

        // Case 1: Leaf node without children
        if (!current.leftChild && !current.rightChild) {
            return null;
        }

        // Case 2: Node has a single child
        if (!current.leftChild) {
            return current.rightChild;
        }
        if (!current.rightChild) {
            return current.leftChild;
        }

        // Case 3: Node has both children; replace with leftmost node from right branch
        const successor = this.#getSmallestNode(current.rightChild);
        current.data = successor.data;
        current.rightChild = this.#deleteRecursively(current.rightChild, successor.data);
        return current;
    }

    // Завдання: Вивести всі елементи
    showAll() {
        const values = [];
        const stack = [];
        let current = this.rootNode;

        // Iterative in-order traversal using a stack
        while (current !== null || stack.length > 0) {
            while (current !== null) {
                stack.push(current);
                current = current.leftChild;
            }
            current = stack.pop();
            values.push(current.data);
            current = current.rightChild;
        }

        console.log(`Tree elements: [${values.join(" -> ")}]`);
        return values;
    }

    // Завдання: Вивести найбільший елемент
    findMax() {
        if (!this.rootNode) {
            return null;
        }
        return this.#getLargestNode(this.rootNode).data;
    }

    #getLargestNode(node) {
        return node.rightChild ? this.#getLargestNode(node.rightChild) : node;
    }

    // Завдання: Вивести найменший елемент
    findMin() {
        if (!this.rootNode) {
            return null;
        }
        return this.#getSmallestNode(this.rootNode).data;
    }

    #getSmallestNode(node) {
        return node.leftChild ? this.#getSmallestNode(node.leftChild) : node;
    }

    // Завдання: Вивести кількість
    size() {
        if (!this.rootNode) {
            return 0;
        }

        let total = 0;
        const queue = [this.rootNode];

        // Count nodes level by level using a queue
        while (queue.length > 0) {
            const current = queue.shift();
            total++;

            if (current.leftChild) {
                queue.push(current.leftChild);
            }
            if (current.rightChild) {
                queue.push(current.rightChild);
            }
        }

        return total;
    }
}

// === Перевірка роботи бінарного дерева ===
const bst = new BinarySearchTree();

// Завдання 1: Додавання елементів
[50, 25, 75, 10, 35, 60, 90, 5, 15, 80].forEach((num) => bst.add(num));

// Завдання 2: Виведення всіх елементів
bst.showAll();

// Завдання 3: Перевірка наявності елемента
console.log(`Has 35: ${bst.find(35)}`);
console.log(`Has 42: ${bst.find(42)}`);

// Завдання 4: Виведення найбільшого та найменшого елементів
console.log(`Maximum value: ${bst.findMax()}`);
console.log(`Minimum value: ${bst.findMin()}`);

// Завдання 5: Виведення кількості елементів
console.log(`Nodes count: ${bst.size()}`);

// Завдання 6: Видалення елементів
// Delete a leaf node
bst.delete(5);
// Delete a node with one child
bst.delete(90);
// Delete a node with two children
bst.delete(25);

console.log("State after deletions:");
bst.showAll();
console.log(`Nodes count after deletions: ${bst.size()}`);
