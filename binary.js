class node {
  constructor() {
  }
}

class tree {
  constructor() {
    this.root = null;
    this.left = null;
    this.right = null;
  }

  buildTree(array,current = this,start = 0, end = array.length-1,first = true) {
    if (first == true) {
      array = this.sortRemoveDuplicate(array)
      end = array.length-1;
    };
    let middle = Math.floor((start + end)/2);
    if (start > end) return null;
    current.root = array[middle];

    current.left = new node();
    current.left = this.buildTree(array,current.left,start,middle-1,false);
    
    current.right = new node();
    current.right = this.buildTree(array,current.right,middle+1,end,false);

    return current
  }

  insert (value,current = this) {
    if (this.root == null) return this.buildTree([value]);
    if (current == null) {
      current = new node;
      current.root = value;
      current.left = null;
      current.right = null;
      return current
    }
    if (value < current.root) {
      current.left = this.insert(value,current.left)
      return current
    }
    else {
      current.right = this.insert(value,current.right)
      return current
    }
  }

  remove(value,current = this) {
    if (current. root == value && current.left == null && current.right == null) {
      return null
    }
    if (current.root == value && current.left == null) {
      return current.right
    }
    if (current.root == value && current.right == null) {
      return current.left
    }
    if (current.root == value && current.right != null & current.left != null) {
      let next = current.left;
      while (next.right != null) {
        next = next.right;
      }
      if (next.right == null) {
        current.root = next.root;
        next.left == null ? current.left = null : next.root = next.left.root;
        next.left == null ? next = null : next.left = next.left.left;
      }
      return current
    }
    if (value < current.root) {
      current.left = this.remove(value,current.left)
      return current
    }
    else {
      current.right = this.remove(value,current.right)
      return current
    }
  }
  
  find(value,current = this) {
    if (current.root == value) {
      return current
    }
    if (value < current.root) {
      return this.find(value,current.left);
    }
    if (value > current.root) {
      return this.find(value,current.right);
    }
  }

  levelOrder(callback) {
    let array = [];
    let root = this;
    let queue = [];
    queue.push(root);

    while (queue.length != 0) {
      let temp = queue.shift();
      if (callback) {
        callback(temp.root);
      }
      else {
        array.push(temp.root)
      }

      if (temp.left != null) {
        queue.push(temp.left);
      }

      if (temp.right != null) {
        queue.push(temp.right)
      }
    }
    if (!callback) {
      return array
    }
  }

  inorder(callback,current = this,array = []) {
    if (this.root == null) return;
    if (!callback) {
      if (current.left != null) {array = array.concat(this.inorder(callback,current.left))};
      array.push(current.root);
      if (current.right != null) {array = array.concat(this.inorder(callback,current.right))};
      return array;
    } else {
        if (current.left != null) {
          this.inorder(callback,current.left)
          callback(current.root)
        }
        if (current.left == null) {
          callback(current.root);
        }
        if (current.right != null) {
          this.inorder(callback,current.right)
        }
    }
  }

  preorder(callback,current = this,array = []) {
    if (this.root == null) return;
    if (!callback) {
      array.push(current.root);
      if (current.left != null) {array = array.concat(this.preorder(callback,current.left))};
      if (current.right != null) {array = array.concat(this.preorder(callback,current.right))};
      return array;
    } else {
        callback(current.root);
        if (current.left != null) {
          this.preorder(callback,current.left)
        }
        if (current.right != null) {
          this.preorder(callback,current.right)
        }
    }
  }

  postorder(callback,current=this,array=[]) {
    if (this.root == null) return;
    if (!callback) {
      if (current.left != null) {array = array.concat(this.postorder(callback,current.left))};
      if (current.right != null) {array = array.concat(this.postorder(callback,current.right))};
      array.push(current.root);
      return array;
    } else {
        if (current.left != null) {
          this.postorder(callback,current.left)
        }
        if (current.right != null) {
          this.postorder(callback,current.right)
        }
        callback(current.root);
    }
  }

  height(node,counter = 0) {
    if (node == null) {return counter-1}
    if (node.left == null && node.right == null) {return counter}
    let left = this.height(node.left,counter+1);
    let right = this.height(node.right,counter+1);
    counter = right > left ? counter = right : counter = left;
    return counter
  } 

  depth(node,counter = 0,current = this) {
    if (current == node) {
      return counter
    }
    if (node.root < current.root) {
      return this.depth(node,counter+1,current.left);
    }
    if (node.root > current.root) {
      return this.depth(node,counter+1,current.right);
    }

  }

  isBalanced(current = this) {
    if (current == null) {return true}
    let left = current.left;
    let right = current.right;
    let status = false;
    if (left == null && right == null) {return true}
    let heightleft = left == null || (left.left == null && left.right == null) ? 0 : this.height(left);
    let heightRight = right == null || (right.right == null && right.left == null) ? 0 : this.height(right);
    let result = heightleft - heightRight;
    if (result <= 1 && result >= -1) status = true;
    if (status == false) return status
    status = this.isBalanced(left);
    status = this.isBalanced(right);
    return status;
  }

  rebalance() {
    if (this.isBalanced()) return
    let arr = this.inorder();
    this.root = null;
    this.left = null;
    this.right = null;
    this.buildTree(arr);
  }

  sortRemoveDuplicate(array) {
    let copy = [...array];
    copy.sort((a, b) => a - b);
    for (let i = 0; i < array.length; i++) {
      for (let j = i+1; j < array.length; j++) {
        if (copy[i] == copy[j]) {
          copy.splice(i,1)
        }
      }
    }
    return copy
  }

}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.root}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

const newArray = (arrayLenght = 40,max = 40) => {
  return Array.from({length: arrayLenght}, () => Math.floor(Math.random() * max));
}

let binaryTree = new tree;

binaryTree.buildTree(newArray());

console.log(binaryTree.isBalanced());

console.log('Level:');
binaryTree.levelOrder((value)=> {console.log(value)});

console.log('Preorder');
binaryTree.preorder((value)=> {console.log(value)});

console.log('Postorder');
binaryTree.postorder((value)=> {console.log(value)});

binaryTree.insert(105);
binaryTree.insert(110);
binaryTree.insert(150);
binaryTree.insert(125);

console.log(binaryTree.isBalanced());

binaryTree.rebalance();

console.log('Level:');
binaryTree.levelOrder((value)=> {console.log(value)});

console.log('Preorder');
binaryTree.preorder((value)=> {console.log(value)});

console.log('Postorder');
binaryTree.postorder((value)=> {console.log(value)});

